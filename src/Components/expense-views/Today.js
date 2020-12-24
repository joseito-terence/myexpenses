import React, { useState, useEffect } from "react";
import db, { auth } from "../../firebase";
import { dateToString, computeTotalExpense, currencyFormat } from "../../utility";

function Today() {

  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const curDate = dateToString(new Date());
    const query = db
      .doc(auth.currentUser.uid)
      .collection("expenses")
      .where("date", "==", curDate);


    document.querySelector('.today')
    .addEventListener('click', async() => {
      const snap = await query.get();
      setExpenses(snap.docs.map((doc) => ({ ...doc.data(), id: doc.id })));  
    });

  }, []);

  return expenses.length === 0 ? (
    <h2 className="text-light bg-dark text-center p-3">No Records</h2>
  ) : (
    <table className="table table-striped table-sm">
      <thead className="thead-dark">
        <tr>
          <th scope="col"> #</th>
          <th scope="col">Item</th>
          <th scope="col">Price</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense, i) => (
          <tr key={expense.id}>
            <td>{i + 1}</td>
            <td>{expense.itemName}</td>
            <td align="right">{currencyFormat(expense.price)}</td>
          </tr>
        ))}
        <tr className="text-danger">
          <td></td>
          <td align="right">Total = </td>
          <td align="right">
            {currencyFormat(
              computeTotalExpense(expenses)
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Today;
