import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { LatestPosts } from "../components/dashboard/latest-posts";
import { UserPosts } from "../components/dashboard/my-posts";
import { DashboardLayout } from "../components/dashboard-layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { backend_url } from "src/env";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPostsFromAPI();
  }, []);

  const getPostsFromAPI = () => {
    axios
      .get(`${backend_url}/posts`)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.log("ERROR");
      });
  };

  const afterDelete = () => {
    getPostsFromAPI();
  };

  return (
    <>
      <Head>
        <title>Posts Status</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={true}>
          <Grid container
spacing={1}>
            <Grid item
lg={20}
md={16}
xl={22}
xs={12}>
              <LatestPosts posts={posts} />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={true}>
          <Grid container
spacing={1}>
            <Grid item
lg={20}
md={16}
xl={22}
xs={12}>
              <UserPosts posts={posts}
afterDelete={afterDelete} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;
