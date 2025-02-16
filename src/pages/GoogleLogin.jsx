import '../styles/GoogleLogin.css';

function GoogleLogin() {
    const handleLogin = () => {
        window.location.href = "https://blaybus-glowup.com/oauth2/authorization/google?redirect_uri=https://front.blaybus-glowup.com/&mode=login";
    };
    
    const googleimg = './src/assets/google-logo.png'; 

    return (
        <button 
            type="button" 
            onClick={handleLogin} 
            className='google_login'
        >
        <img src={googleimg}/>구글로 시작하기
        </button>
    );
}

export default GoogleLogin;
