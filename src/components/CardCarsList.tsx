import { useState, useMemo, useCallback } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Radio,
  FormControlLabel,
  Grid,
  Paper,
} from "@mui/material";
import { CarDetailsModal } from "./CarDetailsModal";
import { Car } from "../api/carsApi";
import { useCarInfo } from "../hooks/api/useCarInfo";

interface CardCarsListProps {
  cars: Car[];
  onClose: () => void;
  onFormSubmit: () => void;
}

export const CardCarsList: React.FC<CardCarsListProps> = ({
  cars,
  onClose,
  onFormSubmit,
}) => {
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: selectedCar,
    error: carError,
    isLoading: isFetchingCar,
  } = useCarInfo(selectedCarId);

  const handleRadioChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedCarId(Number(event.target.value));
      setIsModalOpen(true);
    },
    []
  );

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleFormSubmitInternal = useCallback(() => {
    setSelectedCarId(null);
    setIsModalOpen(false);
    onFormSubmit();
  }, [onFormSubmit]);

  const memoizedCars = useMemo(() => {
    return cars?.map((car) => (
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
    ));
  }, [cars, selectedCarId, handleRadioChange]);

  return (
    <Box>
      <Grid container spacing={2}>
        {memoizedCars}
      </Grid>
      {isFetchingCar && <CircularProgress />}
      {carError && <Typography color="error">{carError.message}</Typography>}
      <CarDetailsModal
        open={isModalOpen}
        car={selectedCar}
        onClose={handleCloseModal}
        onFormSubmit={handleFormSubmitInternal}
      />
    </Box>
  );
};
