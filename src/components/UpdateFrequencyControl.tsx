import { Box, Typography, Slider } from "@mui/material";
import { useState } from "react";
import { updateChannelFrequency } from "../api/runtimeConfig";

const SPEED_PRESETS = {
  Normal: { min: 20, max: 60 },
  Fast: { min: 5, max: 20 },
  Extreme: { min: 1, max: 5 }
};

export default function UpdateFrequencyControl() {
  const [value, setValue] = useState(0);

  const labels = ["Normal", "Fast", "Extreme"];

  const handleChange = async (_: any, newValue: number | number[]) => {
    const v = newValue as number;
    setValue(v);

    const preset = SPEED_PRESETS[labels[v] as keyof typeof SPEED_PRESETS];

    // update all channels
    await Promise.all([
      updateChannelFrequency("all_trades", preset.min, preset.max),
      updateChannelFrequency("candlestick", preset.min, preset.max),
      updateChannelFrequency("l2_orderbook", preset.min, preset.max),
      updateChannelFrequency("v2/ticker", preset.min, preset.max)
    ]);
  };

  return (
    <Box sx={{ width: 300 }}>
      <Typography mb={1}>Update Speed</Typography>

      <Slider
        value={value}
        onChange={handleChange}
        step={1}
        marks
        min={0}
        max={2}
        valueLabelDisplay="off"
      />

      <Typography mt={1}>{labels[value]}</Typography>
    </Box>
  );
}