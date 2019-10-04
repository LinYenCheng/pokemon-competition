import React, { Component } from "react";
import PropTypes from "prop-types";
import imgPokeBall from "../img/pokeball.png";

class HeroForm extends Component {
  static getQueryString(obj) {
    const queryString = Object.keys(obj)
      .map(key => key + "=" + obj[key])
      .join("&");
    return `${queryString}&action=update_trainer`;
  }

  constructor(props) {
    super(props);
    const { data } = props;
    if (data && data.name) {
      this.state = { ...data, isLoading: false };
    } else {
      this.state = {
        name: "",
        pokemon: "",
        introduction: "",
        image: "",
        imagePokemon: "",
        isLoading: false
      };
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit() {
    const { onCloseModal } = this.props;
    const queryString = this.constructor.getQueryString(this.state);
    if (this.state.type !== "semifinal") {
      this.setState({ isLoading: true }, () => {
        fetch(
          "https://script.google.com/macros/s/AKfycbwi5JFiiC0F82aBsvUjoAyAvKcFn9ZJdRXNyxEuUD5W8tPlhnqr/exec?" +
            queryString
        )
          .then(function(response) {
            return response.json();
          })
          .then(function(myJson) {
            if (myJson && myJson.status) {
              onCloseModal();
            }
          });
      });
    } else {
      onCloseModal();
    }
  }

  render() {
    const {
      name,
      pokemon,
      introduction,
      image,
      imagePokemon,
      isLoading
    } = this.state;
    let blockButton = (
      <button
        type="button"
        className="competition-form__button"
        onClick={this.handleSubmit}
      >
        送出
      </button>
    );
    if (isLoading) {
      blockButton = (
        <img src={imgPokeBall} className="competition-form__logo" alt="logo" />
      );
    }
    return (
      <form className="competition-form" onSubmit={this.handleSubmit}>
        <input name="name" value={name} onChange={this.handleInputChange} />
        <input name="image" value={image} onChange={this.handleInputChange} />
        <input
          name="pokemon"
          value={pokemon}
          onChange={this.handleInputChange}
        />
        <input
          name="introduction"
          value={introduction}
          onChange={this.handleInputChange}
        />
        <input
          name="imagePokemon"
          value={imagePokemon}
          onChange={this.handleInputChange}
        />
        <div className="center">
          <h3>
            <a href="https://tw.portal-pokemon.com/play/pokedex">
              圖片來源 (右鍵複製圖片連結)
            </a>
          </h3>
        </div>

        {blockButton}
      </form>
    );
  }
}

HeroForm.propTypes = {
  data: PropTypes.object
};

export default HeroForm;
