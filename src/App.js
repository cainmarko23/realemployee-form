import React, { Component } from "react";
import "./App.css";
import swal from "sweetalert";

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentIndex: null,
      employees: [],
      fName: "",
      lName: "",
      email: "",
      salary: "",
      date: "",
      userEmail: "",
      userPass: "",
      isUser: false
    };
    this.addEmployee = this.addEmployee.bind(this);
    this.saveData = this.saveData.bind(this);
    this.cancel = this.cancel.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
  }

  /* Functional functions */

  signIn() {
    const Const_Email = "headcrush00@yahoo.com";
    const Const_Pass = "123123";
    const { userEmail, userPass, isUser } = this.state;

    if (userEmail === Const_Email && userPass === Const_Pass) {
      this.setState({ isUser: true });
      swal("Hurray!", "You are logged in succesfully", "success");
    } else swal("Error", "Please enter correct credentials", "error");
  }

  logout() {
    this.setState({ isUser: false });
    swal("Info!", "You are logged out succesfully", "info");
  }

  addEmployee() {
    const { fName, lName, email, salary, date, employees } = this.state;

    let employeeObj = {
      fName,
      lName,
      email,
      salary,
      date
    };
    employees.push(employeeObj);
    this.saveData(); // Save to local storage
    this.setState({
      employees,
      fName: "",
      lName: "",
      email: "",
      salary: "",
      date: ""
    });
    console.log(this.state.employees);
  }

  updateTodo() {
    const {
      currentIndex,
      employees,
      fName,
      lName,
      email,
      salary,
      date
    } = this.state;
    let updatedObj = {
      fName,
      lName,
      email,
      salary,
      date
    };
    employees[currentIndex] = updatedObj;
    this.saveData(); // Save to local storage
    this.setState({
      currentIndex: null,
      fName: "",
      lName: "",
      email: "",
      salary: "",
      date: ""
    });
  }

  edit(index) {
    const { employees } = this.state;

    this.setState({
      currentIndex: index,
      fName: employees[index].fName,
      lName: employees[index].lName,
      email: employees[index].email,
      salary: employees[index].salary,
      date: employees[index].date
    });
  }

  delete(index) {
    const { employees } = this.state;
    employees.splice(index, 1);
    this.saveData(); // Save to local storage
    this.setState({ employees, currentIndex: null });
  }

  cancel() {
    this.setState({
      currentIndex: null,
      fName: "",
      lName: "",
      email: "",
      salary: "",
      date: ""
    });
  }

  /* Local Storage functions */

  saveData() {
    const { employees } = this.state;
    localStorage.setItem("employees", JSON.stringify(employees));
  }

  loadData() {
    const storedData = localStorage.getItem("employees");
    return storedData ? JSON.parse(storedData) : [];
  }

  componentDidMount() {
    const employees = this.loadData();
    this.setState({ employees });
  }

  /* Body functions */

  renderTodos() {
    const { employees } = this.state;
    return (
      <tbody>
        {employees.map((row, index) => {
          return (
            <tr key={`${row.email}_${index}`}>
              <th scope="row">{index + 1}</th>
              <td>{row.fName}</td>
              <td>{row.lName}</td>
              <td>{row.email}</td>
              <td>{row.salary}</td>
              <td>{row.date}</td>
              <td>
                <button
                  onClick={this.edit.bind(this, index)}
                  data-toggle="modal"
                  data-target="#registermodal"
                  className="btn btn-success btn-sm"
                >
                  <i className="fa fa-pencil" />
                </button>
                <button
                  onClick={this.delete.bind(this, index)}
                  className="btn btn-danger btn-sm"
                >
                  <i className="fa fa-trash" />
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  }

  renderAddModal() {
    return (
      <div
        className="modal fade"
        id="registermodal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="registermodalLabel"
        aria
