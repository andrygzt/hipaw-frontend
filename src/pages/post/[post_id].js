import Head from "next/head";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { UserAuth } from "../../context/AuthContext";
import axios from "axios";
import * as Yup from "yup";

import { postStatus, postType } from "../../components/post/post-menu";
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
  Avatar,
} from "@mui/material";
import { PostCard } from "../../components/post/one-post";
import { DashboardLayout } from "../../components/dashboard-layout";
import { PostEdit } from "src/components/post/edit-post";
import { backend_url } from "src/env";

const PostClaim = () => {
  const { user, human } = UserAuth();
  const router = useRouter();
  const { post_id } = router.query;
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
      post_status: "Open",
      is_claim: true,
      reference_post_id: post_id,
    },
    validationSchema: Yup.object({
      title: Yup.string().max(255).required("Title is required"),
      description: Yup.string().max(255).required("Description is required"),
    }),

    onSubmit: () => {
      console.log("formik.values", formik.values);
      axios
        .post(`${backend_url}/humans/${user.human_id}/post`, formik.values)
        .then((response) => {
          console.log("response", response);
        })
        .catch((error) => {
          console.log("ERROR", error);
        });
    },
  });

  const [humanData, setHumanData] = useState({ pets: [] });
  const [post, setPost] = useState({});
  const [creatingClaim, setCreatingClaim] = useState(false);
  useEffect(() => {
    getPetsFromHuman();
    getPost();
  }, []);

  const getPost = () => {
    axios
      .get(`${backend_url}/posts/${post_id}`)
      .then((response) => {
        console.log("response", response);
        setPost(response.data);
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  };

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
        <title>Post Detail {post_id}</title>
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
            <Grid container
spacing={3}>
              <Grid item
key={post.id}
lg={12}
md={12}
xs={12}>
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
            <Button variant="contained"
onClick={() => setCreatingClaim(true)}>
              Claim
            </Button>
          </Box>
        </Container>
      </Box>
      {creatingClaim ? (
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            px: 3,
            pb: 4,
          }}
        >
          <PostEdit humanData={humanData}
post={post}
isClaim={true}></PostEdit>
        </Box>
      ) : null}
    </>
  );
};

PostClaim.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default PostClaim;
