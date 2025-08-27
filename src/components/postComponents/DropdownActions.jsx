import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import useHelpers from "../../hooks/useHelpers";

export default function DropdownActions({
  isUser,
  post,
  isPost,
  style,
  setIsInUpdateMode,
  setPost,
  onOpen,
  setIsPost,
  setCurrentComment,
  comment,
  onOpenCreatePost,
  setIsCreate,
  setNewContent,
}) {
  const { copyToClipboard } = useHelpers();

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Button
            variant="light"
            className="cancel flex gap-4 items-center cursor-pointer p-0 min-w-fit h-8 w-8 rounded-full"
          >
            <i className={`fa-solid fa-ellipsis text-xl ${style}`} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          {isPost && (
            <DropdownItem
              onPress={() => {
                copyToClipboard(post.id);
              }}
              key="copy"
              textValue="Copy Link"
            >
              <i className="fa-solid fa-clipboard me-2"></i>
              <span>Copy Link</span>
            </DropdownItem>
          )}
          {isUser && (
            <>
              {isPost ? (
                <DropdownItem
                  key="edit"
                  onPress={() => {
                    setIsCreate(false);
                    setPost(post);
                    onOpenCreatePost();
                  }}
                  textValue="Edit Post"
                >
                  <i className="fa-solid fa-pen-to-square me-2"></i>
                  <span>Edit Post</span>
                </DropdownItem>
              ) : (
                <DropdownItem
                  key="edit"
                  onPress={() => {
                    setIsInUpdateMode(true);
                    setNewContent(comment.content);
                  }}
                  textValue="Edit Comment"
                >
                  <i className="fa-solid fa-pen-to-square me-2"></i>
                  <span>Edit Comment</span>
                </DropdownItem>
              )}
              <DropdownItem
                // onPress={handelDeleting}
                onPress={() => {
                  if (isPost) {
                    setPost(post);
                    setIsPost(true);
                  } else {
                    setCurrentComment(comment);
                    setIsPost(false);
                  }
                  onOpen();
                }}
                key="delete"
                className="text-danger"
                color="danger"
                textValue="Delete"
              >
                <i className="fa-solid fa-trash-can me-2"></i>
                <span>Delete {isPost ? "Post" : "Comment"}</span>
              </DropdownItem>
            </>
          )}
        </DropdownMenu>
      </Dropdown>
    </>
  );
}
