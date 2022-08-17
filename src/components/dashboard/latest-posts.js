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

const posts = [
  {
    category: null,
    claims: [
      {
        category: "food",
        claims: [],
        description: "3 cans of food",
        human_id: 4,
        id: 5,
        image: "posts/images/5.jpg",
        is_claim: true,
        pet: {
          age: 20,
          detail: "Animal reacts to separation anxiety, low energy",
          id: 2,
          name: "Lobo",
          photo: "pets/images/2.jpg",
          size: null,
          type: "Dog",
        },
        pet_id: 2,
        reference_post_id: 3,
        status: "Claimed",
        title: "fish dried food",
      },
      {
        category: "food",
        claims: [],
        description: "3 cans of food",
        human_id: 4,
        id: 5,
        image: "posts/images/5.jpg",
        is_claim: true,
        pet: {
          age: "6 years",
          detail: "Animal reacts to separation anxiety, low energy",
          id: 2,
          name: "Tullu",
          photo: "pets/images/2.jpg",
          size: null,
          type: "Dog",
        },
        pet_id: 2,
        reference_post_id: 3,
        status: "Active",
        title: "fish dried food",
      },
    ],
    description: "900gr boneless fish treats",
    human_id: 2,
    id: 3,
    image: "posts/images/3.jpg",
    is_claim: false,
    pet: {
      age: "8 years",
      detail: "Animal reacts to separation anxiety, low energy",
      id: 2,
      name: "Lobo",
      photo: "pets/images/2.jpg",
      size: null,
      type: "Dog",
    },
    pet_id: 2,
    reference_post_id: null,
    status: "Claimed",
    title: "Chicken treats",
  },
  {
    category: null,
    claims: [
      {
        category: "food",
        claims: [],
        description: "3 cans of food",
        human_id: 4,
        id: 5,
        image: "posts/images/5.jpg",
        is_claim: true,
        pet: {
          age: null,
          detail: "Animal reacts to separation anxiety, low energy",
          id: 2,
          name: "Tullu",
          photo: "pets/images/2.jpg",
          size: null,
          type: "Dog",
        },
        pet_id: 2,
        reference_post_id: 3,
        status: "claimed",
        title: "fish dried food",
      },
    ],
    description: "9 pack tennis balls",
    human_id: 2,
    id: 3,
    image: "posts/images/3.jpg",
    is_claim: false,
    pet: {
      age: "6 years",
      detail: "Animal reacts to separation anxiety, low energy",
      id: 2,
      name: "Tullu",
      photo: "pets/images/2.jpg",
      size: null,
      type: "Tulu",
    },
    pet_id: 2,
    reference_post_id: null,
    status: "Closed",
    title: "Chicken treats",
  },
  {
    category: null,
    claims: [],
    description: "9 pack tennis balls",
    human_id: 2,
    id: 3,
    image: "posts/images/3.jpg",
    is_claim: false,
    pet: {
      age: "6 years",
      detail: "Animal reacts to separation anxiety, low energy",
      id: 2,
      name: "Tullu",
      photo: "pets/images/2.jpg",
      size: null,
      type: "Tulu",
    },
    pet_id: 2,
    reference_post_id: null,
    status: "Closed",
    title: "Chicken treats",
  },
];

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

export const LatestPosts = (props) => (
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
              <TableRow hover key={obj.post.id + "-" + obj.claim.id}>
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
);
