import React, { useEffect } from "react";
import Header from "./Components/Header/Header";
import Loading from "./Components/Loading/Loading";
import { useLoading } from "./Hooks/useLoading";
import setLoadingInterceptor from "./Interceptors/loadingInterceptor";
import AppRoutes from "./Routes/AppRoutes/AppRoutes";

export default function App() {
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    setLoadingInterceptor({ showLoading, hideLoading });
  }, []);
  return (
    <>
      <Loading />
      <div className="flex h-screen flex-col">
        <Header />
        <div className="flex-grow overflow-y-auto">
          <AppRoutes />
        </div>
      </div>
    </>
  );
}
