import { weekNumberYearSun as getWeek } from "weeknumber";
import { aggregateOnDelete } from "./aggregation-utility";
import db, { auth } from './firebase';

// Function to convert JS Date obj to a sting with format yyyy-mm-dd
function dateToString(date) {
  let dd = date.getDate();  

  let mm = date.getMonth() + 1;
  const yyyy = date.getFullYear();

  if (dd < 10) dd = `0${dd}`;
  if (mm < 10) mm = `0${mm}`;

  date = `${yyyy}-${mm}-${dd}`;
  return date;
}

// Function returns date object with date, month, year and week as properties.
function date(date){
    return {
        dd: date.getDate(),
        mm: date.getMonth() + 1,
        yyyy: date.getFullYear(),
        week: getWeek(date).week,
    };
}

// Function to get week name.
function getWeekName(date){
  return new Date(date).toString().split(" ")[0];
}

// Get month name from month number
function getMonthName(monthNum) {
  const months = ['January', 'February', 'March', 'April', 
                  'May', 'June', 'July', 'August', 'September', 
                  'October', 'November', 'December'];
  
  return months[monthNum - 1];
}

/*******************************************************/

// Function to compute total all of the expenses.
function computeTotalExpense(expenses){
  return expenses?.reduce((total, item) => item.price + total, 0);
}

// Currency format function.
function currencyFormat(value, option = false) {    
  /* Params */
  // value is the number to be formatted 
  // option is bool. for if symbol is required.

  const formattedValue  = value.toLocaleString('en-IN', {
      maximumFractionDigits: 2,
      style: 'currency',
      currency: 'INR'
  });

  return ` ${option ? formattedValue : formattedValue.split("₹")[1]}`;                                           
}
/*******************************************************/


function deleteRecord(expense) {
  if(window.confirm("Confirm Delete", 'Are you sure you want to delete?'))
    db.doc(auth.currentUser.uid)
      .collection('expenses')
      .doc(expense.id)
      .delete()
      .then(() => aggregateOnDelete(expense))
      .catch(error => console.error(error.message));

}

/* EXPORTS */
export { computeTotalExpense, currencyFormat };             
export { dateToString, date, getWeek, getWeekName, getMonthName };    
export { deleteRecord }; 
