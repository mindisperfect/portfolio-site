import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "./Login-register.scss";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FieldValues } from "react-hook-form";
import { request } from "../../../server/request";
import { USER, TOKEN } from "../../../constants";
import Cookies from "js-cookie";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  type SubmitHandler<T> = (
    data: T,
    event?: React.BaseSyntheticEvent
  ) => void | Promise<void>;

  const submit: SubmitHandler<FieldValues> = async (formData) => {
    try {
      setLoading(true);
      const res = await request.post("auth/register", formData);
      Cookies.set(TOKEN, res.data.token);
      Cookies.set(USER, JSON.stringify(res.data.user));
      navigate("/login");
    } catch (err) {
      if (err instanceof Error) {
        console.log(err);
      } else {
        toast.error("An error occurred.");
      }
    } finally {
      setLoading(false);
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
      <h1>Register</h1>
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
              placeholder="Firstname"
              {...register("firstName", {
                required: "First name is required",
              })}
            />
            <input
              type="text"
              placeholder="Lastname"
              {...register("lastName", {
                required: "Last name is required",
              })}
            />
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
              Register
            </button>
            <div className="advice-box">
              <h1 className="advice">
                If you have account <Link to="/login">Login</Link>
              </h1>
            </div>
          </div>
        </form>
      )}
    </section>
  );
};

export default Register;
