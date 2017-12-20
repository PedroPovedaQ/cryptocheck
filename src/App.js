import React, {Component} from 'react';
import logo from './logo.png';
import './App.css';

class App extends Component {
  cryptoName = 'Litecoin';
  constructor() {
    super();
    this.state = {
      coinAmount: '',
      // cryptoCurrencies: [],
      initialPrice: '',
      isValid: false,
      total: '',
      currentVal: 0,
      difference: 0,
      initialInvestment: 0
    };
  }

  componentDidMount() {
    fetch(`https://api.coinmarketcap.com/v1/ticker/litecoin/`)
      .then(response => response.json())
      .then(response => this.setState({currentVal: response[0].price_usd}))
      .catch(console.log)
      
    // @TODO: Add crypto dropdown
    // fetch(`https://api.coinmarketcap.com/v1/ticker/`)
    //   .then(response => response.json())
    //   .then(response => this.setState({cryptoCurrencies: this.mapToCryptoId(response)}))
    //   .catch(console.log)
  }

  mapToCryptoId = (cryptoList) => cryptoList.map( crypto => crypto.id);

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({[name]: value})
  };

  handleSubmit = event => {
    const total = this.state.coinAmount * this.state.currentVal;
    this.setState({
      total: total,
      difference: total - this.state.initialPrice * this.state.coinAmount,
      initialInvestment: this.state.initialPrice * this.state.coinAmount
    })
    this.setState({isValid: true});
    event.preventDefault();
  };

  render() {
    return (<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <h1 className="App-title">Welcome to your {this.cryptoName} portfolio.</h1>
      </header>
      <div className="callout">
        <h5>Current Price: $<span className="primary">{this.state.currentVal}</span>.</h5>
      </div>
      <form onSubmit={this.handleSubmit}>
        <div className="grid-container">
          <div className="medium-6-cell">
            <p className="App-intro">
              How many {this.cryptoName}(s) do you own?
            </p>
            <input name="coinAmount" type="number" value={this.state.coinAmount} onChange={this.handleChange}/>
          </div>

          <div className="medium-6-cell">
            <p className="App-intro">
              At what price did your puchase your {this.cryptoName}?
            </p>
            <input name="initialPrice" type="number" value={this.state.initialPrice} onChange={this.handleChange}/>
          </div>
        </div>
        <button className="button" name="submit" type="submit">GO</button>
      </form>
      {
        this.state.isValid > 0 && <h2>
            You initially invested ${Number(this.state.initialInvestment).toFixed(2)} USD.
          </h2>
      }

      {
        this.state.isValid && this.state.difference > 0 && <h2>
            You have a gained ${Number(this.state.difference).toFixed(2)}  USD.
          </h2>
      }

      {
        this.state.isValid && this.state.difference < 0 && <h2 className="alert">
            You have lost ${Number(this.state.difference).toFixed(2)} USD!
          </h2>
      }

      {
        this.state.isValid && this.state.difference === 0 && <h2 className="alert">
          You haven't gained or lost any money.
        </h2>
      }

      {
        this.state.isValid > 0 && <h2>
            You have a total of ${Number(this.state.total).toFixed(2)} USD.
          </h2>
      }

      </div>);
  }
}

export default App;
