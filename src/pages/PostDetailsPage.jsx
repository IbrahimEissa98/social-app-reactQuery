import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Post from "../components/postComponents/Post";
import IsLoadingPost from "../components/IsLoadingPost";
import { useDisclosure } from "@heroui/modal";
import { isLoginContext } from "../contexts/IsLoginContext";
import DeleteModal from "../components/postComponents/DeleteModal";
import { useMutation, useQuery } from "@tanstack/react-query";
import useApis from "../hooks/useApis";
import { queryClient } from "../services/constants";
import { addToast } from "@heroui/toast";
import CreatePostBox from "../components/CreatePostBox";

export default function PostDetailsPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isPost, setIsPost] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentComment, setCurrentComment] = useState(null);
  const [isCreate, setIsCreate] = useState(true);
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    isOpen: isOpenCreatePost,
    onOpen: onOpenCreatePost,
    onClose: onCloseCreatePost,
  } = useDisclosure();
  const { user } = useContext(isLoginContext);
  const { getSinglePost, deletePost, deleteComment } = useApis();

  const { data, isError } = useQuery({
    queryKey: ["singlePost"],
    queryFn: () => getSinglePost(id),
    gcTime: 2000,
    select: (data) => data?.data.post,
    retry: 3,
  });

  if (isError) {
    addToast({
      title: `Post Not Found`,
      description: `This Post was deleted or does not exist`,
      color: "danger",
    });
    navigate("/");
  }

  const { mutate: handleDeletePost } = useMutation({
    mutationFn: () => {
      if (user._id != post.user._id) {
        return;
      }
      setIsDeleting(true);
      return deletePost(post.id);
    },
    onSuccess: async () => {
      navigate("/");
      setIsDeleting(false);
      onClose();
      addToast({
        title: `Post Deleted Successfully`,
        color: "success",
        timeout: 2000,
      });
    },
    onError: () => {
      setIsDeleting(false);
      addToast({
        title: `Failed to delete post`,
        color: "danger",
        timeout: 2000,
      });
    },
  });

  const { mutate: handleDeleteComment } = useMutation({
    mutationFn: () => {
      if (
        user._id != post.user._id &&
        user._id != currentComment.commentCreator._id
      ) {
        return;
      }
      setIsDeleting(true);
      return deleteComment(currentComment._id);
    },
    onSuccess: async () => {
      let comments = structuredClone(post.comments);
      let currentCommentId = currentComment._id;
      comments = comments.filter((comment) => {
        return comment._id == currentCommentId ? null : comment;
      });
      setPost({ ...post, comments: comments.reverse() });
      setIsDeleting(false);
      onClose();
      addToast({
        title: `Comment Deleted Successfully`,
        color: "success",
        timeout: 2000,
      });
    },
    onError: () => {
      setIsDeleting(false);
      onClose();
      addToast({
        title: `Failed to delete Comment`,
        color: "danger",
        timeout: 2000,
      });
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    setPost(data);
  }, [data]);

  return (
    <>
      {!post ? (
        <IsLoadingPost />
      ) : (
        <Post
          post={post}
          commentsNum={5}
          isNavigate={false}
          setPost={setPost}
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
          onOpenCreatePost={onOpenCreatePost}
          setIsPost={setIsPost}
          setCurrentComment={setCurrentComment}
          setIsCreate={setIsCreate}
        />
      )}
      <DeleteModal
        title={isPost ? "post" : "Comment"}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        handelDeleting={isPost ? handleDeletePost : handleDeleteComment}
        isDeleting={isDeleting}
        isNavigate={false}
      />
      <CreatePostBox
        title={"Edit Post"}
        getPosts={() => queryClient.invalidateQueries(["singlePost"])}
        isOpen={isOpenCreatePost}
        onClose={onCloseCreatePost}
        oldBody={post?.body && post.body}
        oldImage={post?.image ? post.image : null}
        isCreate={isCreate}
        setIsCreate={setIsCreate}
        post={post}
        setPost={setPost}
      />
    </>
  );
}
