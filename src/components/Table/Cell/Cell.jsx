import { Box, TableCell, TextField, Typography } from "@mui/material";
import React from "react";

const Cell = (props) => {
  const { handleInputChange, scores, frameIndex, player } = props;

  return (
    <TableCell sx={{ whiteSpace: "nowrap", minWidth: "12rem" }}>
      <Box>
        <TextField
          type="number"
          className={["input", "dashboardInput"]}
          size="small"
          value={`${scores[frameIndex][player].roll1}`}
          onChange={(e) => handleInputChange(e, frameIndex, player, "roll1")}
          slotProps={{
            htmlInput: {
              min: 0,
              max: 10,
            },
          }}
          onInput={(e) => (e.target.value = Math.abs(e.target.value))}
        />
        {` , `}
        <TextField
          type="number"
          disabled={
            frameIndex !== 9 && scores[frameIndex][player].roll1 === "10"
          }
          className={["input", "dashboardInput"]}
          size="small"
          value={`${scores[frameIndex][player].roll2}`}
          onChange={(e) => handleInputChange(e, frameIndex, player, "roll2")}
          slotProps={{
            htmlInput: {
              min: 0,
              max: 10,
            },
          }}
          onInput={(e) => (e.target.value = Math.abs(e.target.value))}
        />
        {frameIndex === 9 && (
          <>
            {` , `}
            <TextField
              type="number"
              disabled={
                +scores[frameIndex][player].roll1 +
                  +scores[frameIndex][player].roll2 <
                10
              }
              className={["input", "dashboardInput"]}
              size="small"
              value={`${scores[frameIndex][player].roll3}`}
              onChange={(e) =>
                handleInputChange(e, frameIndex, player, "roll3")
              }
              slotProps={{
                htmlInput: {
                  min: 0,
                  max: 10,
                },
              }}
              onInput={(e) => (e.target.value = Math.abs(e.target.value))}
            />
          </>
        )}
      </Box>
      {scores[frameIndex][player].status !== "" ||
        (frameIndex !== 9 && (
          <Typography
            variant="body2"
            sx={{ marginTop: 1 }}
            className={`${scores[frameIndex][player].status.toLowerCase()}`}
          >
            {scores[frameIndex][player].status}
          </Typography>
        ))}
    </TableCell>
  );
};

export default Cell;
