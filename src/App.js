import React, {Component} from 'react';
import CryptoSelector from './CryptoSelector/CryptoSelector.component';
import logo from './logo.png';
import './App.css';
import {Header, Grid, Button, Input, Table} from 'semantic-ui-react';

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

  getCashClass = difference => difference < 0
    ? 'error'
    : 'positive';

  render() {
    const moneyClass = this.state.difference < 0
      ? 'error'
      : 'positive';

    return (<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <h1 className="title">
          Welcome to your Crypto Portfolio
        </h1>
      </header>
      <Grid centered columns={2}>
        <Grid.Row columns={3}>
          <Grid.Column>
            <CryptoSelector className="dropdown" currency={this.state.currency}
              onCurrencyChange={this.handleCurrencyChange}></CryptoSelector>
            {
              this.state.currency.name && <form onSubmit={this.handleSubmit}>
                  <div className="row">
                    <div className="small-2 medium-3 columns">
                      <p className="App-intro">
                        How much {this.state.currency.name} do you own?
                      </p>
                      <Input name="coinAmount" type="number" value={this.state.coinAmount}
                        onChange={this.handleChange}/>
                    </div>

                    <div className="medium-3 columns">
                      <p className="App-intro">
                        At what price did your puchase your {this.state.currency.name}?
                      </p>
                      <Input name="initialPrice" type="number" value={this.state.initialPrice}
                        onChange={this.handleChange}/>
                    </div>
                  </div>

                  <Button primary id="submit-btn" type="submit">Submit</Button>
                </form>
            }
            {
              this.state.isValid && <div className="results">
                  <Table padded>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell singleLine>Coin</Table.HeaderCell>
                        <Table.HeaderCell>Initial Price</Table.HeaderCell>
                        <Table.HeaderCell>Current Price</Table.HeaderCell>
                        <Table.HeaderCell>Profit/Loss</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>
                          <Header as='h4'>{this.state.currency.name}</Header>
                        </Table.Cell>
                        <Table.Cell singleLine="singleLine">${Number(this.state.initialPrice).toFixed(2)}</Table.Cell>
                        <Table.Cell singleLine="singleLine">{this.state.currency.price}</Table.Cell>
                        <Table.Cell className={moneyClass}>
                          ${Number(this.state.difference).toFixed(2)}
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </div>
            }
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>);
  }
}

export default App;
