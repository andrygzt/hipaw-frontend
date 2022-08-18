import Head from "next/head";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import axios from "axios";
import * as Yup from "yup";

import { postStatus, postType } from "../../../components/post/post-menu";
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
import { PostCard } from "../../../components/post/one-post";
import { DashboardLayout } from "../../../components/dashboard-layout";
import { PostEdit } from "src/components/post/edit-post";
import { backend_url } from "src/env";
import { UserAuth } from "src/context/AuthContext";

const PostEditPage = () => {
  const { user, human } = UserAuth();
  const router = useRouter();
  const { post_id } = router.query;

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
                <PostEdit 
                    humanData={humanData}
                    post={post}
                >
                </PostEdit>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

PostEditPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default PostEditPage;
