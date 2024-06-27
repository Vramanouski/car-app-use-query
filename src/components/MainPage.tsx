import { useState, useEffect } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Box } from "@mui/material";
import { ButtonGetCars } from "./ButtonGetCars";
import "../index.css";
import { CardCarsList } from "./CardCarsList";
import { useCars } from "../hooks/api/useAllCarsList";
import { Car } from "../api/carsApi";

export const MainPage = () => {
  const [isCardCarsListOpen, setIsCarsListOpen] = useState(false);
  const [refreshCars, setRefreshCars] = useState(false);
  const [randomCars, setRandomCars] = useState<Car[]>([]);

  const { data: cars, error, isLoading, refetch } = useCars();

  const handleButtonGetCarsClick = () => {
    setRefreshCars((prev) => !prev);
    setIsCarsListOpen(true);
  };

  const handleCloseList = () => {
    setIsCarsListOpen(false);
  };

  const handleFormSubmit = () => {
    refetch();
  };

  useEffect(() => {
    if (cars && cars.length > 0) {
      const getRandomCars = (cars: Car[], count: number) => {
        const shuffled = cars.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
      };
      setRandomCars(getRandomCars(cars, 10));
    }
  }, [cars, refreshCars]);

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
          <CardCarsList
            cars={randomCars}
            onClose={handleCloseList}
            onFormSubmit={handleFormSubmit}
          />
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
