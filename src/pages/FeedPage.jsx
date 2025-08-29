import React, { useContext, useEffect, useState } from "react";
import CreatePost from "../components/CreatePost";
import Post from "../components/postComponents/Post";
import { isLoginContext } from "../contexts/IsLoginContext";
import IsLoadingPost from "../components/IsLoadingPost";
import CreatePostBox from "../components/CreatePostBox";
import PostModal from "../components/postComponents/PostModal";
import DeleteModal from "../components/postComponents/DeleteModal";
import { useDisclosure } from "@heroui/modal";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { addToast, Button, Spinner } from "@heroui/react";
import useApis from "../hooks/useApis";
import { queryClient } from "../services/constants";
import { useInView } from "react-intersection-observer";

export default function FeedPage() {
  const [post, setPost] = useState(null);
  const [isPost, setIsPost] = useState(false);
  const [isCreate, setIsCreate] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentComment, setCurrentComment] = useState(null);
  const { setIsLogin } = useContext(isLoginContext);
  const { user } = useContext(isLoginContext);
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onOpenChange: onOpenChangeDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const {
    isOpen: isOpenCreatePost,
    onOpen: onOpenCreatePost,
    onClose: onCloseCreatePost,
  } = useDisclosure();
  const {
    isOpen: isOpenPostModal,
    onOpen: onOpenPostModal,
    onClose: onClosePostModal,
  } = useDisclosure();

  const { getAllPosts, deletePost, deleteComment } = useApis();

  // const {
  //   data: queryPosts,
  //   isFetching,
  //   isLoading,
  //   isError,
  //   error,
  // } = useQuery({
  //   queryKey: ["posts"],
  //   queryFn: () => getAllPosts(page),
  //   retry: 3,
  //   select: (data) => data?.data.posts,
  // });

  const [ref, inView] = useInView();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isFetchingNextPage,
    isError,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: getAllPosts,
    getNextPageParam: (lastPage) => lastPage.data.paginationInfo.nextPage,
  });

  if (isError) {
    if (error.message == "Network Error") {
      addToast({
        title: `Network Error`,
      });
    } else {
      console.log(error);
      localStorage.removeItem("token");
      setIsLogin(false);
      addToast({
        title: `Invalid Token, Try to login again`,
      });
    }
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
      await queryClient.invalidateQueries(["posts"]);
      setIsDeleting(false);
      onCloseDelete();
      onClosePostModal();
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
      await queryClient.invalidateQueries(["posts"]);
      setIsDeleting(false);
      onCloseDelete();
      addToast({
        title: `Comment Deleted Successfully`,
        color: "success",
        timeout: 2000,
      });
    },
    onError: () => {
      setIsDeleting(false);
      onCloseDelete();
      addToast({
        title: `Failed to delete Comment`,
        color: "danger",
        timeout: 2000,
      });
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  useEffect(() => {
    return () => {
      queryClient.setQueryData(["posts"], (data) => ({
        pages: data.pages.slice(0, 1),
        pageParams: data.pageParams.slice(0, 1),
      }));
    };
  }, []);

  return (
    <>
      <div className="grid gap-2 pb-0 w-full! relative">
        {isLoading ? (
          <>
            <IsLoadingPost />
            <IsLoadingPost />
          </>
        ) : (
          <>
            {isFetching && !isFetchingNextPage && (
              <div className="fixed flex justify-center items-center top-20 left-1/2 z-10 -translate-x-1/2 bg-gray-300 dark:bg-slate-700 rounded-2xl px-10 py-2">
                <p className="px-2 animate-blink">Updating</p>
                <Spinner
                  classNames={{ wrapper: "translate-y-2/4" }}
                  variant="wave"
                  size="md"
                />
              </div>
            )}
            <CreatePost
              handleOpen={onOpenCreatePost}
              setIsCreate={setIsCreate}
            />
            {data.pages.map((page, pageNum) => (
              <React.Fragment key={pageNum}>
                {page.data.posts.map((post, index) => (
                  <React.Fragment key={index}>
                    <Post
                      key={post.id}
                      number={index}
                      post={post}
                      commentsNum={0}
                      isNavigate={true}
                      setPost={setPost}
                      isOpen={isOpenDelete}
                      onOpen={onOpenDelete}
                      onOpenChange={onOpenChangeDelete}
                      setIsPost={setIsPost}
                      onOpenPostModal={onOpenPostModal}
                      onOpenCreatePost={onOpenCreatePost}
                      setIsCreate={setIsCreate}
                    />
                    {data.pages.length - 1 == pageNum &&
                      index == page.data.posts.length - 5 &&
                      hasNextPage && <button ref={ref}></button>}
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
            {hasNextPage && <IsLoadingPost />}
          </>
        )}
        <DeleteModal
          title={isPost ? "post" : "Comment"}
          isOpen={isOpenDelete}
          onOpenChange={onOpenChangeDelete}
          handelDeleting={isPost ? handleDeletePost : handleDeleteComment}
          isDeleting={isDeleting}
        />
        <CreatePostBox
          title={!isCreate ? "Edit Post" : "Create Post"}
          getPosts={() => queryClient.invalidateQueries(["posts"])}
          isOpen={isOpenCreatePost}
          onClose={onCloseCreatePost}
          oldBody={post?.body && post.body}
          oldImage={post?.image ? post.image : null}
          isCreate={isCreate}
          setIsCreate={setIsCreate}
          post={post}
          setPost={setPost}
        />

        {data?.pages[0]?.data.posts && (
          <PostModal
            post={post}
            isOpenModal={isOpenPostModal}
            onCloseModal={onClosePostModal}
            setPost={setPost}
            isOpen={isOpenDelete}
            onOpen={onOpenDelete}
            onOpenChange={onOpenChangeDelete}
            setIsPost={setIsPost}
            setCurrentComment={setCurrentComment}
            isNavigate={true}
            isCreate={isCreate}
            setIsCreate={setIsCreate}
            onOpenCreatePost={onOpenCreatePost}
          />
        )}
      </div>
    </>
  );
}
