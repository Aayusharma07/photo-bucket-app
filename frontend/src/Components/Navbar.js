import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";

// Custom styles for Navbar
const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(1),
  },
  link: {
    textDecoration: "none",
    color: "#fff",
    marginRight: theme.spacing(2),
  },
}));

export default function Navbar() {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" component="div" className={classes.title}>
          Photo Bucket
        </Typography>
        <Button
          color="inherit"
          component={Link}
          to="/signin"
          className={classes.link}
        >
          Sign In
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/signup"
          className={classes.link}
        >
          Sign Up
        </Button>
      </Toolbar>
    </AppBar>
  );
}
