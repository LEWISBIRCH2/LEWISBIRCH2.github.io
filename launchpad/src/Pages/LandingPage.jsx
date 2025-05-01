import { CreateUser } from "../Components/CreateUser";
import { Login } from "../Components/Login";
import { useState } from "react";

export function LandingPage() {
  const [view, setView] = useState(0);

  return (
    <>
      <h1 className="landingIntro">
        Please sign in using your account details. <br></br>If it's your first
        time here, create an account using the button below.
      </h1>
      {!view ? (
        <>
          <Login />
          <button
            className="createNewAccountButton"
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
            className="existingLogin"
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
