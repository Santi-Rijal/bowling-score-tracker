"use client";
import styles from "./page.module.css";

import React, { useState } from "react";
import { Box } from "@mui/system";
import { IconButton, TextField } from "@mui/material";
import { ChevronRightRounded } from "@mui/icons-material";
import PlayerNameInput from "./components/PlayerNamesInput/PlayerNameInput";

const Home = () => {
  const [players, setPlayers] = useState("");
  const [showNameInputs, setShowNameInputs] = useState(false);

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "inherit",
        minWidth: "inherit",
        justifyContent: "center",
        alignItems: "start",
        padding: 5,
        rowGap: 2,
      }}
    >
      {showNameInputs ? (
        <PlayerNameInput
          players={players}
          setShowNameInputs={setShowNameInputs}
        />
      ) : (
        <TextField
          type="number"
          required
          value={players}
          onChange={(e) => setPlayers(e.target.value)}
          slotProps={{
            htmlInput: {
              min: 1,
              max: 10,
            },
            input: {
              endAdornment: (
                <IconButton
                  onClick={() => {
                    players !== "" && setShowNameInputs(true);
                  }}
                >
                  <ChevronRightRounded />
                </IconButton>
              ),
            },
          }}
          onInput={(e) => (e.target.value = Math.abs(e.target.value))}
          className="input"
          label="Number of Players"
          sx={{ width: "100%" }}
        />
      )}
    </Box>
  );
};

export default Home;
