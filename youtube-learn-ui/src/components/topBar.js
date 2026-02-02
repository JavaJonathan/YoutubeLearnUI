import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function TopBar({
  drawerWidth,
  title,
  active,
  onEditPlaylistCoreInsights
}) {
  const isPlaylistView = active === "playlist_view";

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
            maxWidth: "70%",
          }}
        >
          {title}
        </Typography>

        <Box sx={{ marginLeft: "auto" }}>
          {isPlaylistView ? (
            <Button
              variant="contained"
              onClick={onEditPlaylistCoreInsights}
              sx={{ textTransform: "none" }}
            >
              Core Insights
            </Button>
          ) : null}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
