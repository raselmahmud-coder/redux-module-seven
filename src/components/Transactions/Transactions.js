import Transaction from "./Transaction";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { useEffect } from "react";
import { fetchTransaction } from "../../features/transaction/transactionSlice";
import { useNavigate } from "react-router-dom";

export default function Transactions() {
  const { transactions, isLoading, isError, error } = useSelector(
    (state) => state.transaction,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchTransaction());
  }, [dispatch]);
  const handleNavigate = () => {
    navigate("/view-all");
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
      <p className="second_heading">Your Transactions:</p>

      <div className="conatiner_of_list_of_transactions">
        <ul>
          {content}
          {transactions.length > 5 && (
            <button className="btn" onClick={handleNavigate}>
              View All
            </button>
          )}
        </ul>
      </div>
    </>
  );
}
