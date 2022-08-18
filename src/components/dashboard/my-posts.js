import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { SeverityPill } from "../severity-pill";
import { useRouter } from "next/router";
import axios from "axios";
import { backend_url } from "src/env";

export const UserPosts = ({ posts, afterDelete, ...props }) => {
  const router = useRouter();
  console.log(posts);
  const deletePost = (post_id) => {
    axios
      .delete(`${backend_url}/posts/${post_id}`)
      .then((response) => {
        console.log(response.data);
        afterDelete();
      })
      .catch((error) => {
        console.log("ERROR");
      });
  };
  return (
    <Card {...props}>
      <CardHeader title="My Posts and Claims" />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1000 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Claim?</TableCell>
                <TableCell>Pet</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Update</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts.map((post) => (
                <TableRow hover
                  key={post.id}>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      {post.id? (<Avatar
                        src={`${backend_url}/posts/images/${post.id}.jpg`}
                        sx={{ mr: 2 }}
                        variant="square"
                      >
                        {post.title}
                      </Avatar>): null}
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {post.title}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={post.is_claim}
                      value={post.is_claim}
                      disabled
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      {post.pet?.id? (<Avatar
                        src={`${backend_url}/pets/photo/${post.pet?.id}.jpg`}
                        sx={{ mr: 2 }}
                        variant="square"
                      >
                        {post.title}
                      </Avatar>): null}
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {post.pet?.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <SeverityPill
                      color={
                        (post.status === "Active" && "info") ||
                        (post.status === "Claimed" && "success") ||
                        "info"
                      }
                    >
                      {post.status}
                    </SeverityPill>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => router.push(`post/${post.id}`)}> Edit </Button>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => deletePost(post.id)}> Delete </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      ></Box>
    </Card>
  );
};
