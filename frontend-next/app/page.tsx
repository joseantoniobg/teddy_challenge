"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Button, Typography } from "antd";
import StButton from "./components/Button/StButton";
import StInput from "./components/Input/StInput";
import { useAppContext } from "./context/AppContext";
import StSnackBar from "./components/Snackbar/StSnackbar";

export default function Home() {
  const router = useRouter();
  const { name, setName } = useAppContext();
  const [openSnack, setOpenSnack] = useState(false);

  const handleEnter = () => {
    if (name.trim() === '') {
      setOpenSnack(true);
      return;
    }

    if (name.trim()) {
      router.push("/clients");
    }
  };

  return (
    <div style={styles.container}>
      <Typography.Title level={1} style={styles.title}>
        Olá, seja bem-vindo!
      </Typography.Title>
      <div style={styles.form}>
        <StInput
          placeholder="Digite seu nome:"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <StSnackBar open={openSnack} onClose={() => setOpenSnack(false)} label="Digite seu nome para entrar" />
        <StButton onClick={handleEnter} label="Entrar" />
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    gap: "16px",
  },
  title: {
    fontSize: "32px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    width: "300px",
  },
};