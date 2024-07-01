import { useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Box } from "@mui/material";
import { ButtonGetCars } from "./ButtonGetCars";
import "../index.css";
import { CardCarsList } from "./CardCarsList";

export const MainPage = () => {
  const [isCardCarsListOpen, setIsCarsListOpen] = useState(false);

  const handleButtonGetCarsClick = () => {
    setIsCarsListOpen(true);
  };

  const handleCloseList = () => {
    setIsCarsListOpen(false);
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
        {isCardCarsListOpen ? (
          <CardCarsList onClose={handleCloseList} />
        ) : (
          <ButtonGetCars
            onClick={handleButtonGetCarsClick}
            text="Get list of cars"
          />
        )}
      </Box>
      <Footer className="footer-fixed-bottom" />
    </Box>
  );
};
