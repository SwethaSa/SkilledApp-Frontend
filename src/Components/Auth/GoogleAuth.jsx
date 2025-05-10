import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function GoogleAuth({ authType }) {
  const navigate = useNavigate();

  function handleLogout() {
    googleLogout();
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    alert("Logged out successfully!");
    navigate("/login");
  }

  return (
    <>
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          const idToken = credentialResponse.credential;
          const API = import.meta.env.VITE_API;

          const response = await fetch(`${API}/auth/google-login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ idToken }),
          });

          const data = await response.json();

          if (response.ok) {
            -localStorage.setItem("token", data.token);
            +localStorage.setItem("token", data.token);
            +localStorage.setItem("userId", data.userId); // ← store the userId
            alert(`${authType === "signup" ? "Signup" : "Login"} successful!`);
            navigate("/dashboard");
          } else {
            alert("Google login failed");
          }
        }}
      />
    </>
  );
}

export default GoogleAuth;
