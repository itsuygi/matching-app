export const POST = async (request) => {
    try {
        const { url } = await request.json();

        const fileResponse = await fetch(url);
        const fileBlob = await fileResponse.blob();
        const formData = new FormData();
        formData.append("file", fileBlob, "filename"); // Add a filename if needed

        const result = await fetch('https://www.nyckel.com/v1/functions/uqbn9tt1sza3asok/invoke', {
            method: "POST",
            body: formData
        });

        const resultJson = await result.json()
        console.log(resultJson)

        let attractiveness = {shouldAdd: (resultJson.labelId == "label_s9gboxbmdnl2k37r" || resultJson.labelId == "label_b2kdkglltkn0ku27") ? true : false, confidence: resultJson.confidence}

        return new Response(JSON.stringify(attractiveness), { status: 200 });

    } catch (error) {
        console.error('Error:', error);
        return new Response("Failed to fetch", { status: 500 });
    }
};
