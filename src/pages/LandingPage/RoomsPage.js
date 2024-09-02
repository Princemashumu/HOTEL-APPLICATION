import React, { useState, useRef } from "react";
import {
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import RoomDetailsDialog from "./RoomDetailsDialog";

function RoomsPage() {
  const rooms = [
    {
      id: 1,
      name: "Suite",
      image: "https://via.placeholder.com/300",
      rating: 4,
      status: "Available",
      reviewsCount: 12,
      price: 1500,
      amenities: ["wifi", "ac", "tv", "pool", "restaurant"],
    },
    {
      id: 2,
      name: "Deluxe Room",
      image: "https://via.placeholder.com/300",
      rating: 5,
      status: "Great",
      reviewsCount: 8,
      price: 2000,
      amenities: ["wifi", "ac", "tv", "restaurant", "parking"],
    },
    {
      id: 3,
      name: "Standard Room",
      image: "https://via.placeholder.com/300",
      rating: 3,
      status: "Good",
      reviewsCount: 20,
      price: 1000,
      amenities: ["wifi", "ac", "tv"],
    },
    {
      id: 4,
      name: "Executive Suite",
      image: "https://via.placeholder.com/300",
      rating: 5,
      status: "Available",
      reviewsCount: 15,
      price: 2500,
      amenities: ["wifi", "ac", "tv", "pool", "restaurant", "gym"],
    },
    {
      id: 5,
      name: "Presidential Suite",
      image: "https://via.placeholder.com/300",
      rating: 5,
      status: "Luxury",
      reviewsCount: 5,
      price: 5000,
      amenities: ["wifi", "ac", "tv", "pool", "restaurant", "parking", "gym"],
    },
    {
      id: 6,
      name: "Junior Suite",
      image: "https://via.placeholder.com/300",
      rating: 4,
      status: "Available",
      reviewsCount: 10,
      price: 1800,
      amenities: ["wifi", "ac", "tv", "restaurant"],
    },
    {
      id: 7,
      name: "Family Room",
      image: "https://via.placeholder.com/300",
      rating: 4,
      status: "Available",
      reviewsCount: 8,
      price: 2200,
      amenities: ["wifi", "ac", "tv", "pool"],
    },
    {
      id: 8,
      name: "Double Room",
      image: "https://via.placeholder.com/300",
      rating: 3,
      status: "Good",
      reviewsCount: 25,
      price: 900,
      amenities: ["wifi", "ac", "tv"],
    },
    {
      id: 9,
      name: "Single Room",
      image: "https://via.placeholder.com/300",
      rating: 2,
      status: "Available",
      reviewsCount: 30,
      price: 700,
      amenities: ["wifi", "ac"],
    },
    {
      id: 10,
      name: "Luxury Suite",
      image: "https://via.placeholder.com/300",
      rating: 5,
      status: "Luxury",
      reviewsCount: 12,
      price: 3500,
      amenities: ["wifi", "ac", "tv", "pool", "restaurant", "gym"],
    },
    {
      id: 11,
      name: "Studio Room",
      image: "https://via.placeholder.com/300",
      rating: 3,
      status: "Good",
      reviewsCount: 18,
      price: 1300,
      amenities: ["wifi", "ac", "tv"],
    },
    {
      id: 12,
      name: "Penthouse Suite",
      image: "https://via.placeholder.com/300",
      rating: 5,
      status: "Luxury",
      reviewsCount: 7,
      price: 6000,
      amenities: ["wifi", "ac", "tv", "pool", "restaurant", "parking", "gym"],
    },
  ];
  

  const [startIndex, setStartIndex] = useState(0);
  const [favorites, setFavorites] = useState(new Set());
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const visibleCount = 3;
  const containerRef = useRef(null);

  const scrollRight = () => {
    if (startIndex + visibleCount < rooms.length) {
      setStartIndex(startIndex + 1);
      containerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const scrollLeft = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
      containerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const getRatingStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, index) =>
        index < rating ? (
          <StarIcon key={index} sx={{ color: "gold" }} />
        ) : (
          <StarBorderIcon key={index} sx={{ color: "gold" }} />
        )
      );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Available":
        return "green";
      case "Great":
        return "blue";
      case "Good":
        return "orange";
      case "Not Available":
        return "red";
      case "Renovating":
        return "gray";
      default:
        return "black";
    }
  };

  const visibleRooms = rooms.slice(startIndex, startIndex + visibleCount);

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRoom(null);
  };

  return (
    <Container
      sx={{
        backgroundColor: "beige",
        borderRadius: "25px",
        height: "550px",
        position: "relative",
        overflow: "hidden",
        padding: 2,
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        textAlign="center"
        sx={{
          marginBottom: "20px",
          fontWeight: "bold",
        }}
      >
        Rooms & Suites
      </Typography>
      <Divider
        sx={{
          marginBottom: "20px",
          borderColor: "gray",
        }}
      />

      <IconButton
        aria-label="Scroll Left"
        sx={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          zIndex: 1,
          backgroundColor: "white",
          borderRadius: "50%",
          "&:hover": { backgroundColor: "lightgray" },
        }}
        onClick={scrollLeft}
        disabled={startIndex === 0}
      >
        <ArrowBackIcon />
      </IconButton>
      <IconButton
        aria-label="Scroll Right"
        sx={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          zIndex: 1,
          backgroundColor: "white",
          borderRadius: "50%",
          "&:hover": { backgroundColor: "lightgray" },
        }}
        onClick={scrollRight}
        disabled={startIndex + visibleCount >= rooms.length}
      >
        <ArrowForwardIcon />
      </IconButton>

      <Box
        ref={containerRef}
        sx={{
          display: "flex",
          overflowX: "auto",
          height: "390px",
          padding: "0 10px",
          scrollBehavior: "smooth",
          scrollbarWidth: "thin",
          scrollbarColor: "#888 #e0e0e0",
          "&::-webkit-scrollbar": {
            height: "1px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#e0e0e0",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#888",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
        }}
      >
        {visibleRooms.map((room) => (
          <Box
            key={room.id}
            sx={{
              flex: "1 0 auto",
              margin: "0 15px",
              display: "flex",
              alignItems: "stretch",
              position: "relative",
            }}
          >
            <Card
              sx={{
                width: 350,
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.3s ease-in-out", // Smooth transition for the transformation
                "&:hover": {
                  transform: "scale(1.02)", // Slightly scale up the card on hover
                  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", // Optional: Add a shadow for more depth
                },
                "&:active": {
                  transform: "scale(0.98)", // Slightly scale down the card when clicked
                },
              }}
              onClick={() => handleRoomClick(room)}
            >
              <Box sx={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  height="250" // Increased image height
                  image={room.image}
                  alt={room.name}
                  sx={{ width: "100%" }} // Ensures full width of CardMedia
                />
                <Tooltip
                  title={
                    favorites.has(room.id)
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
                >
                  <IconButton
                    aria-label="Add to favorites"
                    onClick={() => toggleFavorite(room.id)}
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      zIndex: 1,
                      color: "red",
                    }}
                  >
                    {favorites.has(room.id) ? (
                      <FavoriteIcon />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </IconButton>
                </Tooltip>
              </Box>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <Typography variant="h6" component="div">
                  {room.name}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginY: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flex: 1,
                    }}
                  >
                    {getRatingStars(room.rating)}
                    {/* <Typography variant="caption" sx={{ marginLeft: 1 }}>
                      {room.reviewsCount} reviews
                    </Typography> */}
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: getStatusColor(room.status),
                      textAlign: "right",
                    }}
                  >
                    {room.status}
                  </Typography>
                </Box>
                <Typography variant="h6" component="div">
                  R{room.price} per night
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
      <RoomDetailsDialog
        open={openDialog}
        onClose={handleCloseDialog}
        room={selectedRoom}
      />
    </Container>
  );
}

export default RoomsPage;
