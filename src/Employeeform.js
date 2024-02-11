
import React from 'react';
import './EmployeeForm.css'; 

class EmployeeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', email: '', title: '', department: '' };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('Current State:', this.state);
    this.setState({ name: '', email: '', title: '', department: '' });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label>
          Job Title:
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label>
          Department:
          <input
            type="text"
            name="department"
            value={this.state.department}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default EmployeeForm;
