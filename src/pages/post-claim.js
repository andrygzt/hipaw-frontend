import Head from "next/head";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { UserAuth } from "../context/AuthContext";
import axios from "axios";
import * as Yup from "yup";
import { petType, postStatus, postType } from "../components/product/post-menu";
import {
  Box,
  Container,
  Button,
  Grid,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Divider,
} from "@mui/material";
import { PostCard } from "../components/product/one-post";
import { DashboardLayout } from "../components/dashboard-layout";
import { backend_url } from "src/env";

const post = posts[0];
// Somehow this must call API of one post

const handleChange = (event) => {
  setValues({
    ...values,
    [event.target.name]: event.target.value,
  });
};

const PostClaim = () => {
  const { user, human } = UserAuth();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
      post_status: "Open",
      human_id: user.human_id,
    },
    validationSchema: Yup.object({
      title: Yup.string().max(255).required("Title is required"),
      description: Yup.string().max(255).required("Description is required"),
    }),

    onSubmit: () => {
      console.log("formik.values", formik.values);
      axios
        .post(`${backend_url}/${user.human_id}/post`, formik.values)
        .then((response) => {
          console.log("response", response);
        })
        .catch((error) => {
          console.log("ERROR", error);
        });
    },
  });

  const [humanData, setHumanData] = useState({ pets: [] });
  useEffect(() => {
    getPetsFromHuman();
  }, []);

  const getPetsFromHuman = () => {
    console.log("user", human.id);
    axios
      .get(`${backend_url}/humans/${human.id}/pets`)
      .then((response) => {
        setHumanData(response.data);
      })
      .catch((error) => {
        console.log("ERROR");
      });
  };

  return (
    <>
      <Head>
        <title>Create a Post {user.human_id}</title>
      </Head>
      <Box
        sx={{
          flexGrow: 1,
          py: 8,
          px: 3,
        }}
      >
        <Container maxWidth={false}>
          <Box sx={{ pt: 3 }}>
            <Grid container spacing={3}>
              <Grid item key={post.id} lg={12} md={12} xs={12}>
                <PostCard post={post} />
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              pt: 3,
            }}
          >
            <Button variant="contained"> Claim </Button>
          </Box>
        </Container>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          px: 3,
          pb: 4,
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Card>
            {/* Try to tenary this subheader and header to do not create same from twice title="Edit a Post"*/}
            <CardHeader
              subheader="Tell me more about what you want to share"
              title="Create a Post"
            />
            <Divider />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} xl={12}>
                  <TextField
                    error={Boolean(formik.touched.title && formik.errors.title)}
                    fullWidth
                    helperText={formik.touched.title && formik.errors.title}
                    label="Title"
                    margin="normal"
                    name="title"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    variant="outlined"
                    sx={{ py: 2 }}
                  />
                  <TextField
                    error={Boolean(formik.touched.description && formik.errors.description)}
                    fullWidth
                    helperText={formik.touched.description && formik.errors.description}
                    label="Description"
                    margin="normal"
                    name="description"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    variant="outlined"
                    sx={{ py: 2 }}
                  />
                  <TextField
                    fullWidth
                    helperText="Post status"
                    label="Status"
                    name="status"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    required
                    select
                    SelectProps={{ native: true }}
                    value={formik.values.status}
                    variant="outlined"
                    sx={{ py: 2 }}
                  >
                    {postStatus.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                  <TextField
                    fullWidth
                    helperText="Pet"
                    label="Pet"
                    name="pet_id"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    required
                    select
                    SelectProps={{ native: true }}
                    value={formik.values.pet_id}
                    variant="outlined"
                    sx={{ py: 2 }}
                  >
                    {humanData.pets.map((pet) => (
                      <option key={pet.id} value={pet.id}>
                        {pet.name}
                      </option>
                    ))}
                  </TextField>
                  <TextField
                    fullWidth
                    helperText="Select a category for your item"
                    label="Category"
                    name="category"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    required
                    select
                    SelectProps={{ native: true }}
                    value={formik.values.category}
                    variant="outlined"
                    sx={{ py: 2 }}
                  >
                    {postType.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                  <Button variant="contained">
                    Upload Photo
                    <input type="file" hidden />
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              px: 3,
              pb: 4,
              display: "flex",
              justifyContent: "center",
            }}
          >
            {/* Try to tenary this Button to "save`" to do not create same from twice */}
            <Button
              color="primary"
              disabled={formik.isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Create
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

PostClaim.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default PostClaim;
