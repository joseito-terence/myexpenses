import React, { useState, useEffect } from 'react';
import db, { auth } from "../../../firebase";
import { computeTotalExpense, currencyFormat, deleteRecord } from '../../../utility';

function MonthlyRecord({ year, month, renderData }) {
  const [expenses, setExpenses] = useState([]);
  let refDate = 0;  // This is only for conditionally rendering the date number.
  let sum = 0;  // sum of each day.
  const renderCondition = (renderData.month === month && renderData.year === year);
  
  useEffect(() => {
    let unsubscribe;
    if(renderCondition){
      const query = db
        .doc(auth.currentUser.uid)
        .collection("expenses")
        .where('yyyy','==', parseInt(year))
        .where("mm", "==", parseInt(month))
        .orderBy("date");

      unsubscribe = query.onSnapshot(snap => {                      
        setExpenses(snap.docs.map((doc) => ({ ...doc.data(), id: doc.id })));  
      })
    }
    return () => {
      if(renderCondition)
        unsubscribe();
    }
  }, [renderData]);

  console.log(computeTotalExpense(expenses))

  return (renderCondition) && (
      <table className="table table-striped table-sm">
        <thead className="thead-dark">
          <tr>
            <th scope="col"> Date</th>
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
                        <td align="right">Total = </td>
                        <td align="right">{currencyFormat(sum)}</td>
                        <td></td>
                      </tr>
                    )
                  }
                  <tr key={expense.id}>
                    <td>{expense.dd}</td>
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
            <td align="right">Total = </td>
            <td align="right">{currencyFormat(sum)}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
  );
}

export default MonthlyRecord;
