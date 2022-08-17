import Head from "next/head";
import { useState, useEffect } from "react";
import { UserAuth } from "../../context/AuthContext";
import axios from "axios";

import { Box } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import { PostEdit } from "src/components/post/edit-post";
import { backend_url } from "src/env";

const PostClaim = () => {
  const { human } = UserAuth();

  const [humanData, setHumanData] = useState({ pets: [] });
  useEffect(() => {
    getHumanData();
  }, []);

  const getHumanData = () => {
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
        <title>Create a Post</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          px: 3,
          pb: 4,
          pt: 2,
        }}
      >
        <PostEdit humanData={humanData}></PostEdit>
      </Box>
    </>
  );
};

PostClaim.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default PostClaim;
