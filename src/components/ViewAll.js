import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransaction } from "../features/transaction/transactionSlice";
import Form from "./Form";
import Transaction from "./Transactions/Transaction";

const ViewAll = () => {
  const [type, setType] = useState("");

  const { transactions, isLoading, isError, error } = useSelector(
    (state) => state.transaction,
  );
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const { editing } = useSelector((state) => state.transaction);
  useEffect(() => {
    dispatch(fetchTransaction({ type, latestTransaction: "", search }));
  }, [dispatch, type, search]);
  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.search.value;
    setSearch(searchValue);
    e.target.search.value = "";
  };

  // decide to show loading or error or transactions
  let content = null;
  if (isLoading) content = <div>Loading...</div>;
  if (!isLoading && isError) content = <div className="error">{error}</div>;
  if (!isLoading && !isError && transactions.length > 0)
    content = transactions.map((t) => (
      <Transaction key={t.id} transaction={t} />
    ));
  if (!isLoading && !isError && transactions.length === 0)
    content = <div className="empty">Not transactions found!</div>;
  return (
    <>
      {editing.name && <Form />}
      <form
        style={{ margin: "20px 0" }}
        onSubmit={handleSearch}
        className="conatiner_of_list_of_transactions">
        <input
          required
          style={{ marginRight: "10px" }}
          type="search"
          name="search"
          placeholder="Search Here"
        />
        <input style={{ cursor: "pointer" }} type="submit" value={"Search"} />
      </form>
      <div
        style={{ margin: "16px 0px" }}
        className="conatiner_of_list_of_transactions form-group radio">
        <button
          style={{
            padding: "3px 4px",
            marginRight: "15px",
            cursor: "pointer",
          }}>
          Type
        </button>
        <div className="radio_group">
          <input
            style={{ cursor: "pointer" }}
            required
            type="radio"
            value="income"
            onChange={(e) => setType(e.target.value)}
            name="type"
            checked={type === "income"}
          />
          <label>Income</label>
        </div>
        <div className="radio_group">
          <input
            style={{ cursor: "pointer" }}
            required
            onChange={(e) => setType(e.target.value)}
            checked={type === "expense"}
            type="radio"
            value="expense"
            name="type"
            placeholder="Expense"
          />
          <label>Expense</label>
        </div>
      </div>
      <div className="conatiner_of_list_of_transactions">
        <ul>{content}</ul>
      </div>
    </>
  );
};

export default ViewAll;
