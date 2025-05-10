import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

function GoogleAuth({ authType }) {
  const navigate = useNavigate();
  const toastOptions = {
    style: {
      border: "1px solid #ff5733",
      padding: "14px 16px",
      color: "#fff",
      background: "#ff5733",
      borderRadius: "10px",
      fontWeight: "500",
    },
    iconTheme: {
      primary: "#fff",
      secondary: "#F0EBFF",
    },
  };

  function handleLogout() {
    googleLogout();
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    toast.success("Logged out successfully!", toastOptions);
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
            toast.success(
              `${authType === "signup" ? "Signup" : "Login"} successful!`
            );
            navigate("/dashboard");
          } else {
            toast.error("Google login failed");
          }
        }}
      />
    </>
  );
}

export default GoogleAuth;
