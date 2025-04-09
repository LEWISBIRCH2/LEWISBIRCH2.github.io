import { CreateUser } from "../Components/CreateUser";
import { Login } from "../Components/Login";
import { useState } from "react";

export function LandingPage() {
  const [view, setView] = useState(0);

  return (
    <>
      {!view ? (
        <>
          <Login />
          <button
            onClick={() => {
              setView(!view);
            }}
          >
            {" "}
            Create new account
          </button>
        </>
      ) : (
        <>
          <CreateUser />
          <button
            onClick={() => {
              setView(!view);
            }}
          >
            Login with existing information
          </button>
        </>
      )}
    </>
  );
}
