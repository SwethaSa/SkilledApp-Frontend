import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function GoogleAuth() {
  const navigate = useNavigate();

  function handleLogout() {
    googleLogout();
    localStorage.removeItem("token");
    alert("Logged out successfully!");
    navigate("/login");
  }
  return (
    <>
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          const idToken = credentialResponse.credential;

          const response = await fetch(
            "http://localhost:4000/auth/google-login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ idToken }), // Send the idToken to your backend
            }
          );

          const data = await response.json();

          if (response.ok) {
            localStorage.setItem("token", data.token);
            alert("Login successful!");
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
