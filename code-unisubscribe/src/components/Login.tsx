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
import { Link as RouterLink, useHistory } from "react-router-dom";
import axios from "axios";
import { Modal } from "@material-ui/core";

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
    marginTop: theme.spacing(9),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    marginTop: theme.spacing(5),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  animatedItem: {
    animation: `$myEffect 3000ms ${theme.transitions.easing.easeInOut}`,
  },
  copyright: {
    marginBottom: theme.spacing(3),
  },
  animatedItemExiting: {
    animation: `$myEffectExit 3000ms ${theme.transitions.easing.easeInOut}`,
    opacity: 0,
    transform: "translateX(200%)",
  },

  "@keyframes myEffect": {
    "0%": {
      opacity: 0,
      transform: "translateX(200%)",
    },
    "100%": {
      opacity: 1,
      transform: "translateX(0)",
    },
  },
  "@keyframes myEffectExit": {
    "0%": {
      opacity: 1,
      transform: "translateX(0)",
    },
    "100%": {
      opacity: 0,
      transform: "translateX(200%)",
    },
  },
}));
export default function SignIn() {
  const classes = useStyles();
  const history = useHistory();
  const [userName, setUserName] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [isShowModal, setIsShowModal] = useState<any>(false);
  const [body, setBody] = useState<any>("Your username or password is false");

  const [exit, setExit] = React.useState(false);

  const SignupSchema = Yup.object().shape({
    password: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string()
      .email("Invalid email")
      .required("Required")
      .min(2, "Too Short!")
      .max(50, "Too Long!"),
  });

  return (
    <>
      <Modal
        open={isShowModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <>{body}</>
      </Modal>
      <Container
        component="main"
        maxWidth="xs"
        className={clsx(classes.animatedItem, {
          [classes.animatedItemExiting]: exit,
        })}
        style={{
          backgroundColor: "#f1f1f1",
          borderRadius: "5px",
          paddingBottom: "1rem",
        }}
      >
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={(values) => {
              axios
                .post("http://172.28.0.37:8080/api/login", {
                  username: values.email,
                  password: values.password,
                })
                .then((response) => {
                  localStorage.setItem("token", response.data.token);
                  history.push("/subscription");
                });
            }}
          >
            {({ errors, touched, handleSubmit }) => (
              <form style={{ width: "25rem" }}>
                <label
                  htmlFor="email"
                  style={{ color: "#3f51b5", fontWeight: "bold" }}
                >
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  className="form-control"
                  style={{ padding: "0.7rem", margin: "1rem 0" }}
                />
                {errors.email && touched.email ? (
                  <div style={{ color: "#f50057", fontWeight: "bold" }}>
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
                  placeholder="Password"
                  type="password"
                  className="form-control"
                  style={{ padding: "0.7rem", margin: "1rem 0" }}
                />
                {errors.password && touched.password ? (
                  <div style={{ color: "#f50057", fontWeight: "bold" }}>
                    {errors.password}
                  </div>
                ) : null}

                <button
                  className="btn"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  color="primary"
                  style={{
                    backgroundColor: "#f50057",
                    width: "100%",
                    color: "white",
                    fontWeight: "bold",
                    margin: "5px 3px",
                  }}
                >
                  Sign In
                </button>
              </form>
            )}
          </Formik>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}
