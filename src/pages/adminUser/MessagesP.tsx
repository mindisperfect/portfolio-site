import { useState, useEffect } from "react";
import { request } from "../../server/request";
import "../../components/styles/clientPanelStyles/education.scss";
import { MessagesType } from "../../types/types";
import { Button } from "antd";

const MessagesP = () => {
  const [messages, setMessages] = useState([]);

  const getMessage = async () => {
    const { data } = await request(
      "messages?whom[in]=64dde9e1dccb1b00143b2e8e"
    );
    console.log(data);
    setMessages(data?.data);
  };
  useEffect(() => {
    getMessage();
  }, []);
  return (
    <section className="message__section">
      {messages?.map((message: MessagesType) => {
        return (
          <div className="expereince__card" style={{marginTop: "10px"}} key={message?._id}>
            <h1>{message?.title}</h1>
            <p>{message?.user}</p>
            <p>{message?.message}</p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }} >
              <p>{message?.whom?.firstName}</p>
              <p>{message?.whom?.lastName}</p>
              <p>{message?.whom?.username}</p>
            </div>
            <Button type="primary">Answer</Button>
          </div>
        );
      })}
    </section>
  );
};

export default MessagesP;
