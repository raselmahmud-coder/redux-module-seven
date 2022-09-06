import axios from "../../utils/axios";

export const getTransactions = async (type, latestTransaction, search) => {
  let searchValue = "";
  if (search) searchValue = type ? `&name_like=${search}`: `?name_like=${search}`;
  let latest = "";
  if (latestTransaction) latest = `${latestTransaction}`;
  let filter = "";
  if (type) filter = `?type=${type}`;
  const { data } = await axios.get(`/transactions${latest}${filter}${searchValue}`);
  // const response = await axios.get("/transactions");
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
