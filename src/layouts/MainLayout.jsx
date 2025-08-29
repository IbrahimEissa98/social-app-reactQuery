import { useContext } from "react";
import { Outlet } from "react-router-dom";
import NavbarComponent from "../components/Navbar";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import { isLoginContext } from "../contexts/IsLoginContext";

export default function MainLayout({ toggleTheme }) {
  const { isLogin } = useContext(isLoginContext);

  return (
    <>
      <NavbarComponent toggleTheme={toggleTheme} />
      <main className="min-h-screen bg-gray-200 dark:bg-base-dark font-segue">
        <div className="sm:px-0 max-w-[1600px] mx-auto grid grid-cols-8 gap-0 justify-between pt-2 w-full sm:pt-5">
          {isLogin && (
            <div
              className="fixed top-[65px] left-0 z-40 lg:z-auto lg:static lg:col-span-2 lg:block h-full w-full lg:bg-transparent lg:dark:bg-transparent bg-white/50 dark:bg-black/50 -translate-x-full lg:translate-none transition-all duration-400"
              id="leftNav"
            >
              <div className="sidebars sticky lg:top-20 lg:px-6 pb-10 w-fit min-w-[300px] lg:min-w-auto lg:w-full overflow-auto h-[90vh]">
                <LeftSidebar />
              </div>
            </div>
          )}

          <div className="col-span-8 md:col-span-5 lg:col-span-4 pb-0 break-all">
            <Outlet />
          </div>

          {isLogin && (
            <div className="hidden md:block col-span-3 lg:col-span-2">
              <div className="sidebars sticky top-20 px-6 pb-10 w-full overflow-auto h-[90vh]">
                <RightSidebar />
              </div>
            </div>
          )}
          {/*  */}
        </div>
      </main>
    </>
  );
}
