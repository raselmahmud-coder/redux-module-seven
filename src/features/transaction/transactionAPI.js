import axios from "../../utils/axios";

export const getTransactions = async (type) => {
  let filter = "";
  if (type) filter = `?type=${type}`;
  const { data } = await axios.get(`/transactions${filter}`);
  // const response = await axios.get("/transactions");
  console.log(data);
  return data;
};

export const addTransaction = async (data) => {
  const response = await axios.post("/transactions", data);

  return response.data;
};

export const editTransaction = async (id, data) => {
  const response = await axios.put(`/transactions/${id}`, data);

  return response.data;
};

export const deleteTransaction = async (id) => {
  const response = axios.delete(`/transactions/${id}`);

  return response.data;
};
