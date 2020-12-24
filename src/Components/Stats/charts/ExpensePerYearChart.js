import React, { useState, useEffect } from 'react';
import './charts.css';
import { Bar } from 'react-chartjs-2';
import db, { auth } from '../../../firebase';

function ExpensePerYearChart() {
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([])

  useEffect(() => {
    const unsubscribe = db
      .doc(auth.currentUser.uid)
      .collection('aggregation')
      .onSnapshot(snap => { 
        let tempData = [], tempLabel = [];

        snap.docs.forEach(doc => {
          tempLabel.push(doc.id);
          tempData.push(doc.data().total);
        });

        setData(tempData);
        setLabels(tempLabel);
      }) 

    return () => {
      unsubscribe();
    }
  }, []);


  const state = {
    labels: labels,
    datasets: [
      {
        backgroundColor: [
          "goldenrod", "indigo", "green", "violet", 
          "cyan", "purple", "orange", "yellow", "blue", "red"
        ],
        borderWidth: 4,
        data: data,
      }
    ]
  }


  return (
    <Bar
      data={state}
      options={{
        title:{
          display:true,
          text:'Expense per Year',
          fontSize:20
        },
        legend:{
          display: false,
        }
      }}
    />
  )
}

export default ExpensePerYearChart;
