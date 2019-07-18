import React, { Component } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { withRouter, Link } from "react-router-dom";

class TodosList extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = { sites: [] };
  }

  edit(id) {
    this.props.history.push("/edit/" + id);
  }

  delete(id) {
    axios
      .delete("http://localhost:4000/sites/" + id)
      .then(response => {
        let sites = this.state.sites;
        let index = -1;
        let counter = 0;
        for (let site of sites) {
          if (site._id === id) {
            index = counter;
            break;
          }
          counter++;
        }

        if (index !== -1) {
          sites.splice(index, 1);
          this._isMounted &&
            this._isMounted &&
            this.setState({
              sites: sites
            });
        }
        //this.props.history.push('/todos');
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  componentDidMount() {
    this._isMounted = true;
    axios
      .get("http://localhost:4000/sites/")
      .then(response => {
        this._isMounted && this.setState({ sites: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  todoList() {
    const Sites = props => (
      <tr>
        <td>
          <Link to={`/${props.sites._id}/sitesystems`} className="nav-link">
            {props.sites.sites_name}
          </Link>
        </td>
        <td>{props.sites.sites_location}</td>
        <td>{props.sites.sites_createdat}</td>
        <td>{props.sites.sites_updatedat}</td>
        <td>
          <Button variant="primary" onClick={() => this.edit(props.sites._id)}>
            Edit
          </Button>
          <span> </span>
          <Button variant="danger" onClick={() => this.delete(props.sites._id)}>
            Delete
          </Button>
        </td>
      </tr>
    );

    return this.state.sites.map(function(currentTodo, i) {
      return <Sites sites={currentTodo} key={i} />;
    });
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="collpase navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/" className="nav-link">
                  Sites
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/create" className="nav-link">
                  Create Sites
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <br />
        <h3>Sites List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.todoList()}</tbody>
        </table>
      </div>
    );
  }
}

export default withRouter(TodosList);
