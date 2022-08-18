import { useState } from "react";
import {
  Box,
  Button,
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import axios from "axios";
import { backend_url } from "src/env";
import { UserAuth } from "src/context/AuthContext";
import { useRouter } from "next/router";

const petType = [
  {
    value: "Select",
    label: "",
  },
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
  const [imageInfo, setimageInfo] = useState({});
  const router = useRouter();
  let avatarSrc = imageInfo.base64;
  const [values, setValues] = useState({});
  const submitNewPet = () => {
    console.log("pet values", values);
    axios
      .post(`${backend_url}/humans/${human.id}/pet`, values)
      .then((response) => {
        uploadImage(response.data.id);
        console.log("response", response);
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  };

  const uploadImage = async (pet_id) => {
    console.log("imageInfo.bytes", imageInfo.bytes);
    if (imageInfo.bytes) {
      const formData = new FormData();
      formData.append("photo", imageInfo.bytes);
      try {
        const response = await axios({
          method: "patch",
          url: `${backend_url}/pets/${pet_id}/photo`,
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });
        router.push(`/posts`);
      } catch (error) {
        console.log(error);
      }
    } else {
      router.push(`/posts`);
    }
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
                value={values.type}
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
            <Grid item md={12} xs={12}>
              <Button variant="contained" component="label">
                Upload Photo
                <input
                  name="image"
                  accept="image/jpg"
                  id="contained-button-file"
                  type="file"
                  hidden
                  onChange={(e) => {
                    const fileReader = new FileReader();
                    fileReader.onload = () => {
                      if (fileReader.readyState === 2) {
                        console.log(fileReader);
                        setimageInfo({ bytes: e.target.files[0], base64: fileReader.result });
                      }
                    };
                    fileReader.readAsDataURL(e.target.files[0]);
                    console.log(e.target.files[0]);
                  }}
                />
              </Button>
            </Grid>
            <Grid item md={12} xs={12}>
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
            </Grid>
          </Grid>
        </CardContent>
        <Grid item md={12} xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              pb: 6,
            }}
          >
            <Button color="primary" variant="contained" onClick={submitNewPet}>
              Save details
            </Button>
          </Box>
        </Grid>
      </Card>
    </form>
  );
};
