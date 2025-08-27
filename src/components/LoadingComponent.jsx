import { Spinner } from "@heroui/react";

export default function LoadingComponent({ title }) {
  return (
    <>
      <div className="w-full! p-5 bg-white dark:bg-post-dark shadow-sm rounded-md ">
        <div className="flex flex-col gap-3 justify-center items-center p-5 border-2 border-gray-500/10 dark:border-gray-500/30 rounded-md ">
          <div className="flex justify-center items-center w-20 h-20 rounded-full border-8 border-gray-300 animate-blink">
            <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
          </div>
          <h3 className="font-semibold tracking-widest text-xl text-center font-mono text-shadow-lg text-shadow-blue-300">
            Loading...
          </h3>
          <p className="font-medium text-md text-gray-400 text-center font-mono">
            Please wait while loading your {title} page.
          </p>
          <Spinner size="lg" variant="wave" />
        </div>
      </div>
    </>
  );
}
