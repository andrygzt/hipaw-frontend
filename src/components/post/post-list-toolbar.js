import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";

export const PostListToolbar = (props) => {
  const router = useRouter();
  const goToCreateNewPost = () => {
    router.push("/post/create");
  };

  return (
    <Box {...props}>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }}
variant="h3">
          All Posts
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button color="primary"
variant="contained"
onClick={goToCreateNewPost}>
            Create a New Post
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
