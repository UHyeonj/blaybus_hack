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
  justify-content: flex-start;
  margin-top: 13%;
`;

export const BackImage = styled.img`
  width: 24px;
  height: 24px;
  align-self: flex-start;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 23px;
  align-self: stretch;
`;

export const T2T = styled.div`
  color: #000;
  text-align: center;

  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px;
  margin-top: 10%;
`;

export const T2C = styled.div`
  color: #000;
  text-align: center;

  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: -2%;
`;

export const LineImage = styled.img`
  width: 331px;
  height: 2px;
  margin-top: 5%;
  margin-bottom: 5%;
`;

export const M = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 15px 0;
  gap: 10px;
  width: 100%;
`;

export const MT = styled.div`
  color: #000;

  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  width: 100%;
  text-align: left;
`;

export const MC = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  width: 100%;
  justify-content: flex-start;
`;

export const MC2 = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  width: 100%;
  justify-content: flex-start;
`;

export const ButtonTal = styled.div`
  display: flex;
  height: 30px;
  padding: 7px 15px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  &:hover {
    background-color: #e4788b;
    color: white;
  }
  border-radius: 5px;
`;

export const ButtonY = styled.div`
  display: flex;
  height: 30px;
  padding: 7px 15px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  &:hover {
    background-color: #e4788b;
    color: white;
  }
  border-radius: 5px;
`;

export const ButtonF = styled.div`
  display: flex;
  height: 30px;
  padding: 7px 15px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  &:hover {
    background-color: #e4788b;
    color: white;
  }
  border-radius: 5px;
`;

export const ButtonM = styled.div`
  display: flex;
  height: 30px;
  padding: 7px 15px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  &:hover {
    background-color: #e4788b;
    color: white;
  }
  border-radius: 5px;
`;

export const ButtonC = styled.div`
  display: flex;
  height: 30px;
  padding: 7px 15px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  &:hover {
    background-color: #e4788b;
    color: white;
  }
  border-radius: 5px;
`;

export const ButtonH = styled.div`
  display: flex;
  height: 30px;
  padding: 7px 15px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  &:hover {
    background-color: #e4788b;
    color: white;
  }
  border-radius: 5px;
`;

export const ButtonG = styled.div`
  display: flex;
  height: 30px;
  padding: 7px 15px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  &:hover {
    background-color: #e4788b;
    color: white;
  }
  border-radius: 5px;
`;

export const ButtonB = styled.div`
  display: flex;
  height: 30px;
  padding: 7px 15px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  &:hover {
    background-color: #e4788b;
    color: white;
  }
  border-radius: 5px;
`;

export const Button = styled.div`
  display: flex;
  height: 30px;
  padding: 7px 15px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  border-radius: 5px;
  background-color: ${(props) => (props.active ? "#E4788B" : "#fff")};
  color: ${(props) => (props.active ? "#fff" : "#000")};
  border: 1px solid #e4788b;
`;

export const LogoutButton = styled.div`
  color: var(--brand-a-42-d-4-e, #a42d4e);
  text-align: center;

  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-skip-ink: none;
  text-decoration-thickness: auto;
  text-underline-offset: auto;
  text-underline-position: from-font;
`;
