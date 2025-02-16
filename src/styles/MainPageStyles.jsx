import { styled } from "styled-components";
import backgroundImg from '../assets/background_image.png';

export const Container = styled.div`
    display: flex;
    width: 393px;
    padding-bottom: 0.3px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image: url(${backgroundImg});
    background-size: cover;   
    background-position: center;  
    background-repeat: no-repeat; 
`;

export const LogoImage = styled.img`
    margin-top: 20%;
`;

export const Main1 = styled.div`
    display: flex;
    padding: 10px 15px;
    width: 80%; 
    flex-direction: column;
    align-items: center;
    gap: 10px;
    border-radius: 17px;
    background: #FFF;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);  
    padding: 20px 40px;
    margin-top: 8%;
`;


export const UsersImage = styled.img`
    display: flex;
    width: 46px;
    height: 46px;
    justify-content: center;
    align-items: center;
`;


export const Main1Content = styled.div`
    color: var(--line-494949, #494949);
    text-align: center;
    font-family: Pretendard;
    font-size: 20px;
    font-weight: 700;
    line-height: 28px;
    margin-top: 10px; 
`;


export const Content1 = styled.div`
    display: flex;
`;

export const CheckImage = styled.img`
    width: 8px;
    height: 8px;
    margin-top: 3.5%;
    margin-right: 1%;
`;

export const Content11 = styled.div`
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    white-space: nowrap;
`;

export const Button1 = styled.div`
    display: flex;
    width: 205px;
    height: auto;
    padding: 10px 40px;  
    margin-top: 2%;
    justify-content: center;
    align-items: center;
    gap: 0px; 
    border-radius: 20px;  
    border: 2px solid var(--brand-e-4788-b, #E4788B);
    background: #E35A80;  
    color: white; 
    box-shadow: 3px 5px 6.7px 2px rgba(0, 0, 0, 0.25), 4px 4px 20.8px -4px rgba(0, 0, 0, 0.08) inset;
    text-align: center;  
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 700;  
    line-height: 20px;  
    white-space: nowrap;  
    overflow: hidden;  
    text-overflow: ellipsis; 
`;



export const Memo = styled.div`
    color: var(--font-6-c-7072, #6C7072);
    font-family: Pretendard;
    font-size: 12px;  
    font-weight: 500; 
    line-height: 20px;
    margin-top: 5%;
`;
