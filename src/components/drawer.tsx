import { Drawer, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useEffect } from "react";

interface Props {
  open: boolean;
  toggleDrawer: (open: boolean) => void;
}

let aboutDiv = document.querySelector("#about");
let projectsDiv = document.querySelector("#projects");
let contactDiv = document.querySelector("#contact");

export default function MyDrawer(props: Props) {
  const { open, toggleDrawer } = props;

  const clear_icon = require("../images/clear.svg");

  useEffect(() => {
    aboutDiv = document.querySelector("#about");
    projectsDiv = document.querySelector("#projects");
    contactDiv = document.querySelector("#contact");
  }, []);

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
          background: "rgba(44, 51, 51, 1)",
          color: "white",
        },
      }}>
      <ListItem sx={{ justifyContent: "end" }}>
        <img
          src={clear_icon.default}
          alt=""
          height={"24px"}
          onClick={() => {
            toggleDrawer(false);
          }}
        />
      </ListItem>
      <ListItem>
        <ListItemButton
          onClick={(e) => {
            // toggleDrawer(false);
            aboutDiv!.scrollIntoView({ behavior: "smooth" });
          }}
          sx={{ cursor: "pointer" }}>
          <ListItemText primary={"About"} />
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton
          onClick={(e) => {
            // toggleDrawer(false);
            projectsDiv!.scrollIntoView({ behavior: "smooth" });
          }}
          sx={{ cursor: "pointer" }}>
          <ListItemText primary={"Project"} />
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton
          onClick={(e) => {
            contactDiv!.scrollIntoView({ behavior: "smooth" });
            // toggleDrawer(false);
          }}
          sx={{ cursor: "pointer" }}>
          <ListItemText primary={"Contact"} />
        </ListItemButton>
      </ListItem>
    </Drawer>
  );
}
