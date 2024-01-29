import React from "react";
import Header from "./Components/Header/Header";
import AppRoutes from "./Routes/AppRoutes/AppRoutes";

export default function App() {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex-grow overflow-y-auto">
        <AppRoutes />
      </div>
    </div>
  );
}
