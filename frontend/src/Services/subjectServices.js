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

export const getAllSubject = async (semNo) => {
  try {
    const { data } = await axios.get(
      `api/subject/getAllSubject?semNo=${semNo}`,
    );
    console.log("All Subject Frontend API Hit ==> ", data);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const getASubject = async (id) => {
  try {
    console.log(id);
    const { data } = await axios.get(`api/subject/manageSubject/${id}`);
    console.log("Subject  ==> ", data);
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

export const updateSubject = async (id, NewSubjectData) => {
  try {
    console.log(id);
    const { data } = await axios.put(
      `api/subject/update/${id} `,
      NewSubjectData,
    );
    console.log("Subject delete ==> ", data);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const SemesterSubject = async (semNo) => {
  try {
    const semesterNumber = Number(semNo);
    console.log(semesterNumber);
    const { data } = await axios.get("api/subject/SemSub", {
      params: { semesterNumber },
    });
    return data;
  } catch (error) {
    console.log("Semester Subject listing error ", error);
    return error.response.data;
  }
};

export const SemesterStudent = async (id) => {
  try {
    const { data } = await axios.get(`api/subject/getStudent/${id}`);
    console.log(data);
    return data;
  } catch (error) {
    console.log("Semester Subject listing error ", error);
    return error.response.data;
  }
};
