import React from 'react';
import ExpensePerMonthChart from './charts/ExpensePerMonthChart';
import ExpensePerYearChart from './charts/ExpensePerYearChart';


function Stats() {
  return (
    <div className='stats mt-3 p-sm-5'>
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-4">
            <ExpensePerMonthChart />
          </div>
          <div className="col-md-6 mt-4">
            <ExpensePerYearChart />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stats;
