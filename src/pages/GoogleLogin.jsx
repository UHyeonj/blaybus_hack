import "../styles/GoogleLogin.css";
import googleImg from '../assets/google-logo.png';

function GoogleLogin() {
  const handleLogin = () => {
    window.location.href =
      "https://blaybus-glowup.com/oauth2/authorization/google?redirect_uri=https://uhyeon.blaybus-glowup.com/main&mode=login";
  };

  //const googleimg = './../assets/google-logo.png';

  return (
    <button
      type="button"
      onClick={handleLogin}
      className="google_login"
    >
      <img src={googleImg} />
      구글로 시작하기
    </button>
  );
}

export default GoogleLogin;
