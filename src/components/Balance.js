import { useSelector } from "react-redux/es/exports";
import comaSeparator from "../utils/comaSeperator";
export default function Balance() {
  const { transactions } = useSelector((state) => state.transaction);
  const calculateIncome = () => {
    let income = 0;
    transactions.forEach((t) => {
      if (t.type === "income") income += t.amount;
    });
    return income;
  };
  const calculateExpense = () => {
    let expense = 0;
    transactions.forEach((t) => {
      if (t.type === "expense") expense += t.amount;
    });
    return expense;
  };
  const calculateBalance = () => {
    return calculateIncome() - calculateExpense();
  };

  return (
    <div className="top_card">
      <p>Your Current Balance</p>
      <h3>
        <span>৳</span>
        <span>
          {transactions.length > 0 ? comaSeparator(calculateBalance()) : "0"}
        </span>
      </h3>
    </div>
  );
}
