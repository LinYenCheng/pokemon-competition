import React, { Component } from 'react';
import PropTypes from 'prop-types';
import imgPokeBall from '../img/pokeball.png';

class CompetitionForm extends Component {
  static getQueryString(obj) {
    const queryString = Object.keys(obj).map(key => key + '=' + obj[key]).join('&');
    return `${queryString}&action=update`;
  }

  constructor(props) {
    super(props);
    const { data } = props;
    if (data && data.date) {
      this.state = { ...data, isLoading: false };
    } else {
      this.state = {
        type: '',
        date: '',
        playerOne: '',
        playerTwo: '',
        scoreOne: '',
        scoreTwo: '',
        isLoading: false,
      };
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit() {
    const { onCloseModal } = this.props;
    const queryString = this.constructor.getQueryString(this.state);
    this.setState({ isLoading: true }, () => {
      fetch('https://script.google.com/macros/s/AKfycbwi5JFiiC0F82aBsvUjoAyAvKcFn9ZJdRXNyxEuUD5W8tPlhnqr/exec?' + queryString)
        .then(function (response) {
          return response.json();
        })
        .then(function (myJson) {
          if (myJson && myJson.status) {
            onCloseModal();
          }
        });
    });
  }

  render() {
    const { type, date, playerOne, playerTwo, scoreOne, scoreTwo, isLoading } = this.state;
    let blockButton = (
      <button type="button" className="competition-form__button" onClick={this.handleSubmit}>送出</button>
    );
    let options = (
      <>
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </>
    );
    if (isLoading) {
      blockButton = (
        <img src={imgPokeBall} className="competition-form__logo" alt="logo" />
      );
    }
    if (type === 'semifinal') {
      options = (
        <>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="0">4</option>
          <option value="1">5</option>
          <option value="2">6</option>
          <option value="3">7</option>
          <option value="2">8</option>
          <option value="3">9</option>
        </>
      );
    }
    return (
      <form className="competition-form" onSubmit={this.handleSubmit}>
        <input
          name="date"
          type="date"
          value={date}
          onChange={this.handleInputChange}
        />
        <input
          name="playerOne"
          value={playerOne}
          onChange={this.handleInputChange}
        />
        <select name="scoreOne" value={scoreOne} onChange={this.handleInputChange}>
          {options}
        </select>
        <input
          name="playerTwo"
          value={playerTwo}
          onChange={this.handleInputChange}
        />
        <select name="scoreTwo" value={scoreTwo} onChange={this.handleInputChange}>
          {options}
        </select>
        {blockButton}
      </form>
    );
  }
}

CompetitionForm.propTypes = {
  data: PropTypes.object,
};

export default CompetitionForm;
