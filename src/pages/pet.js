import Head from "next/head";
import { Box, Container, Grid, Typography } from "@mui/material";
import { AccountPetProfileDetails } from "../components/pet/account-profile-details";
import { DashboardLayout } from "../components/dashboard-layout";

const Account = () => (
  <>
    <Head>
      <title>Register a Pet Section</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item lg={12} md={6} xs={12}>
            <AccountPetProfileDetails />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Account.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Account;
