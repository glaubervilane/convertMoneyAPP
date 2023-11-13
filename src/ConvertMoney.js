// ConvertMoney.js

import React, { useState } from 'react';
import './ConvertMoney.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, Modal } from 'react-bootstrap';
import { faAngleDoubleRight, faSpinner } from '@fortawesome/free-solid-svg-icons';
import HeroImage from './images/hero.jpg';
import ListCurrency from './components/ListCurrency';

const ConvertMoney = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('BRL');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Set loading to true to show the spinner
    setLoading(true);

    // Simulate an asynchronous operation (e.g., API call)
    setTimeout(() => {
      // Reset loading state after the operation is complete
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="convert-money-container">
      <section className="hero-section">
        <img src={HeroImage} alt="Hero" className="hero-image" />
        <div className="hero-text">
          <h1>Your Currency Converter</h1>
          <p>Convert money easily with this tool</p>
        </div>
      </section>
      <Alert variant="danger" show={false}>
        Error fetching conversion rate!
      </Alert>
      <form className="convert-money-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            type="number"
            className="amount-input"
            placeholder="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <select
            className="currency-select"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            required
          >
            <ListCurrency displayDescriptions={false} />
          </select>
          <div className="icon-container">
            <FontAwesomeIcon icon={faAngleDoubleRight} />
          </div>
          <select
            className="currency-select"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            required
          >
            <ListCurrency displayDescriptions={false} />
          </select>
          <button type="submit" className="convert-button" disabled={loading}>
            {loading && <FontAwesomeIcon icon={faSpinner} spin style={{ marginRight: '5px' }} />}
            {loading ? 'Converting...' : 'Convert'}
          </button>
        </div>
      </form>
      <Modal show={false}>
        <Modal.Header closeButton>
          <Modal.Title>Conversion Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          1 USD = 5.22 BRL
        </Modal.Body>
        <Modal.Footer>
          <button variant="success" type="button" className="btn btn-primary">
            New Conversion
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ConvertMoney;
