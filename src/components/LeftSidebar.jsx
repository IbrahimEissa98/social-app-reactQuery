import { useContext, useEffect, useState } from "react";
import { isLoginContext } from "../contexts/IsLoginContext";
import profilePlaceholder from "../assets/images/profile-placeholder.jpg";
import { Link } from "react-router-dom";

export default function LeftSidebar() {
  const { user } = useContext(isLoginContext);
  const [isFeed, setIsFeed] = useState(false);
  const [isProfile, setIsProfile] = useState(false);

  useEffect(() => {
    const winLoad = window.addEventListener("load", () => {
      setIsFeed(location.href == location.origin + "/");
      setIsProfile(location.href == location.origin + "/profile");
    });
    const winClick = window.addEventListener("click", () => {
      setIsFeed(location.href == location.origin + "/");
      setIsProfile(location.href == location.origin + "/profile");
    });

    return () => {
      removeEventListener(winLoad, window);
      removeEventListener(winClick, window);
    };
  }, []);

  return (
    <>
      {/* user facts */}
      <div
        className={`w-full bg-white dark:bg-post-dark shadow-sm rounded-md p-5 flex flex-col gap-4`}
      >
        <Link to={`/profile`} className="flex gap-2 items-center">
          <img
            src={user ? user.photo : profilePlaceholder}
            className="w-[40px] h-[40px] rounded-full"
            alt=""
          />
          <h3 className="text-center text-xl font-semibold capitalize">
            {user?.name}
          </h3>
        </Link>
        <div className="flex justify-between ">
          <div className="flex flex-col items-center">
            <p className="font-semibold">256</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Followers
            </p>
          </div>
          <div className="flex flex-col items-center">
            <p className="font-semibold">102</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Following
            </p>
          </div>
          <div className="flex flex-col items-center">
            <p className="font-semibold">34</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Posts</p>
          </div>
        </div>
      </div>

      {/* pages */}
      <div
        className={`w-full text-gray-700 dark:text-white bg-white dark:bg-post-dark shadow-sm rounded-md p-5 flex flex-col gap-4 mt-3`}
      >
        <div className="border-b border-divider flex flex-col gap-2 *:flex *:items-center *:gap-3 pb-5 *:cursor-pointer *:hover:not-[.active]:bg-gray-200 *:dark:hover:not-[.active]:bg-slate-800 *:p-2 *:rounded-xl">
          <Link
            to={"/"}
            className={`${isFeed ? "active text-white bg-blue-400" : ""}`}
          >
            <i className="fa-solid fa-house"></i>
            <p>Feed</p>
          </Link>
          <Link
            to={"/profile"}
            className={`${isProfile ? "active text-white bg-blue-400" : ""}`}
          >
            <i className="fa-solid fa-house"></i>
            <p>Profile</p>
          </Link>
          <div className="">
            <i className="fa-solid fa-users"></i>
            <p>Friends</p>
          </div>
          <div className="relative">
            <i className="fa-solid fa-calendar-days"></i>
            <p>Events</p>
            <p className="w-5 h-5 rounded-full bg-red-500 absolute right-5 top-1/2 -translate-y-1/2 text-white">
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                4
              </span>
            </p>
          </div>
          <div className="">
            <i className="fa-solid fa-video"></i>
            <p>Watch videos</p>
          </div>
          <div className="">
            <i className="fa-solid fa-image"></i>
            <p>Photos</p>
          </div>
          <div className="">
            <i className="fa-solid fa-cart-shopping"></i>
            <p>Market Place</p>
          </div>
          <div className="relative">
            <i className="fa-solid fa-file"></i>
            <p>Files</p>
            <p className="w-5 h-5 rounded-full bg-violet-600 absolute right-5 top-1/2 -translate-y-1/2 text-white">
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                4
              </span>
            </p>
          </div>
        </div>

        {/* pages you like */}
        <h3 className="text-sm text-gray-400 pl-3 uppercase tracking-wider font-bold">
          pages you like
        </h3>
        <div className="flex flex-col gap-2 pb-5 *:cursor-pointer *:hover:bg-gray-200 *:dark:hover:bg-slate-800 *:p-2 *:rounded-xl">
          <div className="flex items-center gap-2 text-sm">
            <img
              className="w-[30px] h-[30px] rounded-full"
              src="https://imgs.search.brave.com/zVddCWpYG2vSQB986Xy5e8IlBLKulgNuBXy-nWjA45I/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvZ3JhZGllbnQt/dWktdXgtZGVzaWdu/LWlsbHVzdHJhdGlv/bl8yMy0yMTUxNTE0/Nzg3LmpwZz9zZW10/PWFpc19oeWJyaWQm/dz03NDAmcT04MA"
              alt="logo"
            />
            <p>UI/UX Community</p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <img
              className="w-[30px] h-[30px] rounded-full"
              src="https://imgs.search.brave.com/KARsPTMpSVZIOscylFzoJ0AhFbwLsmhYGOlZvskRQ7Q/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS12ZWN0b3Iv/ZmxhdC1kZXNpZ24t/d2ViLWRlc2lnbmVy/LWxhbmRpbmctcGFn/ZV8yMy0yMTUwMzMz/MzE0LmpwZz9zZW10/PWFpc19oeWJyaWQm/dz03NDAmcT04MA"
              alt="logo"
            />
            <p>Web Designer</p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <img
              className="w-[30px] h-[30px] rounded-full"
              src="https://imgs.search.brave.com/CuxL5AGd8OJdq6yJ2Jp1e2EJboX0qPF8I6uaNUahxEQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/ZHJpYmJibGUuY29t/L3VzZXJzLzIzMzg1/My9zY3JlZW5zaG90/cy8xNTQzMjY2Ni9t/ZWRpYS8xYTk2ZDQz/YzcyZTYxZDY4ZDYx/MGFkZGFjMDgyN2Qz/Yy5wbmc_cmVzaXpl/PTQwMHgzMDAmdmVy/dGljYWw9Y2VudGVy"
              alt="logo"
            />
            <p>Dribbble Community</p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <img
              className="w-[30px] h-[30px] rounded-full"
              src="https://imgs.search.brave.com/aR1cNsBzHZ-e1w5Z-AwxqvtnarfZ1ARgolcdbohQvfw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9iZWhh/bmNlLWljb24tbG9n/by1iZWF1dGlmdWwt/bWV0aWN1bG91c2x5/LWRlc2lnbmVkLTIy/NTE0OTE5Mi5qcGc"
              alt="logo"
            />
            <p>Behance</p>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="flex flex-col gap-3 flex-wrap font-semibold mt-5 text-blue-500 *:hover:underline">
        <Link>Privacy Terms</Link>
        <Link>Advertising</Link>
        <Link>Cookies</Link>
        <Link
          to="https://github.com/IbrahimEissa98?tab=repositories"
          target="_blank"
          className=""
        >
          Platform © <span className="">Ibrahim Eissa</span> 2025
        </Link>
      </div>
    </>
  );
}
