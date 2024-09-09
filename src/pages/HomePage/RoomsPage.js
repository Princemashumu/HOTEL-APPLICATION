import React, { useState, useEffect, useRef } from "react";
import { getDocs, collection, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig"; // Ensure the correct path to your Firebase config
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
  TextField,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import RoomDetailsDialog from "./RoomDetailsDialog"; // Make sure this path is correct

function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [favorites, setFavorites] = useState(new Set());
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [ratings, setRatings] = useState({}); // State to store ratings
  const visibleCount = 3;
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "accommodation"));
        const roomsData = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.roomName || 'Unknown Room',
            image: data.images , // Replace with a default image URL if needed
            price: Number(data.price) || 0, // Ensure price is a number
            availability: data.availability || 'Unknown', // Provide a default value if necessary
            amenities: Array.isArray(data.amenities) ? data.amenities : [], // Ensure amenities is an array
            rating: data.rating || 0, // Ensure there's a default rating
          };
        });
        console.log("Fetched Rooms Data:", roomsData); // Debugging line
        setRooms(roomsData);
        const initialRatings = roomsData.reduce((acc, room) => {
          acc[room.id] = room.rating; // Initialize ratings state
          return acc;
        }, {});
        setRatings(initialRatings);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

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

  const handleRatingChange = (id, event) => {
    const newRating = Math.max(0, Math.min(5, Number(event.target.value)));
    setRatings((prevRatings) => ({
      ...prevRatings,
      [id]: newRating,
    }));
  };

  const handleRatingSubmit = async (id) => {
    try {
      await updateDoc(doc(db, "accommodation", id), {
        rating: ratings[id],
      });
      alert("Rating updated successfully!");
    } catch (error) {
      console.error("Error updating rating:", error);
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
                      top: "10px",
                      right: "10px",
                      color: favorites.has(room.id) ? "red" : "white",
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
              <CardContent>
                <Typography variant="h6">{room.name}</Typography>
                <Typography variant="body1" color="text.secondary">
                  Price: ZAR{room.price}
                </Typography>
                <Typography
                  variant="body2"
                  color={getStatusColor(room.availability)}
                >
                  {room.availability}
                </Typography>
                <Typography variant="body2">
                  Amenities: {room.amenities.join(", ")}
                </Typography>

                {/* Rating Input */}
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <TextField
                    type="number"
                    inputProps={{ min: 0, max: 5, step: 0.1 }}
                    value={ratings[room.id] || 0}
                    onChange={(event) => handleRatingChange(room.id, event)}
                    onBlur={() => handleRatingSubmit(room.id)}
                    size="small"
                    variant="outlined"
                    sx={{ width: "60px", mr: 1 }}
                  />
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      key={star}
                      color={
                        ratings[room.id] >= star
                          ? "primary"
                          : "action"
                      }
                      sx={{ fontSize: "20px" }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      {selectedRoom && (
        <RoomDetailsDialog
          open={openDialog}
          onClose={handleCloseDialog}
          room={selectedRoom}
        />
      )}
    </Container>
  );
}

export default RoomsPage;
