import { Outlet } from "react-router-dom";
import LoadingPage from "../components/LoadingPage";
import { useEffect, useState } from "react";

export default function AuthLayout() {
  const [showLoadingPage, setShowLoadingPage] = useState(true);

  let loaderTimer = () => {
    setTimeout(() => {
      setShowLoadingPage(false);
      // document.querySelector(".loader").classList.add("hidden!");
    }, 2000);
  };

  useEffect(() => {
    loaderTimer();
    // let authLoadingPage = window.addEventListener("load", loaderTimer);
    console.log("Main Mount");

    return () => {
      // removeEventListener("load", authLoadingPage);
      clearTimeout(loaderTimer);
      console.log("Main UnMount");
    };
  }, []);

  return (
    <>
      {showLoadingPage && <LoadingPage />}

      <div
        className={`relative flex justify-center items-center py-4 md:py-8 overflow-hidden min-h-screen bg-radial from-indigo-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800`}
      >
        <div className="absolute inset-0">
          <div className="w-60 h-60 rounded-full animate-move-element-y bg-blue-300 opacity-40 dark:opacity-20 shadow-[0_0_30px_10px_rgb(176,211,255)] absolute top-0 right-0"></div>
          <div className="w-40 h-40 rounded-full animate-move-element-y bg-blue-300 opacity-40 dark:opacity-20 shadow-[0_0_30px_10px_rgb(176,211,255)] absolute top-40 left-20"></div>
          <div className="w-60 h-20 animate-move-element-x bg-blue-300 opacity-40 dark:opacity-20 shadow-[0_0_30px_10px_rgb(176,211,255)] absolute bottom-0 left-1/2 -translate-x-1/2"></div>
        </div>
        <Outlet />
      </div>
    </>
  );
}
