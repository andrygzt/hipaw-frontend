import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import axios from "axios";
import { UserAuth } from "../context/AuthContext";
import { backend_url } from "src/env";


const petType = [
  {
    value: "Dog",
    label: "Dog",
  },
  {
    value: "Cat",
    label: "Cat",
  },
  {
    value: "Rabbit",
    label: "Rabbit",
  },
  {
    value: "Fish",
    label: "Fish",
  },
  {
    value: "Bird",
    label: "Bird",
  },
  {
    value: "Reptile",
    label: "Reptile",
  },
  {
    value: "Spider",
    label: "Spider",
  },
];

export const AccountPetProfileDetails = (props) => {
  const { human } = UserAuth();
  const [values, setValues] = useState({});
  const human = { id: 1 };
  const submitNewPet = () => {
    console.log("pet values", values);
    axios
      .post(`${backend_url}/humans/${human.id}/pet`, values)
      .then((response) => {
        console.log("response", response);
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form autoComplete="off">
      <Card>
        <CardHeader subheader="The information can be edited" title="Pet Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify pet name"
                label="Name"
                name="name"
                onChange={handleChange}
                required
                value={values.name}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Age"
                name="age"
                onChange={handleChange}
                required
                value={values.age}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Size"
                name="size"
                onChange={handleChange}
                required
                value={values.size}
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Pet type"
                name="type"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.petType}
                variant="outlined"
              >
                {petType.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                multiline
                rows={8}
                fullWidth
                label="Details"
                name="detail"
                onChange={handleChange}
                required
                value={values.detail}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button color="primary" variant="contained" onClick={submitNewPet}>
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};
