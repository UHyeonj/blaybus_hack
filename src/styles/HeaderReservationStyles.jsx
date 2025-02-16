import { styled } from "styled-components";

export const Container = styled.div`
    position: fixed;
    top: 2%;
    gap: 40%;
    width: 100%;
    max-width: 800px;
    padding: 10px;
    text-align: center;
    display: flex;
    justify-content: space-around;
    margin: 0 auto;
    left: 0;
    right: 0;
    z-index: 1000;
`;

export const TimeImage = styled.img`
    color: var(--Ink-Darkest, #090A0A);

    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px; 
`;

export const HeaderSourceImage = styled.img``;