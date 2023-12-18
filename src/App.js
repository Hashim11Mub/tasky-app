import React, { Component } from 'react';
import './App.css';
import ListItems from './listItems.js';

class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      items: [],
      currentItem: {
        text: "",
        key: ""
      }
    };

    this.handleInput = this.handleInput.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this)
    this.setUpdate = this.setUpdate.bind(this)
  }

  handleInput(e) {
    const { value } = e.target;
    this.setState(prevState => ({
      currentItem: {
        text: value,
        key: Date.now()
      }
    }));
  }

  addItem(e) {
    e.preventDefault();
    const { currentItem, items } = this.state;
    if (currentItem.text !== "") {
      const newItems = [...items, currentItem];
      this.setState({
        items: newItems,
        currentItem: {
          text: '',
          key: ''
        }
      });
    }
  }

  deleteItem(key) {
    const filterItems = this.state.items.filter(item => 
      item.key !== key );
      this.setState({
        items: filterItems
      })
  }

  setUpdate(text, key) {
    const items = this.state.items;
    items.map(item => {
      if (item.key == key) {
        item.text = text;
      }
    })
    this.setState({
      items: items
    })
  }
  render() {
    return (
      <div className='App'>
        <header>
          <h1>This is our tasks</h1> 
          <form id="to-do-form" onSubmit={this.addItem}>
            <input
              type="text"
              placeholder="Enter Message !!"
              value={this.state.currentItem.text}
              onChange={this.handleInput}
            />
            <button type="Submit">Add</button>
          </form>
        </header>
        <ListItems
          items={this.state.items}
          deleteItem={this.deleteItem}
          setUpdate={this.setUpdate}
        />
      </div>
    );
  }
}

export default App


