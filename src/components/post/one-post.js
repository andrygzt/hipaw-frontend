import PropTypes from "prop-types";
import { Avatar, Box, Button, Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import { backend_url } from "src/env";
import { useRouter } from "next/router";

export const PostCard = ({ post, ...rest }) => {
  const router = useRouter();
  const avatarSrc = post.id ? `${backend_url}/posts/images/${post.id}.jpg` : null;
  console.log('post in one-post', post);
  return (
  <Card
    sx={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
    }}
    {...rest}
  >
    <CardContent>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          pb: 6,
        }}
      >
        <Avatar
          alt="Post"
          src={avatarSrc}
          variant="square"
          sx={{
            height: 300,
            mb: 2,
            width: 300,
          }}
        />
      </Box>
      <Typography align="center"
        color="textPrimary"
        gutterBottom
        variant="h5">
        {post?.title}
      </Typography>
      <Typography align="center"
        color="textPrimary"
        gutterBottom
        variant="body1">
        {post?.description}
      </Typography>
      <Typography align="center"
        color="textPrimary"
        gutterBottom
        variant="h6">
        {post?.category}
      </Typography>
      <Typography align="center"
        color="textPrimary"
        gutterBottom
        variant="h5">
        {post?.status}
      </Typography>
      <Typography align="center"
        color="textPrimary"
        gutterBottom
        variant="body1">
        {post?.pet?.name}
      </Typography>
      <Typography align="center"
        color="textPrimary"
        gutterBottom
        variant="body1">
        {post?.pet?.type}
      </Typography>
      <Typography align="center"
        color="textPrimary"
        gutterBottom
        variant="body1">
        {post?.pet?.age}
      </Typography>
      <Typography align="center"
        color="textPrimary"
        variant="body1">
        {post?.pet?.detail}
      </Typography>
    </CardContent>
    <Box sx={{ flexGrow: 1 }} />
    <Divider />
      <Box sx={{ p: 2 }}>
        <Grid container
          spacing={1}
          sx={{ justifyContent: "space-between" }}>
          <Grid
            item
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <Typography color="textSecondary"
              display="inline"
              sx={{ pl: 1 }}
              variant="body2">
              <Button onClick={() => router.push(`/post/edit/${post.id}`)}>Edit</Button>
            </Typography>
          </Grid>
        </Grid>
      </Box>
  </Card>
)
};

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
};
