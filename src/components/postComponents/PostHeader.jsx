import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isLoginContext } from "../../contexts/IsLoginContext";

export default function PostHeader({ post, photo, name, time }) {
  const [isOnline, setIsOnline] = useState(false);
  const { user } = useContext(isLoginContext);

  useEffect(() => {
    if (post?.user._id == user._id) {
      setIsOnline(true);
    } else {
      setIsOnline(Math.floor(Math.random() * 10) % 2 == 0);
    }
  }, []);

  return (
    <div className="photo-name flex items-center">
      <Link
        to={post?.user._id == user._id ? `/profile` : `/friend/${post?._id}`}
        className="relative"
      >
        <div
          className="overflow-hidden rounded-full w-11 h-11 border-2 border-blue-500"
          // to={`/profile/${post.user._id}`}
        >
          <img className="object-cover w-full h-full" src={photo} alt={name} />
        </div>
        {isOnline && (
          <span className="absolute w-3 h-3 right-0 bottom-0 bg-green-500 rounded-full z-10"></span>
        )}
      </Link>
      <div className="name-time ms-2">
        <span className="span1 text-lg font-bold">
          <p>{name}</p>
        </span>
        <span className="span2 flex items-center text-gray-500 text-xs">
          <p className="">{time}</p>
        </span>
      </div>
    </div>
  );
}
