import React from "react";

export default function CustomSpinner() {
  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <div
        style={{
          width: "50px",
          height: "50px",
          border: "5px solid #f3f3f3",
          borderTop: "5px solid #333",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
          margin: "0 auto",
        }}
      />
      <p>
        Retrieving artwork
        <br />
        Please wait...
      </p>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
