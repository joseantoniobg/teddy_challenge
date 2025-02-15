"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface AppContextType {
  name: string;
  setName: (name: string) => void;
  selectedClients: boolean;
  setSelectedClients: (selectedClients: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [name, setName] = useState("");
  const [selectedClients, setSelectedClients] = useState(false);

  return (
    <AppContext.Provider value={{ name, setName, selectedClients, setSelectedClients }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be defined");
  }
  return context;
}
