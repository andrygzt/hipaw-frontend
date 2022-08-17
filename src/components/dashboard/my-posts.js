import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { SeverityPill } from "../severity-pill";
import { useRouter } from "next/router";
import axios from "axios";
import { backend_url } from "src/env";

export const UserPosts = ({ posts, afterDelete, ...props }) => {
  const router = useRouter();
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
      <CardHeader title="My Post Status" />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1000 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Post Title</TableCell>
                <TableCell>Post Status</TableCell>
                <TableCell>Update</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts.map((post) => (
                <TableRow hover key={post.id}>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>
                    <SeverityPill
                      color={
                        (post.status === "Active" && "success") ||
                        (post.status === "Closed" && "error") ||
                        "warning"
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
