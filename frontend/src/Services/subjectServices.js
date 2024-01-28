import axios from "axios";

export const addSubject = async (subjectData) => {
  try {
    const { data } = await axios.post("api/subject/addSubject", subjectData);
    console.log("Add Subject Frontend API Hit ==> ", data);
    return data;
  } catch (error) {
    return error.response.data;
  }
};
