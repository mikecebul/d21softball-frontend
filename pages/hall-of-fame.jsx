import parse from "html-react-parser";
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
  Grid,
} from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import AttachmentIcon from "@material-ui/icons/Attachment";
// import NewspaperIcon from "@material-ui/icons/Newspaper";
import { makeStyles } from "@material-ui/core/styles";
import ImageCarouselHOF from "../components/ImageCarouselHOF";
import Sponsors from "../components/sponsors";
import Head from "next/head";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiCardActionArea-root": {
      textAlign: "center",
    },
    // margin: theme.spacing(0, 4, 0, 8),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 2, 2, 2),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(6, 2, 2, 2),
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
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const mobile = useMediaQuery(theme.breakpoints.down("xs"));

  const align = matches ? "left" : "center";
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
          <Container maxWidth="md">

            <Box pb={4}>
              <ImageCarouselHOF images={hof.image_carousel} />
            </Box>
          </Container>
        </div>
        {/* End hero unit */}


        {/* Table of Committee Members */}
        <Container maxWidth="md" >
          <Box p={8}>
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
                      <TableCell className={classes.head}>Media</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {hof.table.member.map((member) => (
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
            {hof.links && (
              <Box className={classes.outterBox}>
                <Paper className={classes.paper} elevation={3}>
                  {hof.links.map((link) => (
                    <div key={link.id}>
                      <Box className={classes.box}>
                        {link.title && (
                          <Typography variant="h6" align={align}>
                            {link.title}
                          </Typography>
                        )}
                        {link.content && (
                          <Typography
                            component="div"
                            className={classes.content}
                            align={align}
                          >
                            {parse(link.content)}
                          </Typography>
                        )}
                        {link.media && (
                          <Box className={classes.updateButton}>
                            <Button
                              size="small"
                              endIcon={<ArrowRightIcon />}
                              color="primary"
                              variant="contained"
                              component={Link}
                              href={API_URL + link.media.url}
                            >
                              Check it out
                            </Button>
                          </Box>
                        )}
                        {link.link && (
                          <Box className={classes.updateButton}>
                            <a
                              href={link.link}
                              target="_blank"
                              className={classes.link}
                            >
                              <Button
                                className={classes.updateButton}
                                size="small"
                                endIcon={<ArrowRightIcon />}
                                color="primary"
                                variant="contained"
                              >
                                Check it out
                              </Button>
                            </a>
                          </Box>
                        )}
                      </Box>
                      <Divider className={classes.divider} />
                    </div>
                  ))}
                </Paper>
              </Box>
            )}
            <Sponsors sponsors={sponsors} />
          </Box>
        </Container>
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