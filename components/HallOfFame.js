import React from "react";
import Markdown from "markdown-to-jsx";
import { fromImageToUrl, API_URL } from "../utils/urls";
import Link from "../src/Link";

import {
  Box,
  Container,
  Typography,
  IconButton,
  Button,
  Divider,
  Paper,
  useMediaQuery,
  useTheme,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
} from "@material-ui/core";
import AttachmentIcon from "@material-ui/icons/Attachment";
// import NewspaperIcon from "@material-ui/icons/Newspaper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    // backgroundColor: theme.palette.background.paper,
    margin: theme.spacing(0, 0, 0, 4),
  },
  fameContent: {
    paddingTop: theme.spacing(0),
  },
  list: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  table: {
    minWidth: 340,
  },
  tableContaner: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}));

export default function HallOfFame({ hallOfFame }) {
  const classes = useStyles();
  // console.log("Hall of Fame:", hallOfFame.table);
  return (
    <React.Fragment>
      <Container className={classes.fameContent} maxWidth="md">
        {/* Table of Committee Members */}
        {hallOfFame.table && (
          <TableContainer
            component={Paper}
            elevation={3}
            className={classes.tableContainer}
          >
            {hallOfFame.table.title ? (
              <>
                <Box p={(2, 6)}>
                  <Typography variant="h4" align="center">
                    {hallOfFame.table.title}
                  </Typography>
                </Box>
              </>
            ) : (
              <>
                <Box p={(2, 4)}>
                  <Typography variant="h4" align="center">
                    District 21 Hall of Fame
                  </Typography>
                </Box>
              </>
            )}
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.head}>Name</TableCell>
                  <TableCell className={classes.head}>Position</TableCell>
                  <TableCell className={classes.head}>Location</TableCell>
                  <TableCell className={classes.head}>Inducted</TableCell>
                  <TableCell className={classes.head}>Media</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {hallOfFame.table.member.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>{member.name}</TableCell>
                    <TableCell>{member.position}</TableCell>
                    <TableCell>{member.location}</TableCell>
                    <TableCell>{member.year}</TableCell>
                    <TableCell>
                      {(member.url || member.media) && (
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component={Link}
                          target="_blank"
                          href={
                            member.url
                              ? member.url
                              : fromImageToUrl(member.media)
                          }
                        >
                          <AttachmentIcon />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </React.Fragment>
  );
}
