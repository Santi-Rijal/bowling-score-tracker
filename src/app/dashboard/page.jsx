"use client";

import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const DashBoard = () => {
  // Retrieve player names from localStorage
  const [playerNames, setPlayerNames] = useState([]);
  const [scores, setScores] = useState({});

  useEffect(() => {
    const savedPlayerNames = JSON.parse(localStorage.getItem("playerNames"));

    if (savedPlayerNames) {
      setPlayerNames(savedPlayerNames);

      const initialScores = Array.from({ length: 10 }, (_, index) =>
        savedPlayerNames.reduce((acc, name) => {
          acc[name] = { roll1: "", roll2: "", status: "" }; // Create an empty score for each player per frame
          return acc;
        }, {})
      );

      setScores(initialScores);
    }
  }, []);

  const handleScoreChange = (frameIndex, player, roll, value) => {
    const newScores = [...scores];
    newScores[frameIndex][player][roll] = value;

    if (roll === "roll1" && value === "10") {
      newScores[frameIndex][player].status = "Strike";
      newScores[frameIndex][player].roll2 = "0";
    } else if (
      roll === "roll2" &&
      parseInt(newScores[frameIndex][player].roll1) + parseInt(value) === 10
    ) {
      newScores[frameIndex][player].status = "Spare";
    } else {
      newScores[frameIndex][player].status = "Open Frame";
    }

    setScores(newScores);
  };

  const handleInputChange = (e, frameIndex, player, roll) => {
    const value = e.target.value;
    handleScoreChange(frameIndex, player, roll, value);
  };

  // Function to calculate the score for each player
  const calculateScore = (player) => {
    let totalScore = 0;

    for (let frame = 0; frame < 10; frame++) {
      const roll1 = parseInt(scores[frame][player].roll1) || 0;
      const roll2 = parseInt(scores[frame][player].roll2) || 0;

      if (roll1 === 10) {
        // Strike: Add next two rolls
        const nextRoll1 = parseInt(scores[frame + 1]?.[player]?.roll1) || 0;
        let nextRoll2 = parseInt(scores[frame + 1]?.[player]?.roll2) || 0;

        if (nextRoll1 === 10) {
          nextRoll2 = parseInt(scores[frame + 2]?.[player]?.roll1) || 0;
        }

        totalScore += 10 + nextRoll1 + nextRoll2;
      } else if (roll1 + roll2 === 10) {
        // Spare: Add next roll
        const nextRoll = parseInt(scores[frame + 1]?.[player]?.roll1) || 0;
        totalScore += 10 + nextRoll;
      } else {
        // Open frame: Add the sum of both rolls
        totalScore += roll1 + roll2;
      }
    }
    return totalScore;
  };

  const renderTable = () => {
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Frames/Player</TableCell>
              {playerNames.map((player) => (
                <TableCell key={player}>{player}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from({ length: 10 }, (_, frameIndex) => (
              <TableRow key={frameIndex}>
                <TableCell>Frame {frameIndex + 1}</TableCell>
                {playerNames.map((player) => (
                  <TableCell
                    key={player}
                    sx={{ whiteSpace: "nowrap", minWidth: "9rem" }}
                  >
                    <Box>
                      <TextField
                        type="number"
                        className={["input", "dashboardInput"]}
                        size="small"
                        value={`${scores[frameIndex][player].roll1}`}
                        onChange={(e) =>
                          handleInputChange(e, frameIndex, player, "roll1")
                        }
                        slotProps={{
                          htmlInput: {
                            min: 0,
                            max: 10,
                          },
                        }}
                        onInput={(e) =>
                          (e.target.value = Math.abs(e.target.value))
                        }
                      />
                      {` , `}
                      <TextField
                        type="number"
                        disabled={scores[frameIndex][player].roll1 === "10"}
                        className={["input", "dashboardInput"]}
                        size="small"
                        value={`${scores[frameIndex][player].roll2}`}
                        onChange={(e) =>
                          handleInputChange(e, frameIndex, player, "roll2")
                        }
                        slotProps={{
                          htmlInput: {
                            min: 0,
                            max: 10,
                          },
                        }}
                        onInput={(e) =>
                          (e.target.value = Math.abs(e.target.value))
                        }
                      />
                    </Box>
                    {scores[frameIndex][player].status !== "" && (
                      <Typography
                        variant="body2"
                        sx={{ marginTop: 1 }}
                        className={`${scores[frameIndex][
                          player
                        ].status.toLowerCase()}`}
                      >
                        {scores[frameIndex][player].status}
                      </Typography>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {/* Add row for total scores */}
            <TableRow>
              <TableCell>Total Score</TableCell>
              {playerNames.map((player) => (
                <TableCell key={player}>{calculateScore(player)}</TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Bowling Score Tracker
      </Typography>
      {renderTable()}
      <Button variant="contained" sx={{ marginTop: 2 }}>
        Save Scores
      </Button>
    </Box>
  );
};

export default DashBoard;
