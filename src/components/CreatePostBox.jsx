import { useContext, useEffect, useRef, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  addToast,
} from "@heroui/react";
import { isLoginContext } from "../contexts/IsLoginContext";
import { useMutation } from "@tanstack/react-query";
import useApis from "../hooks/useApis";
import useHelpers from "../hooks/useHelpers";

export default function CreatePostBox({
  title,
  getPosts,
  onClose,
  isOpen,
  oldBody,
  oldImage,
  isCreate,
  setIsCreate,
  post,
  setPost,
}) {
  const { user } = useContext(isLoginContext);

  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const inputRef = useRef(null);
  const { createPost, updatePost } = useApis();
  const { convertUrlToFile, handleUploadImage } = useHelpers();

  useEffect(() => {
    if (isCreate) {
      setBody("");
      setImage(null);
      setImagePreview("");
    } else {
      setBody(oldBody);
      if (oldImage != null) {
        setImage(convertUrlToFile(oldImage, setImage));
      }
      setImagePreview(oldImage);
    }
  }, [isCreate]);

  const { mutate: handleCreatePost, isPending: isPendingCreate } = useMutation({
    mutationFn: (e) => {
      e.preventDefault();
      if (body.trim() == "" && image == null) {
        return;
      }
      if (isCreate) {
        const formData = new FormData();
        if (body.trim() != "") {
          formData.append("body", body);
        }
        if (image != null) {
          formData.append("image", image);
        }
        return createPost(formData);
      }
    },
    onSuccess: async () => {
      await getPosts();
      handleCloseBox();
      addToast({
        title: `Post Created Successfully`,
        color: "success",
        timeout: 2000,
      });
    },
    onError: () => {
      addToast({
        title: `Failed to create post`,
        color: "danger",
        timeout: 2000,
      });
    },
  });

  const { mutate: handleUpdatingPost, isPending: isPendingUpdate } =
    useMutation({
      mutationFn: (e) => {
        e.preventDefault();
        if (body?.trim() == "" && image == null) {
          return;
        }
        if (!isCreate) {
          const formData = new FormData();
          if (body?.trim() != "") {
            formData.append("body", body);
          }
          if (image != null) {
            formData.append("image", image);
          }
          return updatePost(post._id, formData);
        }
      },
      onSuccess: async (res) => {
        await getPosts();
        if (!isCreate) {
          setPost({
            ...post,
            body: res.data.post.body && res.data.post.body,
            image: res.data.post.image && res.data.post.image,
          });
        }
        handleCloseBox();
        addToast({
          title: `Post Updated Successfully`,
          color: "success",
          timeout: 2000,
        });
      },
      onError: (err) => {
        console.log(err);

        addToast({
          title: `Failed to Update post`,
          color: "danger",
          timeout: 2000,
        });
      },
    });

  function handleCloseBox() {
    onClose();
    setBody("");
    setImage(null);
    setImagePreview("");
  }

  return (
    <>
      <Modal
        backdrop={"blur"}
        isOpen={isOpen}
        onClose={() => {
          handleCloseBox();
          setIsCreate && setIsCreate(true);
        }}
        placement="center"
        size="lg"
      >
        <ModalContent>
          {
            <>
              <ModalHeader className="flex justify-center border-b border-divider text-lg font-bold">
                {title}
              </ModalHeader>
              <ModalBody>
                <div className="photo-name flex items-center">
                  <div className="relative">
                    <div className="overflow-hidden rounded-full w-11 h-11 border-2 border-blue-500">
                      <img
                        className="object-cover w-full h-full"
                        src={user?.photo}
                        alt={user?.name}
                      />
                    </div>
                  </div>
                  <div className="name-time ms-2">
                    <span className="span1 text-lg font-bold">
                      <p>{user?.name}</p>
                    </span>
                  </div>
                </div>

                <form
                  onSubmit={isCreate ? handleCreatePost : handleUpdatingPost}
                  className="w-full"
                >
                  <div className="overflow-auto max-h-72">
                    <textarea
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      autoFocus
                      className="resize-none w-full focus:outline-0 text-2xl h-20"
                      placeholder={`What's on your mind, ${user?.name}?`}
                      id="createPost"
                    ></textarea>

                    {/* Image preview */}
                    {imagePreview && (
                      <div
                        className={`relative rounded-3xl overflow-hidden w-full`}
                      >
                        <img
                          src={imagePreview}
                          className="block mx-auto"
                          alt="Image Preview"
                        />
                        <div
                          onClick={() => {
                            setImage(null);
                            setImagePreview("");
                          }}
                          className="absolute top-4 right-4 text-danger cursor-pointer"
                        >
                          <i className="fa-regular fa-circle-xmark text-2xl"></i>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Upload Photo */}
                  <label className="mt-4 block cursor-pointer">
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) =>
                        handleUploadImage(
                          e,
                          setImage,
                          setImagePreview,
                          inputRef
                        )
                      }
                      ref={inputRef}
                    />
                    <div className="flex items-center">
                      <i
                        className="fa-solid fa-images"
                        style={{ color: "rgb(41, 192, 41)" }}
                      />
                      <p className="ms-2 font-semibold text-sm">Photo</p>
                    </div>
                  </label>
                  <Button
                    type="submit"
                    className="w-full text-lg font-semibold my-4 disabled:cursor-not-allowed"
                    isDisabled={
                      isPendingCreate ||
                      isPendingUpdate ||
                      (body?.trim() == "" && image == null)
                        ? true
                        : false
                    }
                    isLoading={isPendingCreate || isPendingUpdate}
                    color="primary"
                  >
                    {isCreate
                      ? isPendingCreate
                        ? "Posting..."
                        : "Post"
                      : isPendingUpdate
                      ? "Updating..."
                      : "Update"}
                  </Button>
                </form>
              </ModalBody>
            </>
          }
        </ModalContent>
      </Modal>
    </>
  );
}
