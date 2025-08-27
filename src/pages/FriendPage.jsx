import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useApis from "../hooks/useApis";
import FriendInfoCard from "../components/FriendInfoCard";
import { addToast } from "@heroui/toast";
import LoadingComponent from "../components/LoadingComponent";

export default function FriendPage() {
  const { postId } = useParams();
  const { getSinglePost } = useApis();
  const navigate = useNavigate();

  const {
    data: user,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["friendInfo", postId],
    queryFn: () => getSinglePost(postId),
    gcTime: 10000,
    select: (data) => data?.data.post.user,
    retry: 3,
  });

  if (isError) {
    addToast({
      title: `Friend Not Found`,
      description: `This user was deleted or does not exist! Try again`,
      color: "danger",
    });
    navigate("/");
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingComponent title={"friend"} />
      ) : (
        <FriendInfoCard user={user} />
      )}
    </>
  );
}
