import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { UserAuth } from "../context/AuthContext";
import { Google as GoogleIcon } from "../icons/google";
import axios from "axios";
import { useEffect } from "react";

const Login = () => {
  const router = useRouter();
  const formik = useFormik({
    onSubmit: () => {
      router.push("/");
    },
  });
  const { googleSignIn, user, setCurrentHuman } = UserAuth();
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user?.email) {
      console.log("loged in", user);
      axios
        .get(`http://127.0.0.1:5000/humans/email/${user.email}`)
        .then((response) => {
          console.log(response);
          if (response.data?.id) {
            setCurrentHuman(response.data);
            user.human_id = response.data.id;
            router.push("/");
          } else {
            router.push("/register");
          }
        })
        .catch((error) => {
          console.log(`This user cannot access to thus website due to: ${error}`);
        });
    } else {
      console.log(user);
    }
  }, [router, user]);

  return (
    <>
      <Head>
        <title>Login </title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          <NextLink href="/" passHref>
            <Button component="a" startIcon={<ArrowBackIcon fontSize="small" />}>
              Dashboard
            </Button>
          </NextLink>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Sign in
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Get authorization with your Google Account
              </Typography>
            </Box>
            <Grid item xs={12} md={6}>
              <Button
                fullWidth
                color="error"
                startIcon={<GoogleIcon />}
                onClick={handleGoogleSignIn}
                size="large"
                variant="contained"
              >
                Login with Google
              </Button>
            </Grid>

            <Box
              sx={{
                pb: 1,
                pt: 3,
              }}
            ></Box>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
