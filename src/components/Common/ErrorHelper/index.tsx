import React from "react";
import { Stack, Typography } from "@mui/material";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

interface IErrorHelperProps {
  message: any;
}

export function ErrorAfterSubmit(props: IErrorHelperProps) {
  return (
    <Stack direction="row" alignItems="center" spacing={0.5}>
      <ErrorOutlineIcon sx={{ fontSize: "3rem" }} color="error" />
      <Typography variant="subtitle2" color="red">
        {props.message}
      </Typography>
    </Stack>
  );
}

export function ErrorInput(props: IErrorHelperProps) {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Typography variant="caption" color="red">
        {props.message}
      </Typography>
    </Stack>
  );
}
