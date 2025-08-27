import { useContext, useEffect, useState } from "react";
import profilePlaceholder from "../../assets/images/profile-placeholder.jpg";
import DropdownActions from "./DropdownActions";
import { addToast, Button, Input, Spinner } from "@heroui/react";
import useHelpers from "../../hooks/useHelpers";
import { useMutation } from "@tanstack/react-query";
import useApis from "../../hooks/useApis";
import { isLoginContext } from "../../contexts/IsLoginContext";
import { queryClient } from "../../services/constants";

export default function Comment({
  comment,
  post,
  setPost,
  isUser,
  isDeleting,
  setIsPost,
  onOpen,
  setCurrentComment,
  isNavigate,
}) {
  const [likes, setLikes] = useState(0);
  const { user } = useContext(isLoginContext);
  const [isInUpdateMode, setIsInUpdateMode] = useState(false);
  const [newContent, setNewContent] = useState(comment.content);

  const { createdAt, handleLikes } = useHelpers();
  const { updateComment } = useApis();

  useEffect(() => {
    handleLikes(setLikes);
  }, []);

  const { mutate: handelUpdatingComment, isPending: isPendingUpdateComment } =
    useMutation({
      mutationFn: (e) => {
        e.preventDefault();
        if (
          user._id != post.user._id &&
          user._id != comment.commentCreator._id
        ) {
          return;
        }
        if (newContent.trim().length < 2 || newContent.trim().length > 30) {
          return;
        }
        return updateComment(comment._id, {
          content: newContent,
        });
      },
      onSuccess: async (res) => {
        console.log(res);

        let comments = structuredClone(post.comments);
        comments = comments.map((comment) => {
          return comment._id == res.data.comment._id
            ? res.data.comment
            : comment;
        });
        setPost({ ...post, comments: comments });
        isNavigate
          ? await queryClient.invalidateQueries(["posts"])
          : await queryClient.invalidateQueries(["singlePost"]);

        addToast({
          title: `Comment Updated Successfully`,
          color: "success",
        });
        setIsInUpdateMode(false);
      },
      onError: () => {
        addToast({
          title: `Error`,
          description: "Your comment not updated",
          color: "danger",
          loadingComponent: "true",
        });
      },
    });

  return (
    <div className="flex gap-3 px-4 py-1.5 group">
      <div className="image">
        <img
          onError={(e) => {
            e.target.src = profilePlaceholder;
          }}
          src={comment.commentCreator.photo}
          className="rounded-full w-11 h-10"
          alt=""
        />
      </div>
      <div className="content min-w-52">
        <div className="p-2 rounded-2xl bg-gray-100 dark:bg-base-dark">
          <p className="mb-0 font-bold">{comment.commentCreator.name}</p>
          {isInUpdateMode ? (
            <div className="min-w-80 relative">
              <form
                onSubmit={(e) => {
                  handelUpdatingComment(e, comment);
                }}
              >
                <Input
                  type="text"
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Write updated comment..."
                  className=""
                  style={{ paddingRight: "50px" }}
                  autoFocus={true}
                  id="comment"
                  variant="bordered"
                  isDisabled={isPendingUpdateComment}
                />
                <Button
                  type="submit"
                  variant="light"
                  className="absolute right-0 top-0 min-w-fit"
                  isDisabled={
                    newContent.trim().length < 2 ||
                    newContent.trim().length > 30 ||
                    isPendingUpdateComment
                      ? true
                      : false
                  }
                >
                  {isPendingUpdateComment ? (
                    <Spinner />
                  ) : (
                    <i
                      className="fa-solid fa-paper-plane fa-rotate-by"
                      style={{ transform: "rotate(45deg)" }}
                    />
                  )}
                </Button>
              </form>
              {!isPendingUpdateComment && (
                <p
                  onClick={() => {
                    setIsInUpdateMode(false);
                    setNewContent(comment.content);
                  }}
                  className="text-primary text-sm ms-3 cursor-pointer hover:underline"
                >
                  Cancel
                </p>
              )}
            </div>
          ) : (
            <p className="text-medium">{comment.content}</p>
          )}
        </div>
        {!isInUpdateMode && (
          <div className="flex justify-between">
            <p className="text-gray-400 text-sm">
              {createdAt(comment.createdAt)}
            </p>
            <div className="flex">
              {likes != 0 && (
                <>
                  <span className="text-sm">{likes}</span>
                  <span className="bg-blue-700 w-5 h-5 flex justify-center items-center rounded-full ml-1">
                    <i className="fa-solid fa-thumbs-up text-white text-sm" />
                  </span>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      {post.user._id == comment.commentCreator._id &&
        isUser &&
        !isInUpdateMode && (
          <div className="self-center">
            <DropdownActions
              isUser={isUser}
              post={post}
              setPost={setPost}
              onOpen={onOpen}
              isDeleting={isDeleting}
              isPost={false}
              style={"text-gray-500 dark:text-gray-400 text-lg!"}
              setIsInUpdateMode={setIsInUpdateMode}
              setIsPost={setIsPost}
              setCurrentComment={setCurrentComment}
              comment={comment}
              setNewContent={setNewContent}
            />
          </div>
        )}
    </div>
  );
}
