import { Link } from "react-router-dom";
import Profile from "../../../assets/images/home.jpg";
import { FaArrowRight } from "react-icons/fa";
import "./home.scss";
import { useTypewriter, Cursor } from "react-simple-typewriter";

const Home = () => {
  const [text] = useTypewriter({
    words: ["Developer", "Designer", "Student"],
    loop: true, // or false if applicable
    typeSpeed: 120,
    deleteSpeed: 80,
  });
  
  return (
    <section className="home section grid">
      <img src={Profile} alt="" className="home__img" />
      <div className="home__content">
        <div className="home__data">
          <h1 className="home__title">
            <span>I'am Shakhzod </span> {text}
            <Cursor />
          </h1>
          <p className="home__desription">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe
            sunt, eveniet placeat ipsam nisi animi totam repudiandae obcaecati
            vel officiis!
          </p>
          <Link to="/about" className="button">
            More About{" "}
            <span className="button__icon">
              <FaArrowRight />
            </span>
          </Link>
        </div>
      </div>
      <div className="color__block"></div>
    </section>
  );
};

export default Home;
