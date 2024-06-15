"use client"

import Image from "next/image";
import styles from "./page.module.css";
import {countryList} from "./countrys.js";
import { useEffect, useState } from "react";

import Alert from "./components/Alert"
import Carousel from "./components/Carousel"
import Checkbox from "./components/Checkbox"
import NumberInput from "./components/Inputs/Number"

function getCountryNameByCode(code) {
  const country = countryList.find(country => country.code === code);
  return country?.flag + country?.name
}

const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.src = src;
    img.onload = resolve;
    img.onerror = reject;
  });
};

export default function Home() {
  const BASE_URL = "https://api.hoop.photo/v1"

  const HEADERS = {
    "Authorization": process.env.ACCESS_TOKEN,
    "x-hoop-device-fingerprint": "D0542490-DD19-4337-A569-68A277999E73",
    "x-hoop-app-platform": "ios",
    "x-hoop-app-version": "3.5.1",
    "x-hoop-ee-variant-id": "hoop_4659E_V_0",
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }

  const [profiles, setProfiles] = useState([]);
  const [currentProfile, setCurrentProfile] = useState(0);

  const [alertMessage, setAlertMessage] = useState("");

  const [autoMode, setAutoMode] = useState(false);
  const [autoModeLabel, setAutoModeLabel] = useState("");

  const [filterAges, setFilterAges] = useState(false);
  const [minAge, setMinAge] = useState(15);

  useEffect(() => {
    let interval;
    if (autoMode) {
      interval = setInterval(async () => {
        const profile = profiles[currentProfile];
        console.log(profile?.display_name);
        const response = await fetch("/api/v1/attractiveness", {
          method: "post",
          body: JSON.stringify({ url: profile?.photo_urls[0] })
        });
        const data = await response.json();
        
        if (data.shouldAdd) {
          setAutoModeLabel("Adding " + profile?.display_name);
          addProfile()
        } else {
          setAutoModeLabel("Skipping " + profile?.display_name);
          skipProfile();
        }
        
      }, 2000);
    }

    return () => {
      clearInterval(interval);
    }
  }, [autoMode, currentProfile, profiles]);

  const preloadImages = async (urls) => {
    const promises = urls.map(url => preloadImage(url));
    await Promise.all(promises);
  };

  const fetchProfiles = async () => {
    const response = await fetch(`${BASE_URL}/discover-users`, {
      method: "post",
      headers: new Headers(HEADERS)
    });
    const data = await response.json();

    const updatedProfiles = data.data.map((profile) => {
      const countryName = getCountryNameByCode(profile.country_code);
      return { ...profile, country: countryName };
    });
    //console.log(updatedProfiles)

    const photoUrls = updatedProfiles.flatMap(profile => profile.photo_urls)

    try {
      preloadImages(photoUrls);
    } catch (error) {
      console.error("Error preloading images", error);
    }

    setProfiles(updatedProfiles);
  }

  const skipProfile = () => {
    setCurrentProfile((prevProfile) => {
      let nextProfileIndex = prevProfile + 1;
  
      if (filterAges) {
        while (profiles[nextProfileIndex] && (profiles[nextProfileIndex].age > minAge)) {
          console.log("Skipping: "  + profiles[nextProfileIndex].age)
          nextProfileIndex++;
        }
      } else {
        console.log("no filtering")
      }
  
      if (profiles[nextProfileIndex]) {
        return nextProfileIndex;
      } else {
        console.log("No profile left. Fetching new ones.");
        fetchProfiles();
        return 0;
      }
    });
  };
  

  const previousProfile = () => {
    setCurrentProfile((prevProfile)=> {
      if(profiles[prevProfile - 1]) {
       return prevProfile - 1
      }
    });
  }

  const addProfile = async () => {
    const response = await fetch(`${BASE_URL}/send-snap-request`, {
      method: "post",
      headers: new Headers(HEADERS),
      body: JSON.stringify({
        "user_id": profiles[currentProfile].uid,
        "super_request": false,
        "matching_algorithm": ""
      })
    });
    const data = await response.json();
  
    console.log(data)
    if (data.status == "error") {
      showAlert("You don't have enough gems.")
    }

    skipProfile()
  }

  const showAlert = (message) => {
    setAlertMessage(message)
  }

  const handleKeyPress = (event) => {
    if (event.key == 'ArrowUp') {
      addProfile()
    } else if (event.key =='ArrowDown') {
      console.log("skipping")
      skipProfile()
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    fetchProfiles()
    setCurrentProfile(0)
  }, []);


  return (
    <main className={styles.main}>
      <Alert
        message={alertMessage}
        onClose={() => {
          setAlertMessage(null)
        }}
      />

      <br />
      <h3>{autoModeLabel}</h3>
      <br />

      <div className={styles.card}>
       <Carousel images={profiles[currentProfile]?.photo_urls} />

        <br />
       
       <h3>{profiles[currentProfile]?.display_name || "Loading..."}{profiles[currentProfile]?.age ? ", " + profiles[currentProfile].age : ""}</h3>
       <a>{profiles[currentProfile]?.country}</a>
      </div>

      <div className={styles.card}>
      <button
          type="outline"
          className={styles.previous_btn}
          onClick={previousProfile}
          >
          <i className="fa-solid fa-rotate-left"></i>
        </button>

        <button
          type="outline"
          className={styles.skip_btn}
          onClick={skipProfile}
          >
          <i className="fa-solid fa-minus"></i>
        </button>

        <button
          type="button"
          className={styles.add_btn}
          onClick={async () => {
            addProfile()
          }}
          >
            <i className="fa-solid fa-user-plus"></i>
        </button>
       </div>

       <Checkbox 
        onChecked={() => {
          setFilterAges((prevFilterAges) => {
            return !prevFilterAges
          })
        }}
        checked={filterAges}
       />
       <a>Maximum Age Filter</a>
        
      {(filterAges) ?
      <NumberInput 
        increaseInput={() => {
          setMinAge((prevMinAge) => {
            return prevMinAge +1
          })
        }}
        decreaseInput={() => {
          setMinAge((prevMinAge) => {
            if (prevMinAge > 12) {
              return prevMinAge -1
            } else {
              return prevMinAge
            }
          })
        }}
        value={minAge}
        
      /> 
      
      : "" }
       
       <br />

       <Checkbox 
        onChecked={() => {
          setAutoMode((prevAutoMode) => {
            return !prevAutoMode
          })
        }}
        checked={autoMode}
       />
       <a>Auto Mode</a>
    </main>
  );
}
