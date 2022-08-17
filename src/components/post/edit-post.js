import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { postStatus, postType } from "./post-menu";
import { useState } from "react";
import axios from "axios";
import { backend_url } from "src/env";

export const PostEdit = ({ humanData, post, isClaim, ...rest }) => {
  const router = useRouter();
  const [imageInfo, setimageInfo] = useState({});
  const hasPost = post ? true : false;
  let initialFormikData = {
    title: "",
    description: "",
    category: "",
    post_status: "Open",
    is_claim: false,
  };
  let postTypeName = isClaim ? "Claim" : "Post";
  let title = `Create a ${postTypeName}`;
  let submitContent = "Create";
  if (hasPost && !isClaim) {
    initialFormikData = {
      title: post.title,
      description: post.description,
      category: post.category,
      post_status: post.status,
      is_claim: post.is_claim,
    };
    title = `Edit a ${postTypeName}`;
    submitContent = "Create Post";
  }
  if (isClaim) {
    initialFormikData = {
      title: "",
      description: "",
      category: "",
      post_status: "Open",
      is_claim: true,
      reference_post_id: post.id,
    };
    submitContent = "Create Claim";
  }
  const formik = useFormik({
    initialValues: initialFormikData,
    validationSchema: Yup.object({
      title: Yup.string().max(255).required("Title is required"),
      description: Yup.string().max(255).required("Description is required"),
    }),

    onSubmit: () => {
      console.log(humanData);
      axios
        .post(`${backend_url}/humans/${humanData.human_id}/post`, formik.values)
        .then((response) => {
          uploadImage(response.data.post_id);
          console.log("response", response);
        })
        .catch((error) => {
          console.log("ERROR", error);
        });
    },
  });

  const uploadImage = async (post_id) => {
    const formData = new FormData();
    formData.append("image", imageInfo.bytes);
    try {
      const response = await axios({
        method: "patch",
        url: `${backend_url}/posts/${post_id}/photo`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card>
        {/* Try to tenary this subheader and header to do not create same from twice title="Edit a Post"*/}
        <CardHeader subheader="Tell me more about what you want to share" title={title} />
        <Divider />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} xl={12}>
              <TextField
                error={Boolean(formik.touched.title && formik.errors.title)}
                fullWidth
                helperText={formik.touched.title && formik.errors.title}
                label="Title"
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
                <option value="">Select a pet</option>
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
              <Button variant="contained" component="label">
                Upload Photo
                <input
                  name="image"
                  accept="image/jpg"
                  id="contained-button-file"
                  type="file"
                  hidden
                  onChange={(e) => {
                    const fileReader = new FileReader();
                    fileReader.onload = () => {
                      if (fileReader.readyState === 2) {
                        console.log(fileReader);
                        setimageInfo({ bytes: e.target.files[0], base64: fileReader.result });
                      }
                    };
                    fileReader.readAsDataURL(e.target.files[0]);
                    console.log(e.target.files[0]);
                  }}
                />
              </Button>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  pb: 6,
                }}
              >
                <Avatar
                  alt="Post"
                  src={imageInfo.base64}
                  variant="square"
                  sx={{
                    height: 300,
                    mb: 2,
                    width: 300,
                  }}
                />
              </Box>
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
          {submitContent}
        </Button>
      </Box>
    </form>
  );
};
