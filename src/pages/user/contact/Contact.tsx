import {
  FaDribbble,
  FaEnvelopeOpen,
  FaFacebookF,
  FaPhoneSquareAlt,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import "./contact.scss";

const Contact = () => {
  return (
    <section className="section contact">
      <h2 className="section__title">Contact</h2>
      <div className="contact__container container grid">
        <div className="contact__data">
          <h3 className="contact__title">Dont be shy</h3>
          <p className="contact__description">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. In amet
            vero repellat consectetur ducimus officiis, repudiandae minima earum
            maxime veniam?
          </p>

          <div className="contact__info">
            <div className="info__item">
              <FaEnvelopeOpen className="info__icon" />
              <div>
                <span className="info__title">Mail me</span>
                <h4 className="info__desc">example.gmail</h4>
              </div>
            </div>

            <div className="contact__info">
              <div className="info__item">
                <FaPhoneSquareAlt className="info__icon" />
                <div>
                  <span className="info__title">Call me</span>
                  <h4 className="info__desc">+998977550840</h4>
                </div>
              </div>
            </div>

            <div className="contact__socials">
              <a href="https://facebook.com" className="contact__social-link">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" className="contact__social-link">
                <FaTwitter />
              </a>
              <a href="https://youtube.com" className="contact__social-link">
                <FaYoutube />
              </a>

              <a href="https://dribbble.com" className="contact__social-link">
                <FaDribbble />
              </a>
            </div>
          </div>
        </div>
        <form className="contact__form">
          <div className="form__input-group">
            <div className="form__input-div">
              <input
                type="text"
                placeholder="Your name"
                className="form__control"
              />
            </div>
            <div className="form__input-div">
              <input
                type="email"
                placeholder="Your email"
                className="form__control"
              />
            </div>
            <div className="form__input-div">
              <input
                type="text"
                placeholder="Your Subject"
                className="form__control"
              />
            </div>
          </div>
          <div className="form__input-div">
            <textarea
              placeholder="Message"
              className="form__control textarea"
            ></textarea>
          </div>
          <button className="button">
            Send Message{" "}
            <span className="button__icon contact__button-icon">
              <FiSend />
            </span>
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
