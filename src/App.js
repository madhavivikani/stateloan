import logo from './logo.svg';
import './App.css';
import { useState } from "react";



function App() {


  let [loanamt, setloanamt] = useState("");
  let [loanrate, setloanrate] = useState("");
  let [loanyear, setloanyear] = useState("");
  let [date, setdate] = useState("");
  let [tableData, setTableData] = useState([]);
  let [result, setresult] = useState({
    months: '',
    emi: '',
    interest: '',
    t_interest: '',
    y_interset: '',
  });


  const btnclick = () => {
    const loan_rate = loanrate / 100 / 12;
    const months = loanyear * 12;

    let emi = loanamt * loan_rate * (Math.pow(1 + loan_rate, months)) / (Math.pow(1 + loan_rate, months) - 1);
    const interest = emi * months;
    const t_interest = interest - loanamt;
    const y_interset = t_interest / loanyear;

    setresult({
      months: months,
      emi: emi.toFixed(0),
      interest: interest.toFixed(0),
      t_interest: t_interest.toFixed(0),
      y_interset: y_interset.toFixed(0),
    });


    let s_balance = loanamt;
    let tableDataArray = [];

    let today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();


    for (let i = 1; i <= months; i++) {
      let month_int = (s_balance * loan_rate);
      let Principal_amt = emi - month_int;
      let e_balance = s_balance - Principal_amt;

      var monthDate = new Date(currentYear, currentMonth + i - 1, 1);
      var monthName = monthDate.toLocaleString('en-US', { month: 'short' });
      var monthYear = `${monthName} ${monthDate.getFullYear()}`;


      tableDataArray.push({
        month: i,
        monthYear,
        startingBalance: typeof s_balance === 'number' ? s_balance.toFixed(0) : s_balance,
        emi: emi.toFixed(0),
        principal: Principal_amt.toFixed(0),
        interest: month_int.toFixed(0),
        endingBalance: Math.abs(e_balance).toFixed(0),
      });
    s_balance -= Principal_amt;
    currentMonth++;
    if (currentMonth === 12) {
      currentMonth = 0;
      currentYear++;
    }
  }
  setTableData(tableDataArray);
}




return (
  <div className="App">

    <div class="main">
      <h1 class="h1">Loan Amortization Calculator</h1>

      <div class="one">
        <p class="loan_a">Loan Amount</p>
        <input type="text" class="input_amt" value={loanamt} onChange={(e) => setloanamt(e.target.value)}></input><br></br>
      </div>
      <div class="one">
        <p class="loan_a">Interest Rate (Reducing)</p>
        <input type="number" class="input_amt" value={loanrate} onChange={(e) => setloanrate(e.target.value)}></input><br></br>
      </div>
      <div class="one">
        <p class="loan_a">Loan Tenure</p>
        <input type="number" class="input_amt" value={loanyear} onChange={(e) => setloanyear(e.target.value)}></input><br></br>
      </div>
      <div class="one">
        <p class="loan_a">Starting Month & Year</p>
        <input type="month" class="input_amt" value={date} onChange={(e) => setdate(e.target.value)}></input><br></br>
      </div>

      <input type="button" class="btn" value="SHOW AMORTIZATION" onClick={btnclick}></input><br></br>

    </div>

    <table id="a_table" border="1">
      <thead>
        <tr>
          <tr>
            <th>Month</th>
            <td>{result.months}</td>
          </tr>
          <tr>
            <th>Calculated Monthly EMI</th>
            <td>{result.emi}</td>
          </tr>
          <tr>
            <th>Total Amount with Interest </th>
            <td>{result.interest}</td>
          </tr>
          <tr>
            <th>Total Interest Amount</th>
            <td>{result.t_interest}</td>
          </tr>
          <tr>
            <th>Yearly Interest Amount</th>
            <td>{result.y_interset}</td>
          </tr>

        </tr>
      </thead>
      <tbody></tbody>
    </table><br></br>



    <table border="1" id="t_table">
      <thead>
        <tr>
          <th>Year</th>
          <th>month year</th>
          <th>Starting Balance</th>
          <th>emi</th>
          <th>Principle </th>
          <th>interest </th>
          <th>Ending Balance</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((item, index) => (
          <tr key={index}>
            <td>{item.month}</td>
            <td>{item.monthYear}</td>
            <td>{item.startingBalance}</td>
            <td>{item.emi}</td>
            <td>{item.principal}</td>
            <td>{item.interest}</td>
            <td>{item.endingBalance}</td>
          </tr>
        ))}

      </tbody>
    </table>








  </div>
);
}

export default App;
