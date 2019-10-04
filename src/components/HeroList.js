import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
// import { Route, withRouter } from "react-router-dom";
// import Swal from "sweetalert2";
// import imgBlastoise from "../img/Blastoise.png";

import "../styles/App.scss";
// import API from "../middleware/API";
// import HeroProfile from "./HeroProfile";
import HeroCard from "./HeroCard";

function HeroList(props) {
  const [heroes, setHeroes] = useState([]);
  let blockHeros = "";

  function updateHeros() {
    fetch(
      "https://script.google.com/macros/s/AKfycbwi5JFiiC0F82aBsvUjoAyAvKcFn9ZJdRXNyxEuUD5W8tPlhnqr/exec?action=read_trainers"
    )
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        if (myJson && myJson.records) {
          // console.log(myJson.records);
          setHeroes(myJson.records);
        }
      });
  }

  useEffect(() => {
    updateHeros();
  }, []);

  if (heroes && heroes.length) {
    blockHeros = heroes.map(hero => {
      const { id } = hero;
      return <HeroCard key={id} hero={hero} updateHeros={updateHeros} />;
    });
  }

  return (
    <div className="row">
      <br />
      {blockHeros}
    </div>
  );
}

HeroList.propTypes = {
  // match: PropTypes.shape({
  //   url: PropTypes.string.isRequired
  // }).isRequired
};

export default HeroList;
