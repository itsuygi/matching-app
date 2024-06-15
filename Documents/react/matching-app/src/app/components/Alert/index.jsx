"use client";

import "./index.css";
import { useState, useEffect, useRef } from "react";

export default function Alert({ message, onClose }) {
  const alertRef = useRef(null);

  if (!message) {
    return null;
  }

  return (
    <div className="alert alert-error" ref={alertRef}>
      <div className="icon__wrapper">
        <i className="fa-solid fa-triangle-exclamation"></i>
      </div>
      <p>{message}</p>
      <span className="mdi mdi-open-in-new open"></span>
      <i
        className="fa-solid fa-xmark"
        onClick={onClose}
      ></i>
    </div>
  );
}
