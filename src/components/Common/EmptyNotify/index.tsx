import * as React from "react";
import { Stack, Button, Typography } from "@mui/material";

export interface IEmptyNotifyProps {
  title: string;
}

export default function EmptyNotify(props: IEmptyNotifyProps) {
  return (
    <Stack
      sx={{
        width: "100%",
        minHeight: "400px",
      }}
      justifyContent="center"
      alignItems="center"
      p="2rem"
    >
      <img
        alt=""
        src="https://frontend.tikicdn.com/_desktop-next/static/img/mascot_fail.svg"
      />
      <Typography variant="body1">{props.title}</Typography>

      <Button variant="contained" color="warning">
        Tiếp tục mua sắm
      </Button>
    </Stack>
  );
}
