import { Empty } from "antd";
import { request } from "../../../server/request";
import { EducationType } from "../../../types/types";
import { useState, useEffect } from "react";
import { ROLE, USER_ID } from "../../../utils/setAuthCookies";

const Experiences = () => {
  const [experiences, setExperiences] = useState([]);

  const getEducations = async () => {
    try {
      const { data } = await request(`education${ROLE === "client" ? `?user[in]=${USER_ID}` : ""}`);
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
    {experiences.length == 0 ? <Empty /> : experiences?.map((skill: EducationType) => (
        <div className="expereince__card" key={skill?._id}>
          <h1>{skill?.name}</h1>
          <h2>{skill?.level}</h2>
          <p>{skill?.description}</p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <p>{skill?.startDate.split("T")[0]}</p>
            <p>{skill?.endDate.split("T")[0]}</p>
          </div>
        </div>
      ))}
      ;
    </>
  );
};

export default Experiences;
