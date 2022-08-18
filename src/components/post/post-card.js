import PropTypes from "prop-types";
import { Avatar, Box, Button, Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { backend_url } from "src/env";
import { SeverityPill } from "../severity-pill";

export const PostCard = ({ post, human, ...rest }) => {
  const router = useRouter();
  if (!post) {
    return null;
  }
  const isMine = post.human_id === human.id;
  const isClaimed = post.status === "Claimed";
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
            src={`${backend_url}/posts/images/${post.id}.jpg`}
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
          {post.title}
        </Typography>
        <Typography align="center"
          color="textPrimary"
          gutterBottom
          variant="body1">
          {post.description}
        </Typography>
        <Typography align="center"
        color="textPrimary"
        gutterBottom
        variant="h5">
          <SeverityPill
            color={
              (post?.status === "Active" && "info") ||
              (post?.status === "Claimed" && "success") ||
              "info"
            }
          >
            {post?.status}
          </SeverityPill>
      </Typography>
        <Typography align="center"
          color="textPrimary"
          gutterBottom
          variant="body1">
          {post.pet.type}
        </Typography>
        <Typography align="center"
          color="textPrimary"
          gutterBottom
          variant="body1">
          {post.pet.name}
        </Typography>
        <Typography align="center"
          color="textPrimary"
          variant="body1">
          {post.pet.detail}
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
              <Button onClick={() => router.push(`/post/${post.id}`)}>See more</Button>
            </Typography>
          </Grid>
          { !isMine && !isClaimed? (<Grid
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
              <Button onClick={() => router.push(`/post/${post.id}`)}>Claim</Button>
            </Typography>
          </Grid>) : null}
        </Grid>
      </Box>
    </Card>
  );
};

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
};
