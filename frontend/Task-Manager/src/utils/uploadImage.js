import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
  const formatData = new FormData();
  // Append image file to form FormData
  formatData.append("image", imageFile);

  try {
    const response = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE,
      formatData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Set header for file upload
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading the image", error);
    throw error;
  }
};

export default uploadImage;
