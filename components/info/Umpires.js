import React from "react";
import Markdown from "markdown-to-jsx";
import Link from "../../src/Link";
import { fromImageToUrl } from "../../utils/urls";

import {
  Container,
  Typography,
  Paper,
  Divider,
  Button,
  Box,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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
  box: {
    flexDirection: "column",
    margin: theme.spacing(2, 0, 4, 0),
    [theme.breakpoints.down("xs")]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
    [theme.breakpoints.down("md")]: {
      display: "flex",
      alignItems: "center",
    },
  },
  content: {
    margin: theme.spacing(2, 0, 0, 0),
  },
  linkButton: {
    margin: theme.spacing(4, 0, 0, 0),
    // [theme.breakpoints.down("md")]: {
    //   alignSelf: "center",
    // },
  },
  url: {
    textDecoration: "none",
  },
  divider: {
    marginBottom: theme.spacing(4),
  },
}));

export default function Umpire({ umpires }) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const align = matches ? "left" : "center";

  return (
    <>
      {umpires ? (
        <>
          {/* Hero unit */}
          {umpires.title && (
            <div className={classes.heroContent}>
              <Typography
                component="h2"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                {umpires.title}
              </Typography>
            </div>
          )}
          <Paper className={classes.paper} elevation={3}>
            <Box className={classes.outterBox}>
              <>
                <Box>
                  {umpires.links.map((link) => (
                    <>
                      <Box className={classes.box} key={link.id}>
                        {link.title && (
                          <Typography variant="h6" align={align}>
                            {link.title}
                          </Typography>
                        )}
                        {link.content && (
                          <Typography>
                            <Markdown className={classes.content} align={align}>
                              {link.content}
                            </Markdown>
                          </Typography>
                        )}
                        {link.media && (
                          <Button
                            className={classes.linkButton}
                            size="small"
                            endIcon={<ArrowRightIcon />}
                            color="primary"
                            variant="contained"
                            component={Link}
                            href={fromImageToUrl(link.media)}
                          >
                            Check it out
                          </Button>
                        )}
                        {link.url && (
                          <a
                            href={link.url}
                            target="_blank"
                            className={classes.url}
                          >
                            <Button
                              className={classes.linkButton}
                              size="small"
                              endIcon={<ArrowRightIcon />}
                              color="primary"
                              variant="contained"
                            >
                              Check it out
                            </Button>
                          </a>
                        )}
                      </Box>
                      <Divider className={classes.divider} />
                    </>
                  ))}
                </Box>
              </>
            </Box>
          </Paper>
        </>
      ) : (
        <Box>
          <Typography>Currently no Umpire info right now.</Typography>
        </Box>
      )}
    </>
  );
}
