import React, { useState, useEffect } from 'react';
import './Records.css';
import db, { auth } from '../../firebase';
import { currencyFormat, getMonthName } from '../../utility';
import Accordion from '../../Components/Accordion';


function Records() {
  const [expenseAgg, setExpenseAgg] = useState([]); // Aggregate expense year-wise.

  useEffect(() => {
    const unsubscribe = db
      .doc(auth.currentUser.uid)
      .collection('aggregation')
      .onSnapshot(snap => 
        setExpenseAgg(snap.docs.map(doc =>
          ({ ...doc.data(), id: doc.id })
        ))
      );

    return () => {
      unsubscribe();
    };
  }, []);


  return (
    <div className='records mt-5 mx-auto'>
      <h1 className='text-white ml-3'>Records</h1>
      {(expenseAgg.length === 0) ? (
          <h2 className="text-light bg-dark text-center p-3">No Records Found</h2>
        ) : (
          <Accordion id='Expenses'>
            {expenseAgg.map(doc => (
              <Accordion.Item 
                key={doc.id}
                id={`Year${doc.id}`} 
                headerText={`${doc.id} [${currencyFormat(doc.total, true)} ]`}
              >
                <Accordion id={`Year${doc.id}`}>
                  {Object.entries(doc.monthlyTotal)
                      .map(([key, value]) => 
                      (
                        <Accordion.Item
                          key={key}
                          id={`Month${key}`}
                          headerText={`${getMonthName(key)} [${currencyFormat(value, true)} ]`}
                        >
                          
                        </Accordion.Item>
                      )
                  )}
                </Accordion>
              </Accordion.Item>
            ))}
          </Accordion>
      )}
    </div>
  )
}

export default Records;
