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
  // todo: images and minimal info squares
  componentDidMount(props) {
    console.log('GETTING DATA FOR PRODUCT:', this);
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
    return <li key={item.key}>{item.name}</li>;
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "Backpack",
      results: []
    };
  }

  search(keyword) {
    // use config here
    keyword = keyword.toLowerCase();
    alert(keyword);
    axios.get(`${apiUrl}/search?keyword=${keyword}`).then(res => {
      console.log(res.data);
      this.setState({ keyword, results: res.data });
    });
  }

  render(props) {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to WalReactMart</h1>
        </header>
        <p className="App-intro" />
        <div className="searchContainer">
          Search:
          <input
            type="text"
            placeholder="keyword"
            defaultValue={this.state.keyword}
          />
          <button onClick={() => this.search(this.state.keyword)}>
            Sumbit
          </button>
        </div>
        <ul className="resultsContainer">
          {this.state.results.map(id => <Product key={id} value={id} />)}
        </ul>
      </div>
    );
  }
}

export default App;
