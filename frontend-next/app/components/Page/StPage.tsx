"use client";

import StNavbar from "../Navbar/Navbar";

export default function StPage({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <StNavbar />
      {children}
    </div>
  );
}