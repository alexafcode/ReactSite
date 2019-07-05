import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createUserAction } from "../../store/register/actions";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

function SignUp(props) {
  const classes = useStyles();

  const [state, setState] = useState({
    email: "",
    password: "",
    emailError: false,
    passwordError: false,
    emailErrorText: "",
    passwordErrorText: ""
  });

  const emailValidation = email => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email)) {
      setState({
        ...state,
        email: email,
        emailError: false,
        emailErrorText: ""
      });
    } else {
      setState({
        ...state,
        email: email,
        emailError: true,
        emailErrorText: "Email not Corrected"
      });
    }
  };

  const pwdValidation = pwd => {
    if (pwd.length >= 6) {
      setState({
        ...state,
        password: pwd,
        passwordError: false,
        passwordErrorText: ""
      });
    } else {
      setState({
        ...state,
        password: pwd,
        passwordError: true,
        passwordErrorText: "Your password must be at least 6 characters long "
      });
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            {/* <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                value={state.email}
                error={state.emailError}
                variant="outlined"
                required
                fullWidth
                autoFocus
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={e => emailValidation(e.target.value)}
              />
              {state.emailError && (
                <p style={{ color: "red" }}>{state.emailErrorText}</p>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={state.password}
                error={state.passwordError}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                onChange={e => pwdValidation(e.target.value)}
              />
              {state.passwordError && (
                <p style={{ color: "red" }}>{state.passwordErrorText}</p>
              )}
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          {props.loading && <LinearProgress />}
          {props.error && <p style={{ color: "red" }}>{props.errorMessage}</p>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={e => {
              e.preventDefault();
              if (!state.emailError && !state.passwordError) {
                props.createUserAction(state.email, state.password);
              }
            }}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

const mapStateToProps = state => {
  return {
    error: state.AuthReducers.error,
    errorMessage: state.AuthReducers.errorMessage,
    loading: state.AuthReducers.loading
  };
};
const mapDispatchToProps = {
  createUserAction
};

SignUp.propTypes = {
  error: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  createUserAction: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
