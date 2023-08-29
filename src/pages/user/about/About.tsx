import { FaDownload } from "react-icons/fa";
import CV from "../../../assets/images/steve-Cv.pdf";
import Stats from "../../../components/layout/info/Stats";
import "./about.scss";
import Skills from "../../../components/layout/info/Skills";
import { useEffect, useState } from "react";
import { request } from "../../../server/request";
import { ExperienceType } from "../../../types/types";
import Experiences from "../../../components/layout/info/Experiences";
import { ROLE, USER_ID } from "../../../utils/setAuthCookies";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import Info from "../../../components/layout/info/Info";

const About = () => {
  const [experiences, setExperiences] = useState([]);
  // const [infos, setInfo] = useState([]);
  const [loading, setLoading] = useState(false);

  const getExperiences = async () => {
    try {
      const { data } = await request(
        `experiences${ROLE === "client" ? `?user[in]=${USER_ID}` : ""}`);
      setExperiences(data?.data);
      setLoading(true);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getExperiences();
  }, []);



  const getInfosss = async () => {
    try {
      const { data } = await request.get("auth/me");
      console.log(data);
      // setInfo(data?.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getInfosss();
  }, []);

  const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;
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

      {/* <section className="skills">
        <h3 className="section__subtitle subtitle__center">My Education</h3>
        <div className="skills__container grid">
          <Experiences />
        </div>
      </section>
      <div className="separator"></div> */}

      <section className="resume">
        <div className="title__grid">
        <h3 className="section__subtitle subtitle__center">Experience</h3>
        <h3 className="section__subtitle subtitle__center">My Education</h3>
        </div>
        <div className="resume__container grid">
          <div className="resume__data">
            {loading ? (
              <Spin
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingBottom: "50px",
                }}
                indicator={antIcon}
              />
            ) : (
              experiences.map((val: ExperienceType) => {
                return (
                  <div className="resume__item" key={val._id}>
                    <span className="resume__date">
                      {val?.startDate.split("T")[0]} -{" "}
                      {val?.endDate.split("T")[0]}
                    </span>
                    <h3 className="resume__subtitle">
                      <b>Work name:</b> {val?.workName}
                    </h3>
                    <h3 className="resume__subtitle">
                      <b>Company name:</b> {val?.companyName}
                    </h3>
                    <p className="resume__description">{val?.description}</p>
                  </div>
                );
              })
            )}
          </div>
          <div className="resume__data">
          <Experiences />
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
