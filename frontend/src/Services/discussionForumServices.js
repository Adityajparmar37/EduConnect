import axios from "axios";

export const MySubject = async (semesterNumber) => {
  try {
    // console.log(semesterNumber);
    const { data } = await axios.get("api/discussionForum/getSub", {
      params: { semesterNumber },
    });
    return data;
  } catch (error) {
    console.log("Semester Subject listing error ", error);
    return error.response.data;
  }
};
