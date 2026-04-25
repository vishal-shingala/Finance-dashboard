import React, { useContext } from "react";
import Card from "../parts/Card.jsx";
import { UserContext } from "../context/User.context.jsx";

const TransactionCard = () => {
  const { income, expense } = useContext(UserContext);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3 w-full items-stretch">
      <Card className="text-green-500" type={"Income"} amount={income || 0} />
      <Card className="text-red-500" type={"Expense"} amount={expense || 0} />
      <Card
        className={income - expense >= 0 ? "text-green-500" : "text-red-500"}
        type={"Total"}
        amount={income - expense || 0}
      />
    </div>
  );
};

export default TransactionCard;
