import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();
export const baseUrl = "https://linked-posts.routemisr.com/";

export const API_ENDPOINTS = {
  posts: "posts",
  singlePost: (postId) => `posts/${postId}`,
  createPost: "posts/",
  deletePost: (postId) => `posts/${postId}`,
  updatePost: (postId) => `posts/${postId}`,
  comments: (postId) => `posts/${postId}/comments`,
  deleteComment: (postId, commentId) => `posts/${postId}/comments/${commentId}`,
};
export const AUTH_ENDPOINTS = {
  login: "auth/login",
  register: "auth/register",
  userProfile: "auth/profile",
};
export const getToken = localStorage.getItem("token");
