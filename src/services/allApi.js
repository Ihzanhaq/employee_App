import axiosConfig from "./axiosConfig";

const apiUrl = "https://employee-backend-5fes.onrender.com/employee/";

export const getEmployee = async () => {
  return await axiosConfig("get", apiUrl, "");
};

export const postEmployee = async (reqBody) => {
  return await axiosConfig("post", apiUrl, reqBody);
};

export const deleteEmployee = async (id) => {
  return await axiosConfig("delete", apiUrl + id, "");
};

export const editEmployee = async (id, reqBody) => {
  return await axiosConfig("patch", apiUrl + id, reqBody);
};
