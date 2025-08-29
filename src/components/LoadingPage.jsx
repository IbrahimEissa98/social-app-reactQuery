import logo from "../assets/images/icon.svg";
import { Spinner } from "@heroui/react";

export default function LoadingPage() {
  return (
    <>
      <div
        className="fixed inset-0 bg-white dark:bg-slate-950 z-50 flex justify-center items-center flex-col "
        id="loader"
      >
        <img
          className="block w-24 h-24 rounded-full border-3 border-blue-500"
          src={logo}
          alt="BeSocial logo"
        />
        <h2 className="text-center font-bold tracking-wide text-3xl p-4">
          BeSocial
        </h2>
        <Spinner variant="wave" size="lg" />

        <p className="absolute bottom-3 left-1/2 -translate-x-1/2 text-blue-500 font-semibold">
          Copyrights © Ibrahim Eissa
        </p>
      </div>
    </>
  );
}
