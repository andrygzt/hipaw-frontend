import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { LatestPosts } from "../components/dashboard/latest-posts";
import { UserPosts } from "../components/dashboard/my-posts";
import { DashboardLayout } from "../components/dashboard-layout";

const Dashboard = () => (
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
        <Grid container spacing={1}>
          <Grid item lg={20} md={16} xl={22} xs={12}>
            <LatestPosts />
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
        <Grid container spacing={1}>
          <Grid item lg={20} md={16} xl={22} xs={12}>
            <UserPosts />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;
