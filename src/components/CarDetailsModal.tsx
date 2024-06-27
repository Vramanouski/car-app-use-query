import React, { useState } from "react";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { atom, useAtom } from "jotai";
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
  onFormSubmit: () => void;
}

const firstNameAtom = atom("");
const lastNameAtom = atom("");
const contactAtom = atom("");
const messageAtom = atom("");

export const CarDetailsModal: React.FC<CarDetailsModalProps> = ({
  open,
  car,
  onClose,
  onFormSubmit,
}) => {
  const queryClient = useQueryClient();
  const [firstName, setFirstName] = useAtom(firstNameAtom);
  const [lastName, setLastName] = useAtom(lastNameAtom);
  const [contact, setContact] = useAtom(contactAtom);
  const [message, setMessage] = useAtom(messageAtom);
  const [prevCar, setPrevCar] = useState<Car | undefined>(undefined);
  const [isTouched, setIsTouched] = useState({
    firstName: false,
    lastName: false,
    contact: false,
    message: false,
  });

  const mutation = useMutation<ResponseData, Error, FormData>({
    mutationFn: sendContactForm,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
      resetForm();
      onFormSubmit();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setContact("");
    setMessage("");
    setIsTouched({
      firstName: false,
      lastName: false,
      contact: false,
      message: false,
    });
  };

  if (car && car !== prevCar) {
    setPrevCar(car);
    resetForm();
  }

  const handleBlur = (field: string) => {
    setIsTouched((prevState) => ({ ...prevState, [field]: true }));
  };

  const validate = () => {
    return firstName && lastName && /^[0-9]{10}$/.test(contact) && message;
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validate()) {
      const data: FormData = {
        firstName,
        lastName,
        contact,
        message,
      };
      mutation.mutate(data);
    }
  };

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
          <form onSubmit={onSubmit}>
            <TextField
              label="Customer First Name"
              fullWidth
              margin="normal"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              onBlur={() => handleBlur("firstName")}
              error={!firstName && isTouched.firstName}
              helperText={
                !firstName && isTouched.firstName
                  ? "First name is required"
                  : ""
              }
            />
            <TextField
              label="Customer Last Name"
              fullWidth
              margin="normal"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              onBlur={() => handleBlur("lastName")}
              error={!lastName && isTouched.lastName}
              helperText={
                !lastName && isTouched.lastName ? "Last name is required" : ""
              }
            />
            <TextField
              label="Customer Contact Number"
              fullWidth
              margin="normal"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              onBlur={() => handleBlur("contact")}
              error={
                (!contact || !/^[0-9]{10}$/.test(contact)) && isTouched.contact
              }
              helperText={
                !contact && isTouched.contact
                  ? "Contact number is required"
                  : !/^[0-9]{10}$/.test(contact) && isTouched.contact
                  ? "Contact number must be 10 digits"
                  : ""
              }
            />
            <TextField
              label="Customer Message"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onBlur={() => handleBlur("message")}
              error={!message && isTouched.message}
              helperText={
                !message && isTouched.message ? "Message is required" : ""
              }
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={!validate()}
            >
              Send
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
