import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { signInAction } from "../../store/register/actions";
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
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

function SignIn(props) {
  const { signInAction, loading, error, errorMessage } = props;
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [password, setPassword] = useState("");

  const signIn = e => {
    e.preventDefault();
    if (email && password && !errorEmail) {
      signInAction(email, password);
      setPassword("");
    }
  };

  const emailValidation = email => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email)) {
      setEmail(email);
      setErrorEmail(false);
    } else {
      setEmail(email);
      setErrorEmail(true);
    }
  };
  const emailError = errorEmail && (
    <p style={{ color: "red" }}>{"Email not Corrected"}</p>
  );
  const formError = error && <p style={{ color: "red" }}>{errorMessage}</p>;
  const load = loading && <LinearProgress />;
  const avatar = (
    <Avatar className={classes.avatar}>
      <LockOutlinedIcon />
    </Avatar>
  );

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {avatar}
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={e => signIn(e)}>
          <TextField
            error={errorEmail}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={({ target }) => emailValidation(target.value)}
          />
          {emailError}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          {load}
          {formError}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={e => signIn(e)}
          >
            Sign In
          </Button>
          <Grid container>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
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
  signInAction
};

SignIn.propTypes = {
  error: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  signInAction: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
