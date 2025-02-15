"use client";

import { useState } from "react";
import { Snackbar, Alert } from "@mui/material";

interface SnackBarProps {
  open: boolean;
  onClose: () => void;
  label: string;
}

export default function StSnackBar({ open, onClose, label }: SnackBarProps) {
  return (
    <Snackbar open={open} autoHideDuration={1500} onClose={onClose} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
      <Alert onClose={onClose} severity="error" variant="filled">
        {label}
      </Alert>
    </Snackbar>
  );
}