import { FaDownload } from "react-icons/fa";
import Info from "../../../components/layout/info/Info";
import CV from "../../../assets/images/steve-Cv.pdf";
import Stats from "../../../components/layout/info/Stats";
import "./about.scss";
import Skills from "../../../components/layout/info/Skills";
import { resume } from "../../../data";
// import ResumeItem from "../../../components/layout/info/ResumeItem";
import parse from "html-react-parser"

const About = () => {
  return (
    <main className="section container">
      <section className="about">
        <h2 className="section__title">
          About <span>Me</span>
        </h2>
        <div className="about__container grid">
          <div className="about__info">
            <h3 className="section__subtitle">Personal info</h3>

            <ul className="info__list grid">
              <Info />
            </ul>

            <a href={CV} download="" className="button">
              Downoload Cv
              <span className="button__icon">
                <FaDownload />
              </span>
            </a>
          </div>
          <div className="stats grid">
            <Stats />
          </div>
        </div>
      </section>
      <div className="separator"></div>

      <section className="skills">
        <h3 className="section__subtitle subtitle__center">My Skills</h3>
        <div className="skills__container grid">
          <Skills />
        </div>
      </section>
      <div className="separator"></div>

      <section className="resume">
        <h3 className="section__subtitle subtitle__center">Experience</h3>
        <div className="resume__container grid">
          <div className="resume__data">
            {resume.map((val) => {
              if (val.category === "experience") {
                // return <ResumeItem key={i} {...val} />
                return <div className="resume__item" key={val.id}>
                <div className="resume__icon">
                    {val.icon}
                </div>
                <span className="resume__date">{val.year}</span>
                <h3 className="resume__subtitle">
                    {parse(val.title)}
                </h3>
                <p className="resume__description">
                    {val.desc}
                </p>
            </div>
              }
            })}
          </div>
          <div className="resume__data">
            {resume.map((val) => {
              if (val.category === "education") {
                // return <ResumeItem key={val.id} {...val} />
                return <div className="resume__item" key={val.id}>
                <div className="resume__icon">
                    {val.icon}
                </div>
                <span className="resume__date">{val.year}</span>
                <h3 className="resume__subtitle">
                    {parse(val.title)}
                </h3>
                <p className="resume__description">
                    {val.desc}
                </p>
            </div>
              } 
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
