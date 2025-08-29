import axios from "axios";

const baseUrl = "https://linked-posts.routemisr.com/";

export default function useApis() {
  // getAllPosts
  function getAllPosts({ pageParam = 1 }) {
    return axios.get(baseUrl + "posts/", {
      headers: {
        token: localStorage.getItem("token"),
      },
      params: {
        sort: "-createdAt",
        limit: 20,
        page: pageParam,
      },
    });
  }

  // getSinglePost
  function getSinglePost(id) {
    return axios.get(baseUrl + "posts/" + id, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
  }

  // createPost
  function createPost(formData) {
    return axios.post(baseUrl + "posts/", formData, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
  }

  // UpdatePost
  function updatePost(postId, formData) {
    return axios.put(baseUrl + "posts/" + postId, formData, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
  }

  // DeletePost
  function deletePost(postId) {
    return axios.delete(baseUrl + "posts/" + postId, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
  }

  // createComment
  function createComment(CommentData) {
    return axios.post(baseUrl + "comments", CommentData, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
  }

  // UpdateComment
  function updateComment(commentId, newContent) {
    return axios.put(baseUrl + "comments/" + commentId, newContent, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
  }

  // DeleteComment
  function deleteComment(commentId) {
    return axios.delete(baseUrl + "comments/" + commentId, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
  }

  // userPosts
  function userPosts(userId) {
    return axios.get(baseUrl + "users/" + userId + "/posts", {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
  }

  // return object
  const apiMethods = {
    getSinglePost,
    getAllPosts,
    createPost,
    updatePost,
    deletePost,
    createComment,
    updateComment,
    deleteComment,
    userPosts,
  };

  return apiMethods;
}
