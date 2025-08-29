import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostHeader from "./PostHeader";
import Comment from "./Comment";
import PostBody from "./PostBody";
import PostReactions from "./PostReactions";
import PostActions from "./PostActions";
import CreateComment from "./CreateComment";
import { Button } from "@heroui/react";
import DropdownActions from "./DropdownActions";
import { isLoginContext } from "../../contexts/IsLoginContext";
import useHelpers from "../../hooks/useHelpers";

export default function Post({
  post,
  setPost,
  // posts,
  // setPosts,
  commentsNum = 0,
  isNavigate,
  getSinglePost,
  setChoosePost,
  number,
  isOpen,
  onOpen,
  onOpenChange,
  setIsPost,
  setCurrentComment,
  onOpenPostModal,
  style,
  onOpenCreatePost,
  setIsCreate,
  inProfilePage = false,
}) {
  const [visibleComments, setVisibleComments] = useState(5);
  const { user } = useContext(isLoginContext);
  const { handleVisibleComments, createdAt } = useHelpers();

  useEffect(() => {
    setVisibleComments(commentsNum);
  }, []);

  return (
    <>
      <div
        className={`w-full bg-white dark:bg-post-dark shadow-sm rounded-md ${style}`}
      >
        <div className="posts-profile flex justify-between p-4">
          <PostHeader
            post={post}
            photo={post.user?.photo}
            name={post.user?.name}
            time={createdAt(post.createdAt)}
          />
          <DropdownActions
            isUser={user?._id == post.user._id}
            post={post}
            inFeed={isNavigate}
            // posts={posts}
            // setPosts={setPosts}
            isPost={true}
            setPost={setPost}
            isOpen={isOpen}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
            setIsPost={setIsPost}
            isNavigate={isNavigate}
            onOpenCreatePost={onOpenCreatePost}
            setIsCreate={setIsCreate && setIsCreate}
          />
        </div>

        <Link
          to={isNavigate && !inProfilePage && `post-details/${post.id}`}
          className=""
        >
          <PostBody body={post.body} image={post.image} />
        </Link>

        <PostReactions commentsNum={post.comments.length} />

        <PostActions
          id={post.id}
          isNavigate={isNavigate}
          handelOpenModal={onOpenPostModal}
          setChoosePost={setChoosePost}
          number={number}
          setPost={setPost}
          post={post}
        />

        <div
          className={`comments-box max-h-72 ${
            style ? "overflow-visible" : "overflow-auto"
          } `}
        >
          {post.comments
            .toReversed()
            .slice(0, visibleComments)
            .map((comment) => (
              <Comment
                key={comment._id}
                comment={comment}
                post={post}
                setPost={setPost}
                isUser={user?._id == post.user._id}
                getSinglePost={getSinglePost}
                setIsPost={setIsPost}
                isPost={false}
                onOpen={onOpen}
                setCurrentComment={setCurrentComment}
                isNavigate={isNavigate}
              />
            ))}
          {commentsNum != 0 && post.comments.length > visibleComments && (
            <Button
              className="mt-2 mx-auto block text-primary underline"
              variant="light"
              onPress={() =>
                handleVisibleComments(setVisibleComments, visibleComments)
              }
            >
              Show more Comments...
            </Button>
          )}
        </div>
        {visibleComments != 0 && (
          <div
            className={`create-comment ${style && "absolute bottom-0 w-full"} `}
          >
            <CreateComment
              id={post.id}
              getSinglePost={getSinglePost}
              post={post}
              setPost={setPost}
              isNavigate={isNavigate}
            />
          </div>
        )}
      </div>
    </>
  );
}
