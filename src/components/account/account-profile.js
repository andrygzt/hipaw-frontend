import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";

const pet = {
  photo: "post.pet.photo",
  age: "7 years",
  type: "Dog",
  jobTitle: "Senior Developer",
  name: "Lobo",
  detail: "Loves tennis balls",
};

export const AccountProfile = (props) => (
  <Card {...props}>
    <CardContent>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Avatar
          src={pet.photo}
          sx={{
            height: 150,
            mb: 2,
            width: 150,
          }}
        />
        <Typography color="textPrimary" gutterBottom variant="h4">
          {pet.name}
        </Typography>
        <Typography color="textSecondary" variant="body2" variant="h6">
          {`${pet.type}, ${pet.age}`}
        </Typography>
        <Typography color="textSecondary" variant="body2" variant="h6">
          {pet.detail}
        </Typography>
      </Box>
    </CardContent>
    <Divider />
    <CardActions>
      <Button color="primary" fullWidth variant="text">
        Upload pet picture
      </Button>
    </CardActions>
  </Card>
);
