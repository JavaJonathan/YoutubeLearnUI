import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function TopBar({ drawerWidth, title }) {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        backgroundImage: "none",
      }}
    >
      <Toolbar sx={{ position: "relative", justifyContent: "center" }}>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
          }}
        >
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
