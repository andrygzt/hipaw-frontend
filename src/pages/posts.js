import Head from "next/head";
import React, { useState, useEffect } from "react";
import { Box, Container, Grid, Pagination } from "@mui/material";
import { PostListToolbar } from "../components/product/post-list-toolbar";
import { PostCard } from "../components/product/post-card";
import { DashboardLayout } from "../components/dashboard-layout";
import axios from "axios";

const Products = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPostsFromAPI();
  }, []);

  const getPostsFromAPI = () => {
    axios
      .get(`http://127.0.0.1:5000/posts`)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.log("ERROR");
      });
  };

  return (
    <>
      <Head>
        <title>All Posts </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <PostListToolbar />
          <Box sx={{ pt: 3 }}>
            <Grid container spacing={3}>
              {posts.map((post) => (
                <Grid item key={post.id} lg={4} md={6} xs={12}>
                  <PostCard post={post} />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              pt: 3,
            }}
          >
            <Pagination color="primary" count={3} size="small" />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Products.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Products;
