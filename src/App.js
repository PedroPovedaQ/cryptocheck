import React, {Component} from 'react';
// import $ from 'jquery';
import CryptoSelector from './CryptoSelector/CryptoSelector.component';
import logo from './logo.png';
import './App.css';
// import 'foundation-sites';
import { Header, Grid } from 'semantic-ui-react';
class App extends Component {
  constructor() {
    super();
    this.state = {
      coinAmount: '',
      currency: {
        id: '',
        name: '',
        price: ''
      },
      initialPrice: '',
      isValid: false,
      total: '',
      currentVal: 0,
      difference: 0,
      initialInvestment: 0
    };
  }

  componentDidMount() {
    // $(document).foundation();
  }

  handleCurrencyChange = currency => {
    this.setState({currency});
  };

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({[name]: value})
  };

  handleSubmit = event => {
    const total = this.state.coinAmount * this.state.currency.price;
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
        <h1 className="title">
          Welcome to your Crypto Portfolio
        </h1>
      </header>
      <Grid centered columns={2}>
        <Grid.Column>
          <CryptoSelector
            className="dropdown"
            currency={this.state.currency}
            onCurrencyChange={this.handleCurrencyChange}>
          </CryptoSelector>

          {
            this.state.currency.name && <form onSubmit={this.handleSubmit}>
                <div className="callout">
                  <Header as="h3">Current Price: $<span className="primary">{this.state.currency.price}</span>.</Header>
                </div>
                <div className="row">
                  <div className="small-2 medium-3 columns">
                    <p className="App-intro">
                      How many {this.state.currency.name}(s) do you own?
                    </p>
                    <input name="coinAmount" type="number" value={this.state.coinAmount} onChange={this.handleChange}/>
                  </div>

                  <div className="medium-3 columns">
                    <p className="App-intro">
                      At what price did your puchase your {this.state.currency.name}?
                    </p>
                    <input name="initialPrice" type="number" value={this.state.initialPrice} onChange={this.handleChange}/>
                  </div>
                </div>
                <button className="button" name="submit" type="submit">GO</button>
              </form>
          }

          {
            this.state.isValid > 0 && <Header as='h2'>
                You initially invested ${Number(this.state.initialInvestment).toFixed(2)} USD.
              </Header>
          }

          {
            this.state.isValid && this.state.difference > 0 && <Header as='h2'>
                You have a gained ${Number(this.state.difference).toFixed(2)} USD.
              </Header>
          }

          {
            this.state.isValid && this.state.difference < 0 && <Header as='h2' className="alert">
                You have lost ${Number(this.state.difference).toFixed(2)} USD!
              </Header>
          }

          {
            this.state.isValid && this.state.difference === 0 && <Header as='h2' className="alert">
                You haven't gained or lost any money.
              </Header>
          } {
            this.state.isValid > 0 && <Header as='h2'>
                You have a total of ${Number(this.state.total).toFixed(2)} USD.
              </Header>
          }

        </Grid.Column>
    </Grid>



      </div>);
  }
}

export default App;
