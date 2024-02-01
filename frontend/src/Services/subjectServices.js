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

export const getAllSubject = async () => {
  try {
    const { data } = await axios.get("api/subject/getAllSubject");
    console.log("All Subject Frontend API Hit ==> ", data);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteSubject = async (id) => {
  try {
    console.log(id);
    const { data } = await axios.delete(`api/subject/delete/${id} `);
    console.log("Subject delete ==> ", data);
    return data;
  } catch (error) {
    return error.response.data;
  }
};
