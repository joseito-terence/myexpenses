import React, { useState, useEffect } from "react";
import db, { auth } from "../../firebase";
import { getWeekName, date, computeTotalExpense, currencyFormat, deleteRecord } from "../../utility";

function ThisWeek() {
  const [expenses, setExpenses] = useState([]);
  let refDate = 0;
  let sum = 0;  // sum of each day.

  useEffect(() => {
    const { week: curWeek, yyyy: curYear } = date(new Date());

    const query = db
      .doc(auth.currentUser.uid)
      .collection("expenses")
      .where('yyyy','==', curYear)
      .where("week", "==", curWeek)
      .orderBy("date");

    document.querySelector('.thisWeek')
      .addEventListener('click', () => {
        const unsubscribe = query.onSnapshot(snap => {                          // attach realtime listener to db.
          setExpenses(snap.docs.map((doc) => ({ ...doc.data(), id: doc.id })));  
        })
  
        const closeModalBtn = document.querySelector('div#thisWeek .close');
  
        const closeModal = () =>{
          unsubscribe();                                                       // onClose remove realtime listener.
          closeModalBtn.removeEventListener('click', closeModal);
        }
    
        closeModalBtn.addEventListener('click', closeModal);                   // remove eventlistener from close button
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
            <th scope="col">Day</th>
            <th scope="col">Item</th>
            <th scope="col">Price</th>
            <th scope="col" style={{ width: '5px' }}>Actions</th>
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
                        <td></td>
                        <td align="right">Total = </td>
                        <td align="right">{currencyFormat(sum)}</td>
                        <td></td>
                      </tr>
                    )
                  }
                  <tr key={expense.id}>
                    <td>{expense.dd}</td>
                    <td>{getWeekName(expense.date)}</td>
                    <td>{expense.itemName}</td>
                    <td align="right">{currencyFormat(sum = expense.price)}</td>
                    <td align="center">
                      <button className="btn" onClick={() => deleteRecord(expense)}>
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                </React.Fragment>
              );
            }else{
              sum += expense.price; 

              return (
                <tr key={expense.id}>
                  <td></td>
                  <td></td>
                  <td>{expense.itemName}</td>
                  <td align="right">{currencyFormat(expense.price)}</td>
                  <td align="center">
                    <button className="btn" onClick={() => deleteRecord(expense)}>
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              );
            }
          })}
          <tr className="text-danger">
            <td></td>
            <td></td>
            <td align="right">Total = </td>
            <td align="right">{currencyFormat(sum)}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <h3 className="text-light bg-dark text-center p-3">
        Total = 
        {currencyFormat(
          computeTotalExpense(expenses),
          true
        )}
      </h3>
    </>
  );
}

export default ThisWeek;
