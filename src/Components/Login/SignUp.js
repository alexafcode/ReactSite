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
  const { error, errorMessage, loading, createUserAction } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: false,
    password: false
  });

  const validateEmail = email => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email)) {
      setEmail(email);
      setErrors({ ...errors, email: false });
    } else {
      setErrors({ ...errors, email: true });
      setEmail(email);
    }
  };

  const validatePassword = pwd => {
    if (pwd.length >= 6) {
      setPassword(pwd);
      setErrors({ ...errors, password: false });
    } else {
      setPassword(pwd);
      setErrors({ ...errors, password: true });
    }
  };
  const submitForm = e => {
    e.preventDefault();
    if (!errors.email && !errors.password) {
      createUserAction(email, password);
    }
  };

  const avatar = (
    <Avatar className={classes.avatar}>
      <LockOutlinedIcon />
    </Avatar>
  );
  const formError = error && <p style={{ color: "red" }}>{errorMessage}</p>;
  const load = loading && <LinearProgress />;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {avatar}
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={e => submitForm(e)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                value={email}
                error={errors.email}
                variant="outlined"
                required
                fullWidth
                autoFocus
                label="Email Address"
                name="email"
                autoComplete="email"
                helperText={errors.email ? "Email not Corrected" : ""}
                onChange={({ target }) => validateEmail(target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={password}
                error={errors.password}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                helperText={
                  errors.password
                    ? "Your password must be at least 6 characters long"
                    : ""
                }
                onChange={({ target }) => validatePassword(target.value)}
              />
            </Grid>
          </Grid>
          {load}
          {formError}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={e => submitForm(e)}
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
