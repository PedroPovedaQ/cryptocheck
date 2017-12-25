import React, {Component} from 'react';
import './CryptoSelector.css';
import {Dropdown} from 'semantic-ui-react';

class CryptoSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: []
    };
  }

  componentDidMount() {
    fetch(`https://api.coinmarketcap.com/v1/ticker/`).then(response => response.json()).then(response => this.setState({currencies: this.mapToCryptoId(response)})).catch(console.log)
  }

  mapToCryptoId = (cryptoArray) => cryptoArray.map(crypto => Object.assign({}, {
    value: {
      id: crypto.id,
      name: crypto.name,
      price: crypto.price_usd
    },
    text: crypto.name,
    key: crypto.id
  }));

  handleClick = (event, currency) =>
    this.props.onCurrencyChange(currency.value);

  render() {
    return (<Dropdown placeholder='Select Currency'
      fluid
      selection
      search
      options={this.state.currencies}
      onChange={this.handleClick}/>);
  }
}

export default CryptoSelector;
