import axios from "axios";
import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

const apiUrl = "http://localhost:3088";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      item: {}
    };
  }

  componentDidMount(props) {
    const id = this.props.value;
    axios.get(`${apiUrl}/product/${id}`).then(res => {
      this.setState({
        id,
        item: res.data
      });
    });
  }

  render() {
    const item = this.state.item;

    // note: quick layout here - use of br's etc use css in real apps
    return (
      <li key={item.key} className="Product">
        <img src={item.largeImage} alt={item.name} />
        <br></br>
        <b>{item.name}</b>
        <hr></hr>
        <div className="ProductDecription">
          {item.shortDescription}
        </div>
        <br></br>
        <span className="ProductPrice">${item.salePrice}</span>
      </li>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      results: [],
      typing: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ keyword: event.target.value, typing: true });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ typing: false });
    this.search(this.state.keyword);
  }

  search(keyword) {
    axios.get(`${apiUrl}/search?keyword=${keyword}`).then(res => {
      this.setState({ keyword, results: res.data });
    });
  }

  render(props) {
    let resultContent = "";
    if (this.state.typing) {
      resultContent = "typing...";
    } else if (this.state.keyword === "") {
      resultContent = 'try "Backpack"';
    } else if (this.state.results.length < 1) {
      resultContent = "no results found";
    } else {
      resultContent = this.state.results.map(id => (
        <Product key={id} value={id} />
      ));
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to WalReactMart</h1>
        </header>
        <p className="App-intro" />
        <form className="searchContainer" onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="keyword"
            name="keyword"
            value={this.state.keyword}
            onChange={this.handleChange}
          />
          <button>Search</button>
        </form>
        <ul className="resultsContainer">{resultContent}</ul>
      </div>
    );
  }
}

export default App;
