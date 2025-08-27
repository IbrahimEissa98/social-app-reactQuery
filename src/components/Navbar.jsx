import { useContext, useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@heroui/react";
import logo from "../assets/images/icon.svg";
import { Link, useNavigate } from "react-router-dom";
import { isLoginContext } from "../contexts/IsLoginContext";
import ToggleTheme from "./ToggleTheme";

export const BeSocialLogo = () => {
  return (
    <img src={logo} className="bg-black w-8 h-8 rounded-full border-2" alt="" />
  );
};

export default function NavbarComponent({ toggleTheme }) {
  const navigate = useNavigate();
  const { isLogin, setIsLogin } = useContext(isLoginContext);
  const [isProfile, setIsProfile] = useState(false);

  function openLeftNav() {
    document.querySelector("#leftNav").classList.toggle("-translate-x-full");
    document.querySelector("body").classList.toggle("overflow-hidden");
  }

  useEffect(() => {
    const winLoad = window.addEventListener("load", () => {
      setIsProfile(location.href == location.origin + "/profile");
    });
    const winClick = window.addEventListener("click", () => {
      setIsProfile(location.href == location.origin + "/profile");
    });

    return () => {
      removeEventListener(winLoad, window);
      removeEventListener(winClick, window);
    };
  }, []);

  return (
    <Navbar
      className="w-full sticky top-0 mx-auto shadow-md dark:bg-post-dark"
      classNames={{ wrapper: "max-w-[1600px] px-0 sm:px-6" }}
    >
      <NavbarBrand justify="start" className="gap-2">
        <div className="block lg:hidden cursor-pointer" onClick={openLeftNav}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h12M4 12h16M4 18h8"
            />
          </svg>
        </div>
        <Link className="flex items-center" to={"/"}>
          <BeSocialLogo />
          <p className="font-bold text-inherit ml-2 font-mono">BeSocial</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link
            color="foreground"
            to={`/profile`}
            className={`flex items-center text-gray-800 dark:text-slate-200 px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-300 ${
              isProfile ? "active text-white bg-blue-400" : ""
            }`}
          >
            <i className="fa-solid fa-user me-1.5"></i>
            <span className="">Profile</span>
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="gap-2 sm:gap-4" justify="end">
        {isLogin ? (
          <NavbarItem>
            <Button
              as={Link}
              onPress={() => {
                navigate("/login");
                localStorage.removeItem("token");
                localStorage.removeItem("userData");
                setIsLogin(false);
              }}
              color="danger"
              variant="flat"
              className="flex items-center justify-center gap-2"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 45 45"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.71374 34.0116H8.31685C8.56287 34.0116 8.79351 34.1215 8.94727 34.3151C9.30604 34.7599 9.69044 35.189 10.0953 35.5971C11.7513 37.2895 13.7129 38.6382 15.8716 39.5686C18.108 40.533 20.5117 41.0277 22.9394 41.0233C25.3945 41.0233 27.7726 40.5314 30.0073 39.5686C32.1659 38.6382 34.1275 37.2895 35.7835 35.5971C37.4425 33.9104 38.7653 31.9113 39.6788 29.7105C40.627 27.4291 41.1036 25.0064 41.1036 22.5C41.1036 19.9936 40.6218 17.571 39.6788 15.2896C38.7665 13.0867 37.4544 11.1035 35.7835 9.40297C34.1127 7.70239 32.1702 6.36286 30.0073 5.43146C27.7726 4.46868 25.3945 3.97682 22.9394 3.97682C20.4844 3.97682 18.1062 4.46344 15.8716 5.43146C13.7087 6.36286 11.7662 7.70239 10.0953 9.40297C9.69044 9.81634 9.31116 10.2454 8.94727 10.6849C8.79351 10.8785 8.55774 10.9884 8.31685 10.9884H4.71374C4.39085 10.9884 4.19096 10.6222 4.37034 10.3448C8.30147 4.10763 15.1797 -0.020851 22.9958 7.92138e-05C35.2761 0.0314745 45.1219 10.2088 44.9989 22.7303C44.8759 35.0529 35.0455 45 22.9394 45C15.1438 45 8.29635 40.8768 4.37034 34.6553C4.19608 34.3779 4.39085 34.0116 4.71374 34.0116ZM0.157318 22.1704L7.43017 16.3099C7.70181 16.0902 8.09646 16.289 8.09646 16.6396V20.6163H24.19C24.4155 20.6163 24.6 20.8047 24.6 21.0349V23.9652C24.6 24.1954 24.4155 24.3838 24.19 24.3838H8.09646V28.3605C8.09646 28.7111 7.69669 28.9099 7.43017 28.6901L0.157318 22.8297C0.108311 22.7905 0.068676 22.7405 0.04142 22.6834C0.014164 22.6263 0 22.5636 0 22.5C0 22.4365 0.014164 22.3738 0.04142 22.3167C0.068676 22.2596 0.108311 22.2095 0.157318 22.1704Z"
                  fill="#fff"
                />
              </svg>
              Logout
            </Button>
          </NavbarItem>
        ) : (
          <>
            <NavbarItem className="hidden lg:flex">
              <Button as={Link} color="success" to={"/login"} variant="flat">
                Login
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" to={"/register"} variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
        <NavbarItem>
          <a
            href="https://github.com/IbrahimEissa98?tab=repositories"
            target="_blank"
          >
            <svg
              aria-hidden="true"
              className="octicon octicon-mark-github fill-black dark:fill-white"
              height={24}
              version="1.1"
              viewBox="0 0 16 16"
              width={24}
            >
              <path
                fillRule="evenodd"
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
              />
            </svg>
          </a>
        </NavbarItem>
        <ToggleTheme toggleTheme={toggleTheme} />
      </NavbarContent>
    </Navbar>
  );
}
