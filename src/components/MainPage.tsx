import React, { useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Box } from "@mui/material";
import { ButtonGetCars } from "./ButtonGetCars";
import "../index.css";
import { useCars } from "../hooks/api/useAllCarsList";
import { CardCarsList } from "./CardCarsList";

export const MainPage = () => {
  const [isCardCarsListOpen, setIsCarsListOpen] = useState(false);
  const { data, error, isLoading } = useCars(isCardCarsListOpen);

  const handleButtonGetCarsClick = () => {
    setIsCarsListOpen((prevState) => !prevState);
  };

  return (
    <Box className="main-content">
      <Header />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CardCarsList
          isOpen={isCardCarsListOpen}
          cars={data}
          isLoading={isLoading}
          error={error}
        />
        <ButtonGetCars
          onClick={handleButtonGetCarsClick}
          text={isCardCarsListOpen ? "Close" : "Get list of cars"}
        />
      </Box>
      <Footer className="footer-fixed-bottom" />
    </Box>
  );
};
