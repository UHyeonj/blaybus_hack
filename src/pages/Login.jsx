import GoogleLogin from "./GoogleLogin";
import BackgroundCircle from "./BackgroundCircle";
import logo from "../assets/logo.png";
import haertz from "../assets/haertz.svg";
import "../styles/Login.css";

function Login() {
  return (
    <div className="main_container">
      <img className="login-brandimage" src={haertz} />
      <img className="login-logoimage" src={logo} />
      <span className="first_state">당신만을 위한 헤어 컨설팅,</span>
      <span className="second_state">오직 헤르츠에서</span>
      <GoogleLogin />
      <p className="google_login_state">구글 계정이 없으신가요?</p>
      <a
        className="google_login_link"
        href="https://www.google.com/intl/ko/account/about/"
      >
        구글 계정 생성하러 가기
      </a>
      <BackgroundCircle />
    </div>
  );
}

export default Login;
