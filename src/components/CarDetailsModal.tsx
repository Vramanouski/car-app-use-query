import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import {
  sendContactForm,
  FormData,
  ResponseData,
} from "../hooks/api/useContactForm";
import { Car } from "../api/carsApi";

interface CarDetailsModalProps {
  open: boolean;
  car: Car | undefined;
  onClose: () => void;
}

export const CarDetailsModal: React.FC<CarDetailsModalProps> = ({
  open,
  car,
  onClose,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      contact: "",
      message: "",
    },
  });

  const mutation = useMutation<ResponseData, Error, FormData>({
    mutationFn: sendContactForm,
    onSuccess: (data) => {
      reset();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  React.useEffect(() => {
    if (car) {
      reset({
        firstName: "",
        lastName: "",
        contact: "",
        message: "",
      });
    }
  }, [car, reset]);

  if (!car) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogContent>
          <CircularProgress />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Selected Car Details</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          {car.car} {car.car_model} ({car.car_model_year})
        </Typography>
        <Typography variant="body2" color="textSecondary">
          VIN: {car.car_vin}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Color: {car.car_color}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Price: {car.price}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Availability: {car.availability ? "Available" : "Not Available"}
        </Typography>
        <Box mt={4}>
          <Typography variant="h6">Customer Information</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="firstName"
              control={control}
              rules={{ required: "First name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Customer First Name"
                  fullWidth
                  margin="normal"
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
              )}
            />
            <Controller
              name="lastName"
              control={control}
              rules={{ required: "Last name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Customer Last Name"
                  fullWidth
                  margin="normal"
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
              )}
            />
            <Controller
              name="contact"
              control={control}
              rules={{
                required: "Contact number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Contact number must be 10 digits",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Customer Contact Number"
                  fullWidth
                  margin="normal"
                  error={!!errors.contact}
                  helperText={errors.contact?.message}
                />
              )}
            />
            <Controller
              name="message"
              control={control}
              rules={{ required: "Message is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Customer Message"
                  fullWidth
                  multiline
                  rows={4}
                  margin="normal"
                  error={!!errors.message}
                  helperText={errors.message?.message}
                />
              )}
            />
            {mutation.isError && (
              <Typography color="error" sx={{ mt: 2 }}>
                {mutation.error?.message ||
                  "Failed to send your message. Please try again later."}
              </Typography>
            )}
            {mutation.isSuccess && (
              <Typography color="primary" sx={{ mt: 2 }}>
                {mutation.data?.message}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={mutation.isPending}
            >
              {mutation.isPending ? <CircularProgress size={24} /> : "Send"}
            </Button>
          </form>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
