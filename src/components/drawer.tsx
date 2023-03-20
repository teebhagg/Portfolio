import { Drawer, ListItem, ListItemButton, ListItemText } from "@mui/material";

interface Props {
  open: boolean;
  toggleDrawer: (open: boolean) => void;
}

export default function MyDrawer(props: Props) {
  const { open, toggleDrawer } = props;

  const clear_icon = require('../images/clear.svg')

  return (
    <Drawer
      anchor={"right"}
      open={open}
      onClose={() => toggleDrawer(false)}
      role="presentation"
      PaperProps={{
        style: {
          height: "fit-Content",
          width: "100%",
          opacity: 0.85,
          background: "rgba(44, 51, 51, 1)",
          color: "white",
        },
      }}
    >
      <ListItem sx={{ justifyContent: 'end' }} >
        <img src={clear_icon.default} alt="" height={'24px'} onClick={()=>{toggleDrawer(false)}} />
      </ListItem>
      <ListItem>
        <ListItemButton>
          <ListItemText primary={"About"} />
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton>
          <ListItemText primary={"Project"} />
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton>
          <ListItemText primary={"Contact"} />
        </ListItemButton>
      </ListItem>
    </Drawer>
  );
}
