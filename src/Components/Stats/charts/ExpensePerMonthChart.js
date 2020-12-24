import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { date, getMonthName } from '../../../utility';
import './charts.css';
import db, { auth } from '../../../firebase';

function PerMonthExpense() {
  const { yyyy:year } = date(new Date());
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([])



  useEffect(() => {
    const unsubscribe = db
      .doc(auth.currentUser.uid)
      .collection('aggregation')
      .doc(`${year}`)
      .onSnapshot(snap => {
        if (snap.data() !== undefined) {
          let tempData = [], tempLabel = [];

          Object.entries(snap.data().monthlyTotal)
          .forEach(([key, value]) => {
            tempData.push(value);
            tempLabel.push(getMonthName(key));
          });
          
          setData(tempData);
          setLabels(tempLabel);
        }
      });
    
    return () => {
      unsubscribe();                                                        
    }
  }, [year]);


  const state = {
    labels: labels,
    datasets: [
      {
        backgroundColor: [
            'red','blue','yellow','orange','purple',
            'cyan','violet','green','indigo','grey',
            'silver','goldenrod'
				],
        borderWidth: 4,
        data: data,
      }
    ]
  }

  // console.log(data)
  // console.log(labels)

  return (
    <Bar
      data={state}
      options={{
        title:{
          display:true,
          text:`Expense per month (Year ${year})`,
          fontSize:20
        },
        legend:{
          display: false,
        }
      }}
    />
  );
}

export default PerMonthExpense;
