import Transaction from "./Transaction";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { useEffect } from "react";
import { fetchTransaction } from "../../features/transaction/transactionSlice";

export default function Transactions() {
  const { transactions, isLoading, isError, error } = useSelector(
    (state) => state.transaction,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTransaction());
  }, [dispatch]);

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
        <ul>{content}</ul>
      </div>
    </>
  );
}
