import { addToast } from "@heroui/toast";
import React from "react";

export default function useHelpers() {
  // createdAt (time)
  function createdAt(time) {
    const date = new Date(time);
    return (
      date.getDate() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getFullYear() +
      ", " +
      date.toLocaleTimeString()
    );
  }

  // handleVisibleComments
  function handleVisibleComments(setVisibleComments, visibleComments) {
    setVisibleComments(visibleComments + 5);
  }

  // copyToClipboard
  function copyToClipboard(postId) {
    navigator.clipboard.writeText(location.origin + "/post-details/" + postId);
    addToast({
      title: `Link Copied to Clipboard successfully`,
      color: "success",
    });
  }

  // handleUploadImage
  function handleUploadImage(e, setImage, setImagePreview, inputRef) {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
      inputRef.current.value = "";
    }
  }

  // convertUrlToFile
  function convertUrlToFile(url, setImage) {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const file = new File([blob], "image.jpg", { type: blob.type });
        setImage(file);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // handleLikes
  function handleLikes(setLikes) {
    setLikes(Math.floor(Math.random() * 20));
  }

  // Return Methods
  return {
    createdAt,
    handleVisibleComments,
    copyToClipboard,
    handleUploadImage,
    convertUrlToFile,
    handleLikes,
  };
}
