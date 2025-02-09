"use client";
import { FormEvent, useEffect } from "react";
// Material UI Imports
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

import useAuth from "@/context/auth/useAuth";
import { useRouter } from "next/navigation";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignIn() {
  const router = useRouter();
  const auth = useAuth();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const dataDestruct: { email: string; password: string } = {
      email: String(data.get("email")),
      password: String(data.get("password")),
    };
    if (dataDestruct.email && dataDestruct.password.length >= 8) {
      axios
        .post("http://localhost:8080/api/v1/user/signin", {
          email: dataDestruct.email,
          password: dataDestruct.password,
        })
        .then(async (res: any) => {
          if (res.status == 200) {
            localStorage.setItem("tapbio-token", res.data.token);
            auth.setAuthStatus(true);
            router.push("/profile");
          }
        })
        .catch((error) => {
          console.error("Error signing in:", error);
        });
    }
  };

  const handleEnterClick = (e: any) => {
    if (e.key === "Enter") {
      document.getElementById("submitSignIn")?.click();
    }
  };

  useEffect(() => {
    if (auth.authStatus) {
      router.push(`/profile`);
    }
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              color="secondary"
              variant="standard"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onKeyDown={handleEnterClick}
            />
            <TextField
              margin="normal"
              color="secondary"
              variant="standard"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onKeyDown={handleEnterClick}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              autoFocus
              id="submitSignIn"
              sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <button
                  className="text-blue-500 hover:text-blue-600"
                  onClick={() => router.push("signup")}>
                  {"Don't have an account? Sign Up"}
                </button>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
