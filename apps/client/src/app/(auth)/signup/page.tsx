/* eslint-disable no-useless-catch */
"use client";
import React, { useEffect } from "react";

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

import appwriteService from "@/appwrite-service/appwrite";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/user/useUserCTX";

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

export default function SignUp() {
  const router = useRouter();
  const user = useUser();

  const [username, setUsername] = React.useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const dataDestruct: { email: string; password: string } = {
      email: String(data.get("email")),
      password: String(data.get("password")),
    };
    if (dataDestruct.email && dataDestruct.password.length >= 8) {
      try {
        appwriteService.createAccount({
          email: dataDestruct.email,
          password: dataDestruct.password,
          username,
        });
      } catch (error) {
        throw error;
      }
    }
  };

  const handleEnterPress = (e: any) => {
    if (e.key === "Enter") {
      document.getElementById("submitBtn")?.click();
    }
  };

  useEffect(() => {
    user.getUser().then((res: any) => {
      setUsername(res.uid);
    });
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
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              onKeyDown={handleEnterPress}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onKeyDown={handleEnterPress}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onKeyDown={handleEnterPress}
            />
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              id="submitBtn"
              sx={{ mt: 3, mb: 2 }}>
              Sign Up
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
                  onClick={() => router.push("signin")}>
                  {"Already have an account? Sign In"}
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
