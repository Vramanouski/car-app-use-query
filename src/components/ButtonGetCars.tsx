import Button from "@mui/material/Button";
import { ButtonProps } from "@mui/material";

interface CustomButtonProps extends ButtonProps {
  text: string;
}

export const ButtonGetCars: React.FC<CustomButtonProps> = ({
  text,
  ...props
}) => {
  return (
    <Button
      type="button"
      variant="outlined"
      color="primary"
      sx={{
        "&:hover": {
          color: "white",
          backgroundColor: "blue",
          cursor: "pointer",
        },
        margin: 4,
      }}
      {...props}
    >
      {text}
    </Button>
  );
};
