import React from "react";

export default function CustomSpinner() {
  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <div className="spinnerStyle"> </div>
      <p className="spinnerText">
        Retrieving artwork
        <br />
        Please wait...
      </p>
    </div>
  );
}
