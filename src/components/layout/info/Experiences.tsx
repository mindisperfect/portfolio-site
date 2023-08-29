import { Empty } from "antd";
import { request } from "../../../server/request";
import { EducationType } from "../../../types/types";
import { useState, useEffect } from "react";
import { ROLE, USER_ID } from "../../../utils/setAuthCookies";

const Experiences = () => {
  const [experiences, setExperiences] = useState([]);

  const getEducations = async () => {
    try {
      const { data } = await request(
        `education${ROLE === "client" ? `?user[in]=${USER_ID}` : ""}`
      );
      setExperiences(data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getEducations();
  }, []);

  return (
    <>
      {experiences.length == 0 ? (
        <Empty />
      ) : (
        experiences?.map((skill: EducationType) => (
          <div className="resume__item" key={skill?._id}>
            <span className="resume__date">
              {skill?.startDate.split("T")[0]} - {skill?.endDate.split("T")[0]}
            </span>
            <h2 className="resume__subtitle"><b>Education name: </b>{skill?.name}</h2>
            <h2 className="resume__subtitle"><b>Level: </b>{skill?.level}</h2>
            <p className="resume__description">{skill?.description}</p>
          </div>
        ))
      )}
      ;
    </>
  );
};

export default Experiences;
