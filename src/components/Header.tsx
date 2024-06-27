import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material/";

export const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        ></IconButton>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          Car Dealership Platform
        </Typography>
        <Button variant="outlined" color="inherit">
          Sign in
        </Button>
      </Toolbar>
    </AppBar>
  );
};
