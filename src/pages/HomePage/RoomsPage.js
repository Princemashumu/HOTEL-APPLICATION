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
      reviewsCount: 20,
      price: 2000,
      amenities: ["wifi", "ac", "tv", "gym", "restaurant"],
    },
    {
      id: 3,
      name: "Standard Room",
      image: "https://via.placeholder.com/300",
      rating: 3,
      status: "Good",
      reviewsCount: 8,
      price: 1000,
      amenities: ["wifi", "tv", "restaurant"],
    },
    {
      id: 4,
      name: "Presidential Suite",
      image: "https://via.placeholder.com/300",
      rating: 5,
      status: "Available",
      reviewsCount: 15,
      price: 5000,
      amenities: ["wifi", "ac", "tv", "pool", "spa", "restaurant"],
    },
    {
      id: 5,
      name: "Single Room",
      image: "https://via.placeholder.com/300",
      rating: 2,
      status: "Not Available",
      reviewsCount: 5,
      price: 500,
      amenities: ["wifi", "tv"],
    },
    {
      id: 6,
      name: "Family Suite",
      image: "https://via.placeholder.com/300",
      rating: 4,
      status: "Great",
      reviewsCount: 10,
      price: 3000,
      amenities: ["wifi", "ac", "tv", "pool", "kids play area", "restaurant"],
    },
    {
      id: 7,
      name: "Penthouse Suite",
      image: "https://via.placeholder.com/300",
      rating: 5,
      status: "Available",
      reviewsCount: 18,
      price: 4000,
      amenities: ["wifi", "ac", "tv", "private pool", "gym", "spa", "restaurant"],
    },
    {
      id: 8,
      name: "Economy Room",
      image: "https://via.placeholder.com/300",
      rating: 3,
      status: "Renovating",
      reviewsCount: 7,
      price: 750,
      amenities: ["wifi", "tv"],
    },
    {
      id: 9,
      name: "Executive Room",
      image: "https://via.placeholder.com/300",
      rating: 4,
      status: "Good",
      reviewsCount: 14,
      price: 2500,
      amenities: ["wifi", "ac", "tv", "restaurant"],
    },
    {
      id: 10,
      name: "Luxury Suite",
      image: "https://via.placeholder.com/300",
      rating: 5,
      status: "Available",
      reviewsCount: 25,
      price: 3500,
      amenities: ["wifi", "ac", "tv", "pool", "gym", "spa", "restaurant"],
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
        borderRadius: "25px",
        position: "relative",
        overflow: "hidden",
        padding: 2,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.2)",
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
          color: "#333",
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
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
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
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
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
          height: "430px",
          padding: "0 10px",
          scrollBehavior: "smooth",
          scrollbarWidth: "none",
          // scrollbarColor: "#888 #e0e0e0",
          "&::-webkit-scrollbar": {
            height: "8px",
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
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.15)",
                },
                "&:active": {
                  transform: "scale(0.98)",
                },
                borderRadius: "15px",
              }}
              onClick={() => handleRoomClick(room)}
            >
              <Box sx={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  height="250"
                  image={room.image}
                  alt={room.name}
                  sx={{
                    width: "100%",
                    borderTopLeftRadius: "15px",
                    borderTopRightRadius: "15px",
                  }}
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
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(room.id);
                    }}
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      zIndex: 1,
                      color: favorites.has(room.id) ? "red" : "white",
                      backgroundColor: favorites.has(room.id)
                        ? "rgba(255,255,255,0.8)"
                        : "rgba(0,0,0,0.6)",
                      "&:hover": {
                        backgroundColor: favorites.has(room.id)
                          ? "rgba(255, 0, 0, 0.8)"
                          : "rgba(0, 0, 0, 0.8)",
                      },
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
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <Typography variant="h6" component="div" sx={{ fontWeight: "bold", color: "#444" }}>
                  {room.name}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginY: 1,
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {getRatingStars(room.rating)}
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: getStatusColor(room.status),
                      fontWeight: "bold",
                      padding: "2px 8px",
                      borderRadius: "12px",
                      border: `1px solid ${getStatusColor(room.status)}`,
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    {room.status}
                  </Typography>
                </Box>
                <Typography variant="subtitle1" color="textSecondary">
                  {room.reviewsCount} reviews
                </Typography>
                <Divider sx={{ marginY: 1 }} />
                <Typography
                  variant="h6"
                  color="primary"
                  sx={{ fontWeight: "bold" }}
                >
                  R{room.price} per night
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      {selectedRoom && (
        <RoomDetailsDialog
          room={selectedRoom}
          open={openDialog}
          onClose={handleCloseDialog}
        />
      )}
    </Container>
  );
}

export default RoomsPage;
