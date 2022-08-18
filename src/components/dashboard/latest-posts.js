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
  TableSortLabel,
  Tooltip,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { SeverityPill } from "../severity-pill";

export const LatestPosts = ({posts, ...props}) => {
  const querylist = [];
  for (let post of posts) {
    if (post.claims.length === 0) {
      let obj = { post: post, claim: {} };
      querylist.push(obj);
    }
    for (let claim of post.claims) {
      let obj = { post: post, claim: claim };
      querylist.push(obj);
    }
  }

  return (
  <Card {...props}>
    <CardHeader title="Claims Received" />
    <PerfectScrollbar>
      <Box sx={{ minWidth: 1000 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Post reference</TableCell>
              <TableCell>Post Status</TableCell>
              <TableCell>Pet candidate </TableCell>
              <TableCell>Pet Age</TableCell>
              <TableCell>Claimed description</TableCell>
              <TableCell>Claim Status</TableCell>
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
                      (obj.post.status === "Active" && "success") ||
                      (obj.post.status === "Closed" && "error") ||
                      "warning"
                    }
                  >
                    {obj.post.status}
                  </SeverityPill>
                </TableCell>
                <TableCell>{obj.claim?.pet?.name}</TableCell>
                <TableCell>{obj.claim?.pet?.age}</TableCell>
                <TableCell>{obj.claim.description}</TableCell>
                <TableCell>
                  <SeverityPill
                    color={
                      (obj.claim.status === "Active" && "success") ||
                      (obj.claim.status === "Closed" && "error") ||
                      "warning"
                    }
                  >
                    {obj.claim.status}
                  </SeverityPill>
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
