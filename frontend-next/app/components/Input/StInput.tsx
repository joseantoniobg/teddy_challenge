"use client";

import { Input } from "antd";
import styles from "./StInput.module.scss";

interface CustomInputProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  maxLength?: number;
  type?: string;
}

export default function StInput({ value, onChange, placeholder, onKeyDown, maxLength, type }: CustomInputProps) {
  return (
    <Input
      className={styles.input}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      maxLength={maxLength}
      type={type}
    />
  );
}