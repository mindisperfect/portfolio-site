import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PortfolioType } from "../../../types/types";
import { request } from "../../../server/request";
import { Button, Empty } from "antd";
import { IMG_URL } from "../../../constants";
import { ROLE, USER_ID } from "../../../utils/setAuthCookies";

const PortfolioItem = () => {
  const [skills, setSkills] = useState<PortfolioType[]>([]);

  const getPortfolios = async () => {
    try {
      const { data } = await request.get(
        `portfolios${ROLE === "client" ? `?user[in]=${USER_ID}` : ""}`
      );
      setSkills(data?.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getPortfolios();
  }, []);
  return (
    <>
      {skills.length == 0 ? (
        <div style={{ display: "flex", justifyItems: "center" }}>
          <Empty />
        </div>
      ) : (
        skills?.map((skill: PortfolioType) => (
          <div className="portfolio__item" key={skill?._id}>
            <img
              height={200}
              src={
                IMG_URL +
                skill?.photo._id +
                "." +
                skill?.photo.name.split(".")[1]
              }
              alt=""
              className="portfolio__img"
            />
            <div className="content__portfolio">
              <h1 className="modal__title">{skill?.name}</h1>
              <div className="conetss">
                <p className="item__details">
                  {skill?.description}
                </p>
                <Button type="primary">
                <Link to={skill?.url}>
                  View more
                </Link>
                </Button>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default PortfolioItem;
