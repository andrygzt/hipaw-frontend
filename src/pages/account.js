import Head from "next/head";
import { Box, Container, Grid, Typography } from "@mui/material";
import { AccountProfile } from "../components/pet/account-profile";
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
        <Typography sx={{ mb: 3 }} variant="h3">
          Register a Pet
        </Typography>
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            {true ? <AccountProfile /> : null}
            {/*create a function that turns true to false when pet information is not saved*/}
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <AccountPetProfileDetails />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Account.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Account;
