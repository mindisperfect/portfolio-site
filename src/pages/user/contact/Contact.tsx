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
import { useForm } from "react-hook-form";
import { request } from "../../../server/request";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import { message } from "antd";

const Contact = () => {
  const { register, handleSubmit } = useForm();

  type SubmitHandler<T> = (
    data: T,
    event?: React.BaseSyntheticEvent
  ) => void | Promise<void>;

  const submit: SubmitHandler<FieldValues> = async (formData) => {
    console.log(formData);
    try {
      await request.post("messages", formData);
      message.success("Your message successfully has sent to admin !");
    } catch (err) {
      if (err instanceof Error) {
        console.log(err);
      } else {
        toast.error("An error occurred.");
      }
    } 
  };

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
        <form className="contact__form" onSubmit={handleSubmit(submit)}>
          <div className="form__input-group">
            <div className="form__input-div">
              <input
                type="text"
                placeholder="Your name"
                className="form__control"
                {...register("user", {
                  required: "User is required",
                })}
              />
            </div>
            <div className="form__input-div">
              <input
                type="text"
                placeholder="Title"
                className="form__control"
                {...register("title", {
                  required: "Title is required",
                })}
              />
            </div>
            <div className="form__input-div"></div>
          </div>
          <div className="form__input-div">
            <textarea
              placeholder="Message"
              className="form__control textarea"
              {...register("message", {
                required: "Message is required",
              })}
            ></textarea>
          </div>
          <button className="button" type="submit">
            Send Message
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
