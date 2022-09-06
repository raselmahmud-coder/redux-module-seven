import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeTransaction,
  createTransaction,
} from "../features/transaction/transactionSlice";

export default function Form() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const { isError, isLoading, error } = useSelector(
    (state) => state.transaction,
  );
  const { editing } = useSelector((state) => state.transaction);
  useEffect(() => {
    const { name, type, amount } = editing || {};
    if (name) {
      setName(name);
      setType(type);
      setAmount(amount);
      setEditMode(true);
    } else {
      reset();
      setEditMode(false);
    }
  }, [editing]);
  const handleCancelMode = () => {
    setEditMode(false);
    reset();
  };
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
  const handleEdit = (e) => {
    e.preventDefault();
    dispatch(
      changeTransaction({
        id: editing.id,
        data: { name, type, amount: +amount },
      }),
    );
    setEditMode(false);
    reset();
  };
  return (
    <div className="form">
      <h3>Add new transaction</h3>

      <form onSubmit={editMode ? handleEdit : handleCreate}>
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
          {isLoading && "Loading..."}
          {editMode ? "Edit Transaction" : "Add Transaction"}
        </button>
        {isError && <p className="error">{error}</p>}
      </form>

      {editMode && (
        <button onClick={handleCancelMode} className="btn cancel_edit">
          Cancel Edit
        </button>
      )}
    </div>
  );
}
