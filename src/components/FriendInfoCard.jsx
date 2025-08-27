export default function FriendInfoCard({ user }) {
  return (
    <>
      <div className="w-full px-5 py-10 bg-white dark:bg-post-dark shadow-sm rounded-md">
        <div className="flex flex-col gap-3 items-center">
          <div className="w-[200px] h-[200px] rounded-full border-3 border-blue-500 shadow-xl shadow-gray-700 overflow-hidden">
            <img
              src={user?.photo}
              className="w-full h-full object-cover"
              alt={user?.name}
            />
          </div>
          <h2 className="text-center font-bold text-4xl uppercase mt-4">
            {user?.name}
          </h2>
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
          <div className="mt-3 shadow-md shadow-blue-400 p-2 rounded-2xl">
            <h4 className="font-bold text-xl text-blue-300 mb-2">Short Bio:</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
              debitis iste exercitationem explicabo quidem repellat quae alias
              natus in ipsum iusto dolor, sapiente unde impedit adipisci beatae
              dolore cupiditate sunt officia voluptatibus! Porro cupiditate
              expedita molestiae.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
