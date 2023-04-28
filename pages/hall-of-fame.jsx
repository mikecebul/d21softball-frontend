import React, { useState } from "react";
import parse from "html-react-parser";
import { API_URL } from "../utils/urls";

import {
  Box,
  Container,
  Typography,
  IconButton,
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
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from "@material-ui/core/styles";
import ImageCarouselHOF from "../components/ImageCarouselHOF";
import Sponsors from "../components/sponsors";
import Head from "next/head";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiCardActionArea-root": {
      textAlign: "center",
    },
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 2, 2, 2),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(6, 0, 2, 0),
    },
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
  outterBox: {
    margin: theme.spacing(4, 0, 4, 0),
  },
  paper: {
    padding: theme.spacing(4, 8, 4, 8),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(2, 0, 2, 0),
    },
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  updateButton: {
    margin: theme.spacing(4, 0, 0, 0),
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "center",
    },
  },
  link: {
    textDecoration: "none",
  },
  content: {
    margin: theme.spacing(2, 0, 0, 0),
  },
  divider: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
  },
}));

export default function HOF({ hof, sponsors }) {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [expanded, setExpanded] = useState(false);
  const handleAccordionToggle = (event, index) => {
    setExpanded(expanded === index ? false : index);
  };

  return (
    <>
      <Head>
        <title>Hall of Fame</title>
        <meta
          name="description"
          content="Forever immortalized in the District 21 Softball Hall of Fame. A team of legends that will never be forgotten."
        />
      </Head>
      <main className={classes.root}>

        <div className={classes.heroContent}>
          <Typography
            component="h1"
            variant={mobile ? "h4" : "h2"}
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Hall of Fame
          </Typography>
          <Typography
            variant={mobile ? "body1" : "h5"}
            align="center"
            color="textSecondary"
            paragraph
          >
            Celebrating achievements and honoring excellence
          </Typography>
        </div>
        {/* End hero unit */}


        {/* Table of Committee Members */}
        {mobile ? (
          <Box pl={2} pr={2} pt={2} pb={2}>
            <Box pb={4}>
              <ImageCarouselHOF images={hof.image_carousel} />
            </Box>
            {hof.table && (
              <TableContainer
                component={Paper}
                elevation={3}
                className={classes.tableContainer}
              >
                {hof.table.title ? (
                  <Box p={(2, 6)}>
                    <Typography variant="h4" align="center">
                      {hof.table.title}
                    </Typography>
                  </Box>
                ) : (
                  <Box p={(2, 4)}>
                    <Typography variant="h4" align="center">
                      District 21 Hall of Fame
                    </Typography>
                  </Box>
                )}
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.head}>Name</TableCell>
                      <TableCell className={classes.head}>Position</TableCell>
                      <TableCell className={classes.head}>Location</TableCell>
                      <TableCell className={classes.head}>Inducted</TableCell>
                      <TableCell className={classes.head}>More</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {hof.table.member.map((member, index) => (
                      <React.Fragment key={member.id}>
                        <TableRow>
                          <TableCell>{member.name}</TableCell>
                          <TableCell>{member.position}</TableCell>
                          <TableCell>{member.location}</TableCell>
                          <TableCell>{member.year}</TableCell>
                          <TableCell>
                            {!!member.summary &&
                              <IconButton
                                onClick={(event) => handleAccordionToggle(event, index)}
                                aria-expanded={expanded === index}
                                aria-label="show more"
                              >
                                <ExpandMoreIcon />
                              </IconButton>
                            }
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={5} style={{ padding: 0 }}>
                            <Collapse in={expanded === index} timeout="auto" unmountOnExit>
                              <Box p={2}>
                                {/* Add the additional information you want to show here */}
                                {!!member.summary &&
                                  <Typography>
                                    {parse(member.summary)}
                                  </Typography>
                                }
                              </Box>
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        ) : (
          <Container maxWidth="md">
            <Box pt={8} pb={2}>
              <Box pb={4}>
                <ImageCarouselHOF images={hof.image_carousel} />
              </Box>
              {hof.table && (
                <TableContainer
                  component={Paper}
                  elevation={3}
                  className={classes.tableContainer}
                >
                  {hof.table.title ? (
                    <Box p={(2, 6)}>
                      <Typography variant="h4" align="center">
                        {hof.table.title}
                      </Typography>
                    </Box>
                  ) : (
                    <Box p={(2, 4)}>
                      <Typography variant="h4" align="center">
                        District 21 Hall of Fame
                      </Typography>
                    </Box>
                  )}
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell className={classes.head}>Name</TableCell>
                        <TableCell className={classes.head}>Position</TableCell>
                        <TableCell className={classes.head}>Location</TableCell>
                        <TableCell className={classes.head}>Inducted</TableCell>
                        <TableCell className={classes.head}>More</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {hof.table.member.map((member, index) => (
                        <React.Fragment key={member.id}>
                          <TableRow>
                            <TableCell>{member.name}</TableCell>
                            <TableCell>{member.position}</TableCell>
                            <TableCell>{member.location}</TableCell>
                            <TableCell>{member.year}</TableCell>
                            <TableCell>
                              {!!member.summary &&
                                <IconButton
                                  onClick={(event) => handleAccordionToggle(event, index)}
                                  aria-expanded={expanded === index}
                                  aria-label="show more"
                                >
                                  <ExpandMoreIcon
                                    style={{
                                      transform: expanded === index ? "rotate(180deg)" : "rotate(0deg)",
                                      transition: "transform 0.3s",
                                    }} />
                                </IconButton>
                              }
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell colSpan={5} style={{ padding: 0 }}>
                              <Collapse in={expanded === index} timeout="auto" unmountOnExit>
                                <Box p={2}>
                                  {/* Add the additional information you want to show here */}
                                  {!!member.summary &&
                                    <Typography>
                                      {parse(member.summary)}
                                    </Typography>
                                  }
                                </Box>
                              </Collapse>
                            </TableCell>
                          </TableRow>
                        </React.Fragment>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Box>
          </Container>
        )}
        <Box pb={8}>
          <Sponsors sponsors={sponsors} />
        </Box>
      </main >
    </>

  )
}

export async function getStaticProps() {
  const hof_res = await fetch(`${API_URL}/hall-of-fame/`);
  const hof = await hof_res.json();

  const sponsor_res = await fetch(`${API_URL}/sponsors/`);
  const sponsors = await sponsor_res.json();

  return {
    props: {
      hof,
      sponsors,
    },
  };
}