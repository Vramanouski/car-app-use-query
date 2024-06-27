import { AppBar, Toolbar, Typography } from "@mui/material";

interface FooterProps {
  className?: string;
}

export const Footer = ({ className }: FooterProps) => {
  return (
    <AppBar
      position="static"
      className={className}
      sx={{ top: "auto", bottom: 0, mt: "auto" }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h6">
          Version 0.1 - Not for commercial usage
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
