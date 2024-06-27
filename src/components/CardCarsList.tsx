import React, { useState } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Radio,
  FormControlLabel,
  Grid,
  Paper,
} from "@mui/material";
import { Car } from "../api/carsApi";
import { CarDetailsModal } from "./CarDetailsModal";
import { useCarInfo } from "../hooks/api/useCarInfo";

interface CustomButtonProps {
  isOpen: boolean;
  cars: Car[] | undefined;
  isLoading: boolean;
  error: Error | null;
}

export const CardCarsList: React.FC<CustomButtonProps> = ({
  isOpen,
  cars,
  isLoading,
  error,
}) => {
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: selectedCar,
    error: carError,
    isLoading: isFetchingCar,
  } = useCarInfo(selectedCarId);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCarId(Number(event.target.value));
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Box>
      {isLoading && <CircularProgress />}
      {error && <Typography color="error">{error.message}</Typography>}
      {cars && (
        <Grid container spacing={2}>
          {cars.slice(0, 10).map((car: Car) => (
            <Grid item xs={12} sm={6} md={6} key={car.id}>
              <Paper
                elevation={3}
                sx={{ padding: 2, display: "flex", alignItems: "center" }}
              >
                <FormControlLabel
                  control={
                    <Radio
                      checked={selectedCarId === car.id}
                      onChange={handleRadioChange}
                      value={car.id}
                      name="car-radio-button"
                    />
                  }
                  label=""
                  sx={{ marginRight: 2 }}
                />
                <Box>
                  <Typography variant="body1" component="div">
                    {car.car} {car.car_model}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Year: {car.car_model_year}, Price: {car.price}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
      {isFetchingCar && <CircularProgress />}
      <CarDetailsModal
        open={isModalOpen}
        car={selectedCar}
        onClose={handleCloseModal}
      />
    </Box>
  );
};
