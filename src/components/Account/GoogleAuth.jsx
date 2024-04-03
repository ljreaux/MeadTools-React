import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
export default function GoogleAuth() {
  const clientId =
    "639612055979-u70paajvncbv181q03d1rdrce6qpvvld.apps.googleusercontent.com";

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </GoogleOAuthProvider>
  );
}
