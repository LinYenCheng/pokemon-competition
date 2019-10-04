import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Modal from "react-responsive-modal";
import HeroForm from "./HeroForm";
// import { Link, matchPath, withRouter } from "react-router-dom";

function HeroCard(props) {
  const {
    hero,
    hero: { id, name, image, pokemon, introduction, imagePokemon },
    updateHeros
  } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [objNowHero, setNowHero] = useState(null);

  const cardClass = classNames({
    thumbnail: true,
    hero__card: true,
    "hero__card--select": true
  });

  function onCloseModal() {
    setNowHero(null);
  }

  useEffect(() => {
    if (objNowHero && !isModalOpen) {
      setIsModalOpen(true);
    } else if (!objNowHero) {
      setIsModalOpen(false);
      updateHeros();
    }
  }, [objNowHero, isModalOpen]);

  return (
    <>
      <Modal
        classNames={{
          modal: "modal--custom",
          closeButton: "modal__closeButton",
          overlay: "modal__overlay"
        }}
        open={isModalOpen}
        onClose={onCloseModal}
        center
      >
        <HeroForm onCloseModal={onCloseModal} data={objNowHero} />
      </Modal>
      <a
        href="/"
        onClick={event => {
          event.preventDefault();
          setNowHero(hero);
        }}
      >
        <div className="col-xs-12 col-sm-6 col-md-3 padding--mobile">
          <div className={cardClass}>
            <div className="card__image-container">
              <img src={image} alt="..." />
            </div>
            <div className="caption center">
              <h3>{name}</h3>
              <div className="row left">
                <div className="pokemon__image">
                  <img className="center" alt="" src={imagePokemon} />
                </div>
                <div className="profile__introduction" style={{ width: "75%" }}>
                  <h4>{pokemon}</h4>
                  <h5
                    className="long-word--hide"
                    style={{ paddingRight: "15px" }}
                  >
                    {introduction}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
    </>
  );
}

HeroCard.propTypes = {
  hero: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired
};

export default HeroCard;
