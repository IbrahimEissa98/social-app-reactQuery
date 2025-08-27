import { useState } from "react";
import profilePlaceholder from "../../assets/images/profile-placeholder.jpg";
import { addToast, Button, Input, Spinner } from "@heroui/react";
import useApis from "../../hooks/useApis";
import { queryClient } from "../../services/constants";
import { useMutation } from "@tanstack/react-query";

export default function CreateComment({ id, post, setPost, isNavigate }) {
  const [comment, setComment] = useState("");

  const { createComment } = useApis();

  const { mutate: handleCreateComment, isPending: isPendingCreate } =
    useMutation({
      mutationFn: (e) => {
        e.preventDefault();
        if (comment.trim().length < 2 || comment.trim().length > 30) {
          return;
        }
        return createComment({ content: comment, post: id });
      },
      onSuccess: async (response) => {
        setComment("");
        setPost({ ...post, comments: response.data.comments.reverse() });
        isNavigate
          ? await queryClient.invalidateQueries(["posts"])
          : await queryClient.invalidateQueries(["singlePost"]);

        addToast({
          title: `Comment Created Successfully`,
          color: "success",
          timeout: 2000,
        });
      },
      onError: () => {
        addToast({
          title: `Failed to create Comment`,
          color: "danger",
          timeout: 2000,
        });
      },
    });

  return (
    <div className="flex gap-3 px-4 py-3">
      <div className="image">
        <img
          onError={(e) => {
            e.target.src = profilePlaceholder;
          }}
          src={profilePlaceholder}
          className="rounded-full w-11 h-10"
          alt=""
        />
      </div>
      <div className="w-full relative">
        <form onSubmit={handleCreateComment}>
          <Input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
            className=""
            style={{ paddingRight: "80px" }}
            autoFocus={true}
            id="comment"
            isDisabled={isPendingCreate}
          />
          <Button
            type="submit"
            variant="light"
            className="absolute right-0 top-0"
            isDisabled={
              comment.trim().length < 2 ||
              comment.trim().length > 30 ||
              isPendingCreate
                ? true
                : false
            }
          >
            {isPendingCreate ? (
              <Spinner />
            ) : (
              <i
                className="fa-solid fa-paper-plane fa-rotate-by"
                style={{ transform: "rotate(45deg)" }}
              />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
