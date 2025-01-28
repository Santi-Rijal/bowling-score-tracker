"use client";

import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomTable from "../../components/Table/CustomTable";
import { retriveData, saveData } from "@/hooks/save";

const DashBoard = () => {
  // Retrieve player names from localStorage
  const [playerNames, setPlayerNames] = useState([]);
  const [scores, setScores] = useState({});

  useEffect(() => {
    const savedPlayerNames = retriveData("playerNames");
    let initialScores = retriveData("scores");

    setPlayerNames(savedPlayerNames);

    if (savedPlayerNames && initialScores === null) {
      initialScores = Array.from({ length: 10 }, (_, index) =>
        savedPlayerNames.reduce((acc, name) => {
          acc[name] = { roll1: "", roll2: "", roll3: "", status: "" }; // Create an empty score for each player per frame
          return acc;
        }, {})
      );
    }

    setScores(initialScores);
  }, []);

  const handleSave = () => {
    saveData("scores", scores);
  };

  const handleReset = () => {
    const newData = Array.from({ length: 10 }, (_, index) =>
      playerNames.reduce((acc, name) => {
        acc[name] = { roll1: "", roll2: "", status: "" }; // Create an empty score for each player per frame
        return acc;
      }, {})
    );

    setScores(newData);

    if (retriveData("scores")) saveData("scores", newData);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Bowling Score Tracker
      </Typography>
      <CustomTable
        playerNames={playerNames}
        scores={scores}
        setScores={setScores}
      />

      <Box>
        <Button variant="contained" sx={{ marginTop: 2 }} onClick={handleSave}>
          Save Scores
        </Button>
        <Button
          variant="contained"
          color="error"
          sx={{ marginTop: 2 }}
          onClick={handleReset}
        >
          Reset
        </Button>
      </Box>
    </Box>
  );
};

export default DashBoard;
