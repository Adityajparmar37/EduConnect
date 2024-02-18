import axios from "axios";

export const updateProfile = async (formData) => {
  try {
    console.log(formData);
    const { data } = await axios.put("api/profile/update", formData);
    console.log("Update data API Hit ==> ", data);
    return data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
