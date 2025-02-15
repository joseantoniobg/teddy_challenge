import { Button } from "antd";

interface EnterButtonProps {
  onClick: () => void;
  label: string;
  outlined?: boolean;
  key?: string;
  type?: "link" | "text" | "primary" | "default" | "dashed" | undefined
  loading?: boolean;
}

export default function StButton({ onClick, label, outlined, key, type, loading }: EnterButtonProps) {
  return (
    <Button
      type={type ?? "primary"}
      style={outlined ? styles.outilineButton : styles.button}
      onClick={onClick}
      key={key}
      loading={loading}
    >
      {label}
    </Button>
  );
}

const styles = {
  button: {
    backgroundColor: "orange",
    borderColor: "orange",
    color: "white",
    width: "100%",
    display: "block",
  },
  outilineButton: {
    backgroundColor: "white",
    color: "orange",
    borderColor: "orange",
    width: "100%",
    display: "block",
    marginTop: "10px",
    marginBottom: "10px",
  },
};