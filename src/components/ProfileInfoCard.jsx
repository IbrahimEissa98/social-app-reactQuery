import { Button } from "@heroui/react";
import useHelpers from "../hooks/useHelpers";

export default function ProfileInfoCard({
  user,
  setIsUpdatePhoto,
  onOpenPhotoPasswordModal,
}) {
  const { createdAt } = useHelpers();
  return (
    <>
      <div className="relative grid grid-cols-3 gap-3 w-full p-5 bg-white dark:bg-post-dark shadow-sm rounded-md">
        <div className="col-span-3 md:col-span-1 flex flex-col gap-3 items-center">
          <div className="relative w-[150px] h-[150px] rounded-full border-3 border-blue-500 shadow-xl shadow-gray-700 overflow-hidden">
            <img
              src={user?.photo}
              className="w-full h-full object-cover"
              alt=""
            />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
              <Button
                className="max-w-fit min-w-fit p-2.5 rounded-full text-medium h-fit w-fit"
                color="primary"
                onPress={() => {
                  setIsUpdatePhoto(true);
                  onOpenPhotoPasswordModal();
                }}
              >
                <i className="fa-solid fa-camera"></i>
              </Button>
            </div>
          </div>

          <button
            onClick={() => {
              setIsUpdatePhoto(false);
              onOpenPhotoPasswordModal();
            }}
            className="relative text-xs px-2 py-2 rounded-xl bg-gray-800/50 dark:bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold shadow-lg hover:bg-danger/50 dark:hover:bg-danger/20 hover:scale-105 transition"
          >
            <span className="flex items-center gap-2">🔑 Change Password</span>
          </button>
        </div>
        <div className="col-span-3 md:col-span-2">
          <h2 className="text-center md:text-start font-bold text-3xl uppercase">
            {user?.name}
          </h2>
          <ul className="mt-4 flex flex-col gap-3">
            <li className="flex items-center">
              <i className="fa-solid fa-at text-blue-300 me-2"></i>
              <span className="text-gray-500 me-3">Email:</span>
              <h5>{user?.email}</h5>
            </li>
            <li className="flex items-center">
              <i className="fa-solid fa-cake-candles text-blue-300 me-2"></i>
              <span className="text-gray-500 me-3">Date Of Birth:</span>
              <h5>{user?.dateOfBirth}</h5>
            </li>
            <li className="flex items-center">
              <i className="fa-solid fa-venus-mars text-blue-300 me-2"></i>
              <span className="text-gray-500 me-3">Gender:</span>
              <h5>{user?.gender}</h5>
            </li>
            <li className="flex items-center">
              <i className="fa-solid fa-calendar text-blue-300 me-2"></i>
              <span className="text-gray-500 me-3">Join Date:</span>
              <h5>{createdAt(user?.createdAt)}</h5>
            </li>
            <ul className="flex justify-center md:justify-start gap-4 text-zinc-700 mt-3">
              <li>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  className="flex items-center gap-2 hover:bg-blue-600 dark:hover:bg-blue-600 duration-400 transition-all bg-gray-200 dark:bg-white w-[35px] h-[35px] justify-center rounded-full"
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg"
                    className="w-5 h-5"
                    alt="Facebook"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  className="flex items-center gap-2 hover:bg-sky-500 dark:hover:bg-sky-500 duration-400 transition-all bg-gray-200 dark:bg-white w-[35px] h-[35px] justify-center rounded-full"
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/x.svg"
                    className="w-5 h-5"
                    alt="Twitter"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  className="flex items-center gap-2 hover:bg-pink-500 dark:hover:bg-pink-500 duration-400 transition-all bg-gray-200 dark:bg-white w-[35px] h-[35px] justify-center rounded-full"
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg"
                    className="w-5 h-5"
                    alt="Instagram"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  className="flex items-center gap-2 hover:bg-blue-700 dark:hover:bg-blue-700 duration-400 transition-all bg-gray-200 dark:bg-white w-[35px] h-[35px] justify-center rounded-full"
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg"
                    className="w-5 h-5"
                    alt="LinkedIn"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  className="flex items-center gap-2 hover:bg-red-600 dark:hover:bg-red-600 duration-400 transition-all bg-gray-200 dark:bg-white w-[35px] h-[35px] justify-center rounded-full"
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/youtube.svg"
                    className="w-5 h-5"
                    alt="YouTube"
                  />
                </a>
              </li>
            </ul>
          </ul>
        </div>
      </div>
    </>
  );
}
