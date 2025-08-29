import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";
import Post from "./Post";

export default function PostModal({
  post,
  isOpenModal,
  onOpen,
  onCloseModal,
  setPost,
  isOpen,
  onOpenChange,
  setIsPost,
  setCurrentComment,
  setIsCreate,
  onOpenCreatePost,
}) {
  return (
    <>
      <Modal
        backdrop={"blur"}
        isOpen={isOpenModal}
        onClose={() => {
          onCloseModal();
        }}
        placement="center"
        size="xl"
      >
        <ModalContent>
          {
            <>
              <ModalHeader className="flex justify-center border-b border-divider text-lg font-bold">
                {post?.user.name}'s Post
              </ModalHeader>
              <ModalBody className="px-0! py-0! pb-16!">
                <Post
                  post={post}
                  commentsNum={5}
                  isNavigate={true}
                  setPost={setPost}
                  isOpen={isOpen}
                  onOpen={onOpen}
                  onOpenChange={onOpenChange}
                  setIsPost={setIsPost}
                  isPost={true}
                  setCurrentComment={setCurrentComment}
                  setIsCreate={setIsCreate}
                  onOpenCreatePost={onOpenCreatePost}
                  style={"min-h-80 max-h-96 overflow-auto"}
                />
              </ModalBody>
            </>
          }
        </ModalContent>
      </Modal>
    </>
  );
}
