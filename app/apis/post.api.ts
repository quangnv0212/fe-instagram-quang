import AsyncStorage from "@react-native-async-storage/async-storage";
import http from "../utils/http";
const URL_CREATE_POST = "createPost";
const URL_GET_ALL_POSTS = "getAllPosts";
const URL_UPLOAD_IMAGES = "getAllPosts";
import axios from "axios";

export const createPost = async (body: {
  type: string | null;
  background: string;
  text: string;
  images?: string[];
  user: string | null;
}) => {
  const token = await AsyncStorage.getItem("token");
  return http.post(URL_CREATE_POST, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
export const likePost = async (postId: string) => {
  const token = await AsyncStorage.getItem("token");
  return http.put(
    "reactPost",
    {
      postId,
      react: "like",
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const commentPost = async (body: {
  comment: string;
  image: string;
  postId: string;
}) => {
  const token = await AsyncStorage.getItem("token");
  return http.put("comment", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getReacts = async (postId: string) => {
  const token = await AsyncStorage.getItem("token");

  try {
    const { data } = await http.get(`getReacts/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error: any) {
    return error.response.data.message;
  }
};
export const getAllPosts = async () => {
  const token = await AsyncStorage.getItem("token");
  return http.get(URL_GET_ALL_POSTS, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getAllPublicPost = async () => {
  return http.get("getAllPublicPost");
};

export const getPostDetails = async (postId: string) => {
  const token = await AsyncStorage.getItem("token");

  const { data } = await http.get(`getDetailPost/?postId=${postId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
export const uploadImages = async (image: any) => {
  const username = await AsyncStorage.getItem("username");
  const token = await AsyncStorage.getItem("token");
  const formData = new FormData();
  formData.append("image", {
    uri: image,
    name: "image.jpg",
    type: "image/jpg",
  });
  formData.append("path", `${username}/post_images`);
  return http.post("uploadImages", formData, {
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};
