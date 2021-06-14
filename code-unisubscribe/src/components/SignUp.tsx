import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { Link as RouterLink, useHistory } from "react-router-dom";
import Paper from "@material-ui/core/Paper";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import clsx from "clsx";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://www.facebook.com/nebiyev.nurmehemmed/"
      >
        NoteSub
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0, 1),
  },
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  animatedItem: {
    animation: `$myEffect 2000ms ${theme.transitions.easing.easeInOut}`,
  },
  animatedItemExiting: {
    animation: `$myEffectExit 2000ms ${theme.transitions.easing.easeInOut}`,
    opacity: 0,
    transform: "translateY(200%)",
  },
  "@keyframes myEffect": {
    "0%": {
      opacity: 0,
      transform: "translateY(200%)",
    },
    "100%": {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
  "@keyframes myEffectExit": {
    "0%": {
      opacity: 1,
      transform: "translateY(0)",
    },
    "100%": {
      opacity: 0,
      transform: "translateY(200%)",
    },
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();

  const [firstName, setFirstName] = useState<String>("");
  const [lastName, setLastName] = useState<String>("");
  const [email, setEmail] = useState<String>("");
  const [phoneNumber, setPhoneNumber] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [file, setFile] = useState<String>();
  const [exit, setExit] = React.useState(false);

  const handleRegister = (e: any) => {
    e.preventDefault();
  };

  const SignupSchema = Yup.object().shape({
    firstname: Yup.string()
      .min(4, "Too Short!")
      .max(20, "Too Long!")
      .required("Required"),
    lastname: Yup.string()
      .min(4, "Too Short!")
      .max(20, "Too Long!")
      .required("Required"),
    password: Yup.string()
      .min(6, "Too Short!")
      .max(20, "Too Long!")
      .required("Required"),
    email: Yup.string()
      .email("Invalid email")
      .required("Required")
      .min(2, "Too Short!")
      .max(50, "Too Long!"),
  });
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Formik
              initialValues={{
                firstname: "",
                lastname: "",
                email: "",
                password: "",
              }}
              validationSchema={SignupSchema}
              onSubmit={(values) => {
                // same shape as initial values
                axios
                  .post("http://172.28.0.37:8080/api/register", {
                    name: values.firstname,
                    surname: values.lastname,
                    email: values.email,
                    phoneNumber: null,
                    password: values.password,
                  })
                  .then((response) => {
                    console.log(response.data);
                    history.push("/login");
                  })
                  .catch((error) => console.error(error));
              }}
            >
              {({ errors, touched, handleSubmit }) => (
                <form onSubmit={handleSubmit} style={{ width: "25rem" }}>
                  <label
                    htmlFor=""
                    style={{ color: "#3f51b5", fontWeight: "bold" }}
                  >
                    Firstname
                  </label>
                  <Field
                    name="firstname"
                    type="text"
                    placeholder="Firstname*"
                    className="form-control"
                    style={{ padding: "0.7rem", margin: "0.7rem 0" }}
                  />
                  {errors.firstname && touched.firstname ? (
                    <div
                      style={{
                        color: "#f50057",
                        fontSize: "1rem",
                        fontWeight: "bold",
                      }}
                    >
                      {errors.firstname}
                    </div>
                  ) : null}

                  <label
                    htmlFor="lastname"
                    style={{
                      color: "#3f51b5",
                      fontSize: "1rem",
                      fontWeight: "bold",
                    }}
                  >
                    Lastname
                  </label>
                  <Field
                    name="lastname"
                    type="text"
                    placeholder="Lastname*"
                    className="form-control"
                    style={{ padding: "0.7rem", margin: "0.7rem 0" }}
                  />
                  {errors.lastname && touched.lastname ? (
                    <div
                      style={{
                        color: "#f50057",
                        fontSize: "1rem",
                        fontWeight: "bold",
                      }}
                    >
                      {errors.email}
                    </div>
                  ) : null}
                  <label
                    htmlFor="email"
                    style={{
                      color: "#3f51b5",
                      fontSize: "1rem",
                      fontWeight: "bold",
                    }}
                  >
                    Email
                  </label>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Email Address*"
                    className="form-control"
                    style={{ padding: "0.7rem", margin: "0.7rem 0" }}
                  />
                  {errors.email && touched.email ? (
                    <div
                      style={{
                        color: "#f50057",
                        fontSize: "1rem",
                        fontWeight: "bold",
                      }}
                    >
                      {errors.email}
                    </div>
                  ) : null}
                  <label
                    htmlFor="price"
                    style={{ color: "#3f51b5", fontWeight: "bold" }}
                  >
                    Password
                  </label>
                  <Field
                    name="password"
                    placeholder="Password*"
                    type="password"
                    className="form-control"
                    style={{ padding: "0.7rem", margin: "0.7rem 0" }}
                  />
                  {errors.password && touched.password ? (
                    <div style={{ color: "#f50057", fontWeight: "bold" }}>
                      {errors.password}
                    </div>
                  ) : null}
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                  >
                    Sign Up
                  </Button>
                  <Grid container justify="flex-end">
                    <Grid item>
                      <Link href="/login" variant="body2">
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Formik>
          </div>
          <Box mt={4}>
            <Copyright />
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
}
