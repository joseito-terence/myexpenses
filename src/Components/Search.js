import React, { useState } from "react";
import db, { auth } from "../firebase";
import { ReactComponent as SearchIcon } from "../Icons/search-solid.svg";
import { ReactComponent as CaretDownIcon } from "../Icons/caret-down-solid.svg";
import { ReactComponent as CaretUpIcon } from "../Icons/caret-up-solid.svg";
import Modal from "./Modal";
import { computeTotalExpense, currencyFormat } from "../utility";

function Search() {

  const [advancedOptions, setOptions] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const initialState = {
    itemName: "",
    category: "",
    date: "",
    dateFrom: "",
    dateTo: "",
  };

  const [state, setState] = useState(initialState);

  const toggleOptions = () => {     // toggle between basic search and advanced search.
    setOptions(!advancedOptions);
    setState(initialState);
  }

  const handleChange = ({ target }) => { // store input as it changes.
    if(target.name === "date"){
      setState({ ...state, date: target.value, dateFrom: '' });
      return;
    }else if(target.name === "dateFrom"){
      setState({ ...state, dateFrom: target.value, date: '' });
      return;
    }

    setState({ ...state, [target.name]: target.value });
  };

  const search = (event) => {  // run search
    event.preventDefault();

    if (!advancedOptions) {
      const query = db
        .doc(auth.currentUser.uid)
        .collection("expenses")
        .where("itemName", "==", state.itemName);

      query.get().then((snap) => {
        setSearchResult(snap.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
    } else {
      const { itemName, category, date, dateFrom, dateTo } = state;
      let query = db.collection("expenses");

      if(itemName) query = query.where("itemName", "==", itemName);
      if(category) query = query.where("category","==", category);
      if(date) query = query.where("date","==", date);
      if(dateFrom && dateTo){
        query = query.where("date",">=", dateFrom)
                     .where("date","<=", dateTo);
      }

      query.get().then((snap) => {
        setSearchResult(snap.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
    }

    setState(initialState);
    console.log(state);
    console.log(searchResult);
  };
  

  // JSX for the Basic Search Form
  const basicSearch = (
    <form>
      <div className="input-group">
        
          <input
            type="text"
            name="itemName"
            placeholder="Search for an item..."
            className="form-control"
            value={state.itemName}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="btn btn-primary input-group-append d-flex align-items-center"
            data-toggle="modal" data-target="#searchResult" 
            onClick={search}
          >
            <SearchIcon style={{ width: "22px" }} />
          </button>
      </div>
    </form>
  );

  // JSX for the Advanced Search Form
  const advancedSearch = (
    <form>
      <div className="advancedSearch d-flex flex-column justify-content-center">
        <input
          type="text"
          name="itemName"
          placeholder="Item"
          className="form-control"
          value={state.itemName}
          onChange={handleChange}
        />
        <br />
        <select className="form-control" name="category" onChange={handleChange}>
          <option value="">-- Select Expense Category --</option>
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
        <div className="accordian" id="date-filters">
          {/* date input field */}
          <div className="form-check">
            <input
              type="radio"
              name="DateQueryOption"
              value="singleDate"
              id="label1"
              className="form-check-input collapsed"
              data-toggle="collapse"
              data-target="#dateInputField"
              aria-expanded="false"
              aria-controls="dateInputField"
              role="button"
            />
            <label htmlFor="label1">Select Date</label>
          </div>
          <div className="collapse" id="dateInputField"data-parent="#date-filters" >
            <input
              type="date"
              name="date"
              className="form-control"
              value={state.date}
              onChange={handleChange}
            />
            <br />
          </div>

          {/* date range field */}
          <div className="form-check">
            <input
              type="radio"
              name="DateQueryOption"
              value="DateRange"
              id="label2"
              className="form-check-input collapsed"
              data-toggle="collapse"
              data-target="#rangeInputField"
              aria-expanded="false"
              aria-controls="rangeInputField"
              role="button"
            />
            <label htmlFor="label2">Select Date Range</label>
          </div>

          <div
            className="collapse in"
            id="rangeInputField"
            data-parent="#date-filters"
          >
            From:{" "}
            <input
              type="date"
              name="dateFrom"
              className="form-control"
              value={state.dateFrom}
              onChange={handleChange}
            />
            To:{" "}
            <input
              type="date"
              name="dateTo"
              className="form-control"
              value={state.dateTo}
              onChange={handleChange}
            />
          </div>
        </div>

        <br />
        
        <button 
          type="submit"
          name="submit" className="btn btn-primary" 
          data-toggle="modal" data-target="#searchResult" 
          onClick={search}
        >
          <SearchIcon style={{ width: "22px" }} />
          <span> SEARCH</span>
        </button>
      </div>
    </form>
  );

  return (
    <div className="search container-center ">
      <div className="form-container">
        <h1>Search</h1>
        <br />

        <div className="basic collapse show" id="basic">
          {basicSearch}
        </div>
        <div className="advanced collapse in" id="advanced">
          {advancedSearch}
        </div>

        <br />
        <div
          className="show-options text-right font-weight-bold"
          style={{ fontSize: "14px", cursor: "pointer" }}
          onClick={toggleOptions}
          data-toggle="collapse"
          data-target="#basic,#advanced"
          role="menuitem"
          tabIndex="-1"
        >
          Advanced Options{" "}
          {advancedOptions ? (
            <CaretUpIcon style={{ width: "14px" }} />
          ) : (
            <CaretDownIcon style={{ width: "14px" }} />
          )}
        </div>
      </div>

      <Modal id="searchResult" title="Search Result" buttonText="Result" className="invisible">
        {searchResult.length === 0 ? (
          <h2 className="text-light bg-dark text-center p-3">No Records Found</h2>
          ) : (
            <>
              <table className="table table-striped table-sm">
                <thead className="thead-dark">
                  <tr>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Item</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResult.map((expense) => (
                    <tr key={expense.id}>
                      <td>{expense.date}</td>
                      <td>{expense.category}</td>
                      <td>{expense.itemName}</td>
                      <td align="right">{currencyFormat(expense.price)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>


              <h4 className="text-light bg-dark text-center p-2">
                Total = 
                {currencyFormat(
                  computeTotalExpense(searchResult),
                  true
                )}
              </h4>
            </>
          )
        }
      </Modal>
    </div>
  );
}

export default Search;
