import { useState } from "react";
import { Spin, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "../register/Login-register.scss";
import { useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import { request } from "../../../server/request";
import { USER, TOKEN } from "../../../constants";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

const LoginP = () => {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm();

  const [loading, setLoading] = useState(false);

  type SubmitHandler<T> = (
    data: T,
    event?: React.BaseSyntheticEvent
  ) => void | Promise<void>;

  const submit: SubmitHandler<FieldValues> = async (formData) => {
    try {
      setLoading(true);
      const res = await request.post("auth/login", formData);
      Cookies.set(TOKEN, res.data.token);
      Cookies.set(USER, JSON.stringify(res.data.user));
      if (res.data.user.role !== "user") {
        navigate("/dashbaord")
      } else {
        message.error("Admin have to update your role to client !")
      }
    } catch (err) {
      if (err instanceof Error) {
       console.log(err);    
      } else {
        console.log("error");    
      }
    } finally {
      setLoading(false)
    }
  };

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 48,
      }}
      spin
    />
  );
  return (
    <section className="login-page">
      <h1>Login</h1>
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
        <form onSubmit={handleSubmit(submit)}>
          <div className="inputs">
            <input
              type="text"
              placeholder="Username"
              {...register("username", {
                required: "Username is required",
              })}
            />
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Pssword is required",
              })}
            />
            <button className="button" type="submit">
              login
            </button>
          </div>
        </form>
      )} 
    </section>
  );
};

export default LoginP;