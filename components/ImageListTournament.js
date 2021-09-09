import React from "react";
import Image from "next/image";
import { API_URL } from "../utils/urls";
import Link from "../src/Link";

import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  center: {
    justifyContent: "center",
  },
}));

const ImageListTournament = ({ tournament }) => {
  const classes = useStyles();
  const myLoader = ({ src, width, quality }) => {
    return `${API_URL}${src}?w=${width}&q=${quality || 75}`;
  };
  return (
    <Box display="flex" justifyContent="center">
      {tournament.resultsMedia && (
        <div className={classes.root}>
          <ImageList className={classes.imageList} cols={2.5}>
            {tournament.resultsMedia.map((item) => (
              <ImageListItem
                key={item.id}
                cols={2}
                rows={2}
                className="classes.center"
              >
                <Link
                  href={{
                    pathname: `${API_URL}${item.url}`,
                  }}
                  target="_blank"
                >
                  <Image
                    loader={myLoader}
                    src={item.url}
                    alt={item.caption}
                    width={500}
                    height={500}
                    layout="intrinsic"
                    objectFit="cover"
                  />
                  <ImageListItemBar
                    title={item.caption}
                    arial-label={item.caption}
                    position="bottom"
                    actionPosition="left"
                    className={classes.titleBar}
                  />
                </Link>
              </ImageListItem>
            ))}
          </ImageList>
        </div>
      )}
    </Box>
  );
};

export default ImageListTournament;
