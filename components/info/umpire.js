import React from "react";
import Link from "../../src/Link";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({}));

export default function Hotel() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Container maxWidth="md">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          pt={3}
        >
          {/* <Typography variant="h6">
            Any text specific to Umpires.
          </Typography> */}
          <List>
            <ListItem
              component={Link}
              target="_blank"
              href="https://cdn1.sportngin.com/attachments/document/b428-1722369/Umpire_Registration_Instructions.pdf#_ga=2.214338197.346432825.1636557501-1257782224.1636557500"
            >
              <ListItemText primary="Umpire Registration Instructions" />
            </ListItem>
            <ListItem
              component={Link}
              target="_blank"
              href="https://www.usasoftballmi.org/page/show/1067130-umpire-information"
            >
              <ListItemText primary="USA Softball of Michigan Umpire Home Page" />
            </ListItem>
          </List>
        </Box>
      </Container>
    </React.Fragment>
  );
}
