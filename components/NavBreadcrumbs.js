import React from "react";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "../src/Link";
import { withRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  main: {
    padding: theme.spacing(2, 0, 2, 8),
  },
}));

const NavBreadcrumbs = (props) => {
  const classes = useStyles();

  const location = props.router.asPath;
  const pathnames = location.split("/").filter((x) => x);

  return (
    <React.Fragment>
      {pathnames.length > 0 && (
        <Breadcrumbs aria-label="breadcrumb" className={classes.main}>
          <Link underline="hover" href="/">
            Home
          </Link>
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;
            return isLast ? (
              <Typography key={index}>{name}</Typography>
            ) : (
              <Link key={index} underline="hover" href={routeTo}>
                {name}
              </Link>
            );
          })}
        </Breadcrumbs>
      )}
    </React.Fragment>
  );
};

export default withRouter(NavBreadcrumbs);
