import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as HR from "../styles/HeaderReservationStyles";
import Time from "../assets/time.png";
import HeaderSource from "../assets/HeaderSource.png";

const HeaderReservation = () => {
  return (
    <HR.Container>
      <HR.TimeImage src={Time} alt="Time" />
      <HR.HeaderSourceImage src={HeaderSource} alt="HeaderSource" />
    </HR.Container>
  );
};

export default HeaderReservation;
