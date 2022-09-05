import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTransaction } from "../features/transaction/transactionSlice";

export default function Form() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const dispatch = useDispatch();
  const { isError, isLoading, error } = useSelector(
    (state) => state.transaction,
  );
  const reset = () => {
    setName("");
    setType("");
    setAmount("");
  };
  const handleCreate = (e) => {
    e.preventDefault();
    dispatch(createTransaction({ name, type, amount: +amount }));
    reset();
  };
  return (
    <div className="form">
      <h3>Add new transaction</h3>

      <form onSubmit={handleCreate}>
        <div className="form-group">
          <label>Name</label>
          <input
            required
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
            name="name"
            placeholder="My Salary"
          />
        </div>

        <div className="form-group radio">
          <label>Type</label>
          <div className="radio_group">
            <input
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

        <div className="form-group">
          <label>Amount</label>
          <input
            required
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="300"
            name="amount"
          />
        </div>

        <button className="btn" type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Add Transaction"}
        </button>
        {isError && <p className="error">{error}</p>}
      </form>

      <button className="btn cancel_edit">Cancel Edit</button>
    </div>
  );
}
