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
} from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import AttachmentIcon from "@material-ui/icons/Attachment";
// import NewspaperIcon from "@material-ui/icons/Newspaper";
import { makeStyles } from "@material-ui/core/styles";
import ImageCarouselHOF from "./ImageCarouselHOF";

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

export default function HallOfFame({ hallOfFame }) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const mobile = useMediaQuery(theme.breakpoints.down("xs"));

  const align = matches ? "left" : "center";
  // console.log("Hall of Fame:", hallOfFame.table);
  return (
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
      <>
        {hallOfFame.links && (
          <>
            <Box className={classes.outterBox}>
              <Paper className={classes.paper} elevation={3}>
                {hallOfFame.links.map((link) => (
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
          </>
        )}
      </>
    </Container>
  );
}
