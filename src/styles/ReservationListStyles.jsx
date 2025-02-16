import { styled } from "styled-components";
import backgroundImg from "../assets/background_image.png";

export const Container = styled.div`
  width: 393px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
  background-image: url(${backgroundImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const Title = styled.div`
  display: flex;
  width: 393px;
  padding: 6px 9px;
  align-items: center;
  //gap: 20px;
  justify-content: flex-start;
  margin-top: 13%;
`;

export const BackImage = styled.img`
  width: 24px;
  height: 24px;
  align-self: flex-start; /* 부모 flex 기준 왼쪽 정렬 */
  margin-right: auto;
  margin-left: 2%;
`;

export const TitleContent = styled.div`
  color: var(--Ink-Darkest, #090a0a);
  text-align: center;
  font-family: SUIT;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  flex: 1;
  margin-right: 12%;
`;

export const Title2 = styled.div`
  color: var(--font-090-a-0-a, #090a0a);

  font-family: Pretendard;
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-top: 13%;
  text-align: left;
  margin-bottom: 12%;
  margin-left: -50%;
`;

export const Consulting = styled.div`
  display: flex;
  padding: 19px 32px;
  width: 90%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 12%;
  border-radius: 15px;
  background: var(--, rgba(255, 255, 255, 0.36));

  box-shadow: 3px 5px 6.7px 2px rgba(0, 0, 0, 0.09);
`;

export const CT = styled.div`
  align-self: stretch;
  color: var(--font-090-a-0-a, #090a0a);
  text-align: center;

  font-family: SUIT;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 23px;
`;

export const CLink = styled.div`
  color: var(--line-494949, #494949);
  text-align: center;
  font-family: SUIT;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 23px;
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-skip-ink: auto;
  text-decoration-thickness: auto;
  text-underline-offset: auto;
  text-underline-position: from-font;
`;

export const ConsultingContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 28.5px;
  align-items: center;
  width: 90%;
  gap: 15px;
  border-radius: 6px;
  margin-bottom: 5%;
  background: var(--, rgba(255, 255, 255, 0.36));

  box-shadow: 3px 5px 6.7px 2px rgba(0, 0, 0, 0.09);
`;

export const D = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const De = styled.div`
  align-self: stretch;
  color: var(--line-494949, #494949);

  font-family: SUIT;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 23px;
`;

export const Des = styled.div`
  align-self: stretch;
  color: var(--font-090-a-0-a, #090a0a);
  text-align: right;

  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: 27px;
`;

export const C = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Co = styled.div`
  align-self: stretch;
  color: var(--line-494949, #494949);

  font-family: SUIT;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 23px;
`;

export const Con = styled.div`
  align-self: stretch;
  color: var(--font-090-a-0-a, #090a0a);
  text-align: right;

  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: 27px;
`;

export const D2 = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Da = styled.div`
  align-self: stretch;
  color: var(--line-494949, #494949);

  font-family: SUIT;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 23px;
`;

export const Dat = styled.div`
  align-self: stretch;
  color: var(--font-090-a-0-a, #090a0a);
  text-align: right;

  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: 27px;
`;

export const T = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Ti = styled.div`
  align-self: stretch;
  color: var(--line-494949, #494949);

  font-family: SUIT;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 23px;
`;

export const Tim = styled.div`
  align-self: stretch;
  color: var(--font-090-a-0-a, #090a0a);
  text-align: right;

  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: 27px;
`;

export const P = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Pr = styled.div`
  align-self: stretch;
  color: var(--line-494949, #494949);

  font-family: SUIT;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 23px;
`;

export const Pri = styled.div`
  align-self: stretch;
  color: var(--font-090-a-0-a, #090a0a);
  text-align: right;

  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: 27px;
`;

export const Button = styled.div`
  width: 200px;
  margin: 30px auto 50px;
  padding: 14px 0;
  width: 70%;

  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  border: 2px solid #e4788b;
  background: #e35a80;
  cursor: pointer;

  position: relative;
  z-index: 10;
`;

export const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

export const Popup = styled.div`
  background: white;
  padding: 30px 30px 30px 30px;
  border-radius: 20px;
  text-align: center;
  margin-top: 160%;
  width: 100%;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export const RectangleGrayImage = styled.img`
  width: 48px;
  height: 5px;
  flex-shrink: 0;
  position: relative;
  top: -30px;
`;

export const PopupTitle = styled.h3`
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 12px;
  margin-top: -5px;
`;

export const PopupText = styled.p`
  font-size: 17px;
  margin-bottom: 20px;
`;

export const PopupButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
  align-items: center;
  justify-content: center;
  margin-bottom: 12%;
`;

export const PopupButton = styled.button`
  padding: 15px 20px;
  width: 90%;
  font-size: 16px;
  border-radius: 30px;
  cursor: pointer;
  background-color: ${(props) =>
    props.primary ? "#E35A80" : "#ffffff"};
  color: ${(props) => (props.primary ? "#fff" : "#333")};
  border: none;
`;
