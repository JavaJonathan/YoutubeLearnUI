import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

export default function SideNavSectionList({ title, items, icon: Icon, getLabel, isSelected, onSelect }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: 0, flex: 1 }}>
      <Typography variant="overline" sx={{ px: 1.5, color: "text.secondary", letterSpacing: 1 }}>
        {title}
      </Typography>

      <Box sx={{ overflowY: "auto", minHeight: 0, flex: 1, pr: 0.5 }}>
        <List sx={{ py: 0 }}>
          {items.map((item) => (
            <ListItem key={item.id} disablePadding>
              <ListItemButton selected={isSelected(item)} onClick={() => onSelect(item)}>
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={getLabel(item)} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}
