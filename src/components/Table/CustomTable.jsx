import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import React from "react";
import Cell from "./Cell/Cell";

const CustomTable = (props) => {
  const { playerNames, scores, setScores } = props;

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
                <Cell
                  key={player}
                  handleInputChange={handleInputChange}
                  scores={scores}
                  frameIndex={frameIndex}
                  player={player}
                />
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

export default CustomTable;
