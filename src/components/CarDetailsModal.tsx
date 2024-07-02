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
import { useAtom } from "jotai";
import { atomWithReset, useResetAtom } from "jotai/utils";
import { z } from "zod";
import { useValidation } from "../hooks/validation/useValidation";
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

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  contact: z.string().regex(/^[0-9]{10}$/, "Contact number must be 10 digits"),
  message: z.string().min(1, "Message is required"),
});

const formAtom = atomWithReset({
  firstName: "",
  lastName: "",
  contact: "",
  message: "",
});

export const CarDetailsModal: React.FC<CarDetailsModalProps> = ({
  open,
  car,
  onClose,
  onFormSubmit,
}) => {
  const queryClient = useQueryClient();
  const [form, setForm] = useAtom(formAtom);
  const resetForm = useResetAtom(formAtom);
  const { errors, isValid } = useValidation(formSchema, form);

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

  const handleChange =
    (field: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setForm((prevForm) => ({
        ...prevForm,
        [field]: value,
      }));
    };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isValid) {
      mutation.mutate(form);
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
              value={form.firstName}
              onChange={handleChange("firstName")}
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
            <TextField
              label="Customer Last Name"
              fullWidth
              margin="normal"
              value={form.lastName}
              onChange={handleChange("lastName")}
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
            <TextField
              label="Customer Contact Number"
              fullWidth
              margin="normal"
              value={form.contact}
              onChange={handleChange("contact")}
              error={!!errors.contact}
              helperText={errors.contact}
            />
            <TextField
              label="Customer Message"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              value={form.message}
              onChange={handleChange("message")}
              error={!!errors.message}
              helperText={errors.message}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={!isValid}
            >
              Send
            </Button>
          </form>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onClose();
            resetForm();
          }}
          color="primary"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
