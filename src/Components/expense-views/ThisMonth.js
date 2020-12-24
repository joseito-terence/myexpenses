import React, { useState, useEffect } from "react";
import db, { auth } from "../../firebase";
import { computeTotalExpense, date, currencyFormat } from "../../utility";

function ThisMonth() {

  const [expenses, setExpenses] = useState([]);
  let refDate = 0;  // This is only for conditionally rendering the date number.
  let sum = 0;  // sum of each day.

  useEffect(() => {
    const { mm: curMonth, yyyy: curYear } = date(new Date());

    const query = db
      .doc(auth.currentUser.uid)
      .collection("expenses")
      .where('yyyy','==', curYear)
      .where("mm", "==", curMonth)
      .orderBy("date");

    document.querySelector('.thisMonth')
      .addEventListener('click', async() => {
        const snap = await query.get();
        setExpenses(snap.docs.map((doc) => ({ ...doc.data(), id: doc.id })));  
      });

    
  }, []);


  return expenses.length === 0 ? (
    <h2 className="text-light bg-dark text-center p-3">No Records</h2>
  ) : (
    <>
      <table className="table table-striped table-sm">
        <thead className="thead-dark">
          <tr>
            <th scope="col"> Date</th>
            <th scope="col">Item</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, i) => {
            
            if(refDate !== expense.date){
              refDate = expense.date;

              return (
                <React.Fragment key={expense.id}>
                  {i !== 0 && 
                    (
                      <tr className="text-danger">
                        <td></td>
                        <td align="right">Total = </td>
                        <td align="right">{currencyFormat(sum)}</td>
                      </tr>
                    )
                  }
                  <tr key={expense.id}>
                    <td>{expense.dd}</td>
                    <td>{expense.itemName}</td>
                    <td align="right">{currencyFormat(sum = expense.price)}</td>
                  </tr>
                </React.Fragment>
              );
            }else{
              sum += expense.price; 

              return (
                <tr key={expense.id}>
                  <td></td>
                  <td>{expense.itemName}</td>
                  <td align="right">{currencyFormat(expense.price)}</td>
                </tr>
              );
            }
          })}
          <tr className="text-danger">
            <td></td>
            <td align="right">Total = </td>
            <td align="right">{currencyFormat(sum)}</td>
          </tr>
        </tbody>
      </table>
      <h3 className="text-light bg-dark text-center p-3">
        Total = 
        {currencyFormat(
          computeTotalExpense(expenses),
          true
        )}</h3>
    </>
  );
}

export default ThisMonth;
