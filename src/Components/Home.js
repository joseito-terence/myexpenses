import React from "react";
import db, { auth } from "../firebase";
import Modal from "./Modal";
import { dateToString, date,} from "../utility";
import { aggregateOnCreate } from "../aggregation-utility";

import Today from "./expense-views/Today";
import ThisWeek from "./expense-views/ThisWeek";
import ThisMonth from "./expense-views/ThisMonth";


function Home() {
  

  const intiial_state = {
    date: dateToString(new Date()),
    category: 'general',
    itemName: '',
    price: 0,
    ...date(new Date()),
  };

  const [state, setState] = React.useState(intiial_state);

  const handleChange = ({ target }) => {
    if(target.name === 'date') {
      setState({ 
        ...state, 
        date: target.value, 
        ...date(new Date(target.value)) 
      });
      return;
    }
    setState({ ...state, [target.name]: target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    db.doc(auth.currentUser.uid)
      .collection("expenses")
      .add({ 
        ...state, 
        price: Number(state.price),
      });

    //console.log(state);
    
    aggregateOnCreate(state);  // Client-side data aggregation.

    setState(intiial_state);
  };

  return (
    <div className="home container-center">
      <div className="form-container">
        <form>
          <input
            type="date"
            className="form-control"
            name="date"
            value={state.date}
            onChange={handleChange}
          />
          <br />

          <select className="form-control" name="category" onChange={handleChange} >
            <option value="General">-- Select Expense Category --</option>
            <option value="General"> {'💰'} General</option>
            <option value="Food"> {'🍴'} Food</option>
            <option value="Home"> {'🏠'} Home</option>
            <option value="Automobile"> {'🚗'} Automobile</option>
            <option value="Bills"> {'📜'} Bills</option>
            <option value="Clothes"> {'👚'} Clothes</option>
            <option value="Travel"> {'✈'} Travel</option>
            <option value="Entertainment"> {'🎮'} Entertainment</option>
            <option value="Electronics"> {'📱'} Electronics</option>
            <option value="Internet"> {'📶'} Internet </option>
            <option value="Fuel"> {'⛽'} Fuel</option>
            <option value="Gifts"> {'🎁'} Gifts</option>
            <option value="Health"> {'🏥'} Health</option>
            <option value="Shopping"> {'🛒'} Shopping</option>
            <option value='Education'>{'🏫'} Education</option>
          </select>
          <br />
          <input
            type="text"
            className="form-control"
            name="itemName"
            placeholder="Item"
            value={state.itemName}
            onChange={handleChange}
          />
          <br />

          <input
            type="text"
            className="form-control"
            name="price"
            placeholder="Price"
            value={state.price === 0 ? '' : state.price}
            onChange={handleChange}
          />
          <br />
          <button
            className="btn btn-primary btn-block"
            onClick={handleSubmit}
            type="submit"
          >
            SUBMIT
          </button>
          <br />
        </form>
        <div className="functions-btn-container">
          <Modal id="today" buttonText="Today" title="Today" className="today btn btn-outline-light function-buttons">
            <Today />
          </Modal>
          <Modal id="thisWeek" buttonText="This Week" title="This Week" className="thisWeek btn btn-outline-light function-buttons">
            <ThisWeek />
          </Modal>
          <Modal id="thisMonth" buttonText="This Month" title="This Month" className="thisMonth btn btn-outline-light function-buttons fn-btn-wide">
            <ThisMonth />
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Home;
