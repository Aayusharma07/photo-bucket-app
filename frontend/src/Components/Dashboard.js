import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardMedia,
  Box,
} from "@material-ui/core";
import axios from "axios";

const Dashboard = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [category, setCategory] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSearchCategoryChange = (event) => {
    setSearchCategory(event.target.value);
  };

  const handleUpload = async () => {
    if (!selectedFile || !category) {
      alert("Please select a file and enter a category.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8000/api/v1/images/upload",
        {
          file: selectedFile,
          category: category,
        },
        {
          headers: {
            Authorization: `token ${localStorage.token}`,
            "Content-Type": "multipart/form-data"
          },
        }
      );
      alert("Image uploaded successfully!");
      fetchImages();
    } catch (error) {
      console.error("Failed to upload image", error);
    }
  };

  const fetchImages = async () => {
    try {
      await axios({
        url: "http://localhost:8000/api/v1/images/all",
        method: "GET",
        headers: {
          Authorization: `token ${localStorage.token}`,
        },
      }).then(
        (response) => {
          console.log("api data is ", response.data.data);
          setImages(response.data.data);
        },
        (error) => {
          console.log("error is ", error);
        }
      );
    } catch (error) {
      console.error("Failed to fetch images", error);
    }
  };

  const filteredImages = images.filter((image) =>
    image.category.toLowerCase().includes(searchCategory.toLowerCase())
  );

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        Image Upload
      </Typography>
      <Box sx={{ mt: 4, mb: 6 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Category"
              value={category}
              onChange={handleCategoryChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button variant="contained" component="label">
              Select Image
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileChange}
              />
            </Button>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleUpload}
            >
              Upload
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Typography variant="h5" align="center" gutterBottom>
        Image Gallery
      </Typography>
      <TextField
        fullWidth
        label="Search by Category"
        value={searchCategory}
        onChange={handleSearchCategoryChange}
        sx={{ mb: 4 }}
      />
      <Grid container spacing={3}>
        {filteredImages.map((image) => (
          <Grid item xs={12} sm={6} md={4} key={image.id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height={200}
                image={image.filepath}
                alt={`Image - ${image.category}`}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
