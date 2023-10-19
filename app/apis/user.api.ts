import AsyncStorage from "@react-native-async-storage/async-storage";
import http from "../utils/http";
import axios from "axios";

export const updateProfile = async (body: {
  bio?: string;
  otherName?: string;
  job?: string;
  workplace?: string;
  highSchool?: string;
  college?: string;
  currentCity?: string;
  hometown?: string;
  relationship?: string;
  instagram?: string;
}) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const { data } = await http.put(
      "updateDetails",
      { infos: body },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error: any) {
    return error.response.data.message;
  }
};
export const updateProfilePicture = async (body: { url: string }) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const { data } = await http.put("updateProfilePicture", body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error: any) {
    return error.response.data.message;
  }
};
export const getProfile = async (username: string) => {
  const token = await AsyncStorage.getItem("token");
  try {
    const { data } = await http.get(`getProfile/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error: any) {
    return error.response.data.message;
  }
};
export const getAllUser = async () => {
  try {
    const { data } = await http.get("getAllUser");
    return data;
  } catch (error: any) {
    return error.response.data.message;
  }
};
export const follow = async (id: string) => {
  const token = await AsyncStorage.getItem("token");
  try {
    const { data } = await http.put(`follow/${id}`, undefined, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error: any) {
    return error.response.data.message;
  }
};
export const unfollow = async (id: string) => {
  try {
    const token = await AsyncStorage.getItem("token");

    const { data } = await http.put(`unfollow/${id}`, undefined, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error: any) {
    return error.response.data.message;
  }
};

export const getConversation = async (receiver_id: string) => {
  const token = await AsyncStorage.getItem("token");
  try {
    const { data } = await http.get(`receivers/${receiver_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error: any) {
    return error.response.data.message;
  }
};
