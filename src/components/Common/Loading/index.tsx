import * as React from "react";
import { CircularProgress } from "@mui/material";

export interface ILoadingProps {
  color?: string;
  size?: number;
}

export function Loading(props: ILoadingProps) {
  return (
    <CircularProgress
      sx={{
        color: props.color || "#1890ff",
        mr: "4px",
      }}
      size={props.size || 20}
      thickness={3}
    />
  );
}
