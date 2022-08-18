import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { SeverityPill } from "../severity-pill";
import { backend_url } from "src/env";
import { CheckCircle } from "@mui/icons-material";
import axios from "axios";

export const LatestPosts = ({human, posts, afterAccepted, ...props}) => {
  const querylist = [];
  for (let post of posts) {
    if (post.is_claim){
      let obj = { post: post.reference_post, claim: post };
        querylist.push(obj);
    }
    else{
      if (post.claims.length === 0) {
        let obj = { post: post, claim: {} };
        querylist.push(obj);
      }
      for (let claim of post.claims) {
        let obj = { post: post, claim: claim };
        querylist.push(obj);
      }
    }
  }

  console.log(human,querylist);

  const accceptClaim = (claim) => {
    console.log('accepted claim', claim);
    axios
      .patch(`${backend_url}/posts/${claim.id}/accept`)
      .then((response) => {
        afterAccepted();
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  };

  return (
  <Card {...props}>
    <CardHeader title="Claims Status" />
    <PerfectScrollbar>
      <Box sx={{ minWidth: 1000 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Post</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Claim</TableCell>
              <TableCell>Pet candidate </TableCell>
              <TableCell>Pet Age</TableCell>
              <TableCell>Claim description</TableCell>
              <TableCell>Claim Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {querylist.map((obj) => (
              <TableRow hover
key={obj.post.id + "-" + obj.claim.id}>
                <TableCell>{obj.post.title}</TableCell>
                <TableCell>
                  <SeverityPill
                    color={
                      (obj.post.status === "Active" && "info") ||
                      (obj.post.status === "Claimed" && "success") ||
                      (obj.post.status === "Rejected" && "error") ||
                      (obj.post.status === "Accepted" && "success") ||
                      "info"
                    }
                  >
                    {obj.post.status}
                  </SeverityPill>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex'
                    }}
                  >
                    {obj.claim.id? (<Avatar
                      src={`${backend_url}/posts/images/${obj.claim.id}.jpg`}
                      sx={{ mr: 2 }}
                      variant="square"
                    >
                      {obj.claim?.title}
                    </Avatar>): null}
                    <Typography
                      color="textPrimary"
                      variant="body1"
                    >
                      {obj.claim?.title}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{obj.claim?.pet?.name}</TableCell>
                <TableCell>{obj.claim?.pet?.age}</TableCell>
                <TableCell>{obj.claim.description}</TableCell>
                <TableCell>
                  <SeverityPill
                    color={
                      (obj.claim.status === "Active" && "info") ||
                      (obj.claim.status === "Accepted" && "success") ||
                      (obj.claim.status === "Rejected" && "error") ||
                      "info"
                    }
                  >
                    {obj.claim.status}
                  </SeverityPill>
                </TableCell>
                <TableCell>
                  { obj.claim.status === "Active" && obj.claim.human_id !== human.id? 
                  (<Button
                    color="primary"
                    startIcon={<CheckCircle fontSize="small" />}
                    size="small"
                    variant="text"
                    onClick={() => accceptClaim(obj.claim)}
                  >
                    Accept
                  </Button>): null}
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
    >
      <Button
        color="primary"
        endIcon={<ArrowRightIcon fontSize="small" />}
        size="small"
        variant="text"
        href="/posts"
      >
        View all posts
      </Button>
    </Box>
  </Card>
)
};
