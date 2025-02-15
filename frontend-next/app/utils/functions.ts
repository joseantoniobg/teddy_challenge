export const formatBRL = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

export const formatCPF_CNPJ = (value: string): string => {
  const numericValue = value.replace(/\D/g, "");

  if (numericValue.length > 11) {
    return numericValue
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .substring(0, 18);
  } else {
    return numericValue
      .replace(/^(\d{3})(\d)/, "$1.$2")
      .replace(/\.(\d{3})(\d)/, ".$1.$2")
      .replace(/(\d{3})(\d)/, "$1-$2")
      .substring(0, 14);
  }
};

export const handleKeyDownOnlyNumbers = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (
    e.key === "Backspace" ||
    e.key === "Tab" ||
    e.key === "ArrowLeft" ||
    e.key === "ArrowRight" ||
    e.key === "Delete" ||
    e.key === "Enter"  ||
    e.key === "ctrl"
  ) {
    return;
  }

  if (!/^\d$/.test(e.key)) {
    e.preventDefault();
  }
};

export function formatCpfCnpj(value: string): string {
  const cleaned = value.replace(/\D/g, '');

  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  } else if (cleaned.length === 14) {
    return cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  } else {
    return value;
  }
}

export const formatCurrency = (value: string): string => {
  const cleaned = value.replace(/\D/g, "");

  const numberValue = Number(cleaned) / 100;
  return numberValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
};

export const parseCurrencyToNumber = (value: string): number => {
  return Number(value.replace(/[^0-9,-]/g, "").replace(",", "."));
};

export const getNumbersFromString = (value: string): string => {
  return value.replace(/[^0-9,-]/g, "");
};