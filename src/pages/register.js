import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { UserAuth } from "../context/AuthContext";

const Register = () => {
  const { user } = UserAuth();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: user.displayName,
      location: "",
      email: user.email,
    },
    validationSchema: Yup.object({
      name: Yup.string().max(255).required("Name is required"),
      location: Yup.string().max(255).required("Location is required"),
    }),
    onSubmit: () => {
      console.log("formik.values", formik.values);
      axios
        .post(`http://127.0.0.1:5000/humans`, formik.values)
        .then((response) => {
          console.log("response", response);
          router.push("/");
        })
        .catch((error) => {
          console.log("ERROR", error);
        });
    },
  });

  const getUserByEmailr = (newUser) => {};

  return (
    <>
      <Head>
        <title>Create a user</title>
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
              Back to posts
            </Button>
          </NextLink>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Create a new account
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.name && formik.errors.name)}
              fullWidth
              helperText={formik.touched.name && formik.errors.name}
              label="User Name"
              margin="normal"
              name="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.location && formik.errors.location)}
              fullWidth
              helperText={formik.touched.location && formik.errors.location}
              label="Location"
              margin="normal"
              name="location"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.location}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Save details Now
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Register;
