import { ChevronLeftRounded } from "@mui/icons-material";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const PlayerNameInput = ({ players, setShowNameInputs }) => {
  const [playerNames, setPlayerNames] = useState(Array(players).fill(""));

  const router = useRouter();

  const getInputs = () => {
    // Create an array of the number of players and map through it to generate text fields
    return Array.from({ length: players }, (_, index) => (
      <TextField
        key={index}
        placeholder={`Player ${index + 1} Name`}
        type="text"
        required
        sx={{ marginBottom: 2, width: "inherit" }}
        onChange={(e) => {
          const updatedNames = [...playerNames];
          updatedNames[index] = e.target.value;
          setPlayerNames(updatedNames);
        }}
      />
    ));
  };

  const handleGenerate = () => {
    // Save the player names to localStorage
    localStorage.setItem("playerNames", JSON.stringify(playerNames));
    console.log("Player names saved:", playerNames);

    router.push("/dashboard");
  };

  return (
    <>
      <Button
        sx={{ alignSelf: "start" }}
        onClick={() => setShowNameInputs(false)}
      >
        <ChevronLeftRounded />
        <Typography variant="body1">BACK</Typography>
      </Button>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        {getInputs()}
      </Box>

      <Button
        variant="contained"
        fullWidth
        size="large"
        onClick={handleGenerate}
      >
        Create Table
      </Button>
    </>
  );
};

export default PlayerNameInput;
