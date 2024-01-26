import { Route, Routes } from "react-router-dom";
import DefaultPage from "../../Pages/DefaultPage/DefaultPage";

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultPage />} />
      </Routes>
    </>
  );
}
