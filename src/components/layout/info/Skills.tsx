import { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { request } from "../../../server/request";
import { SkillsType } from "../../../types/types";
import { LoadingOutlined } from "@ant-design/icons";
import { Empty, Spin } from "antd";

const Skills = () => {
  const [skill, setSkill] = useState([]);
  const [loading, setLoading] = useState(false);

  const getSkills = async () => {
    try {
      const { data } = await request.get(
        "skills?user=64dde9e1dccb1b00143b2e8e"
      );
      setSkill(data?.data);
      setLoading(true);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getSkills();
  }, []);

  const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;
  return (
    <>
      {loading ? (
        <Spin
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "50px",
          }}
          indicator={antIcon}
        />
      ) : null}
      {skill.length == 0 ? (
        <Empty />
      ) : (
        skill.map(({ name, percent, _id }: SkillsType) => {
          return (
            <div className="progress__box" key={_id}>
              <div className="progress__circle">
                <CircularProgressbar
                  strokeWidth={7.5}
                  text={`${percent}%`}
                  value={percent}
                />
              </div>
              <h3 className="skills__title">{name}</h3>
            </div>
          );
        })
      )}
    </>
  );
};

export default Skills;
