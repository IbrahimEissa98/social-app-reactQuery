import axios from "axios";

const baseUrl = "https://linked-posts.routemisr.com/";

export default function usePostApis() {
  function createPost(formData) {
    return axios.post(baseUrl + "posts/", formData, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
  }

  function createComment(CommentData) {
    return axios.post(baseUrl + "comments", CommentData, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
  }

  const getFunctions = {
    createPost,
    createComment,
  };

  return getFunctions;
}
