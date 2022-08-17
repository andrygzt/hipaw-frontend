import PropTypes from "prop-types";
import { Avatar, Box, Button, Card, CardContent, Divider, Grid, Typography } from "@mui/material";

export const PostCard = ({ post, ...rest }) => (
  // Need on Click action to send to one post page
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
        <Avatar alt="Post" src={post.image} variant="square" />
      </Box>
      <Typography align="center" color="textPrimary" gutterBottom variant="h5">
        {post.title}
      </Typography>
      <Typography align="center" color="textPrimary" gutterBottom variant="body1">
        {post.description}
      </Typography>
      <Typography align="center" color="textPrimary" gutterBottom variant="h6">
        {post.category}
      </Typography>
      <Typography align="center" color="textPrimary" gutterBottom variant="h5">
        {post.status}
      </Typography>
      <Typography align="center" color="textPrimary" gutterBottom variant="body1">
        {post.pet.name}
      </Typography>
      <Typography align="center" color="textPrimary" gutterBottom variant="body1">
        {post.pet.type}
      </Typography>
      <Typography align="center" color="textPrimary" gutterBottom variant="body1">
        {post.pet.age}
      </Typography>
      <Typography align="center" color="textPrimary" variant="body1">
        {post.pet.detail}
      </Typography>
    </CardContent>
    <Box sx={{ flexGrow: 1 }} />
    <Divider />
  </Card>
);

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
};
