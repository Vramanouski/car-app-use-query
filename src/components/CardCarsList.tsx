import { useState } from "react";
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
import { useCarInfo } from "../hooks/api/useCarInfo";
import { useCars } from "../hooks/api/useAllCarsList";

interface CardCarsListProps {
  onClose: () => void;
}

export const CardCarsList: React.FC<CardCarsListProps> = ({ onClose }) => {
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: cars, error, isLoading } = useCars();
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

  const handleFormSubmit = () => {
    setSelectedCarId(null);
    setIsModalOpen(false);
    onClose();
  };

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">{error.message}</Typography>;

  return (
    <Box>
      <Grid container spacing={2}>
        {cars?.map((car) => (
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
      {isFetchingCar && <CircularProgress />}
      {carError && <Typography color="error">{carError.message}</Typography>}
      <CarDetailsModal
        open={isModalOpen}
        car={selectedCar}
        onClose={handleCloseModal}
        onFormSubmit={handleFormSubmit}
      />
    </Box>
  );
};
