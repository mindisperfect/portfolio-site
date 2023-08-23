import { Button, Col, Form, Input, Row, Tabs, Upload, message } from "antd"
import { useState, Fragment, useCallback, useEffect, ChangeEvent } from "react"

import { IMG_URL } from "../../constants"
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { request } from "../../server/request";
import { setAuthCookies } from "../../utils/setAuthCookies";
import { AccountValuesType } from "../../types/types";

const { useForm } = Form;

const AccountP = () => {

  const items = [
    {
      label: "Information",
      key: "info",
      children: <Information />,
    },
    {
      label: "Password",
      key: "pass",
      children: <Password />,
    },
  ];
  return (
     <Fragment>
     <Tabs defaultActiveKey="info" centered items={items} />
   </Fragment>
  )
}

const Information = () => {
  const [form] = useForm();
  const [imgLoading, setImgLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [callback, setCallback] = useState(false);

  const getUserData = useCallback(() => {
    request("auth/me").then(({ data }) => {
      form.setFieldsValue(data);
      setImageUrl(data.photo);
    });
  }, [form]);

  useEffect(() => {
    getUserData();
  }, [callback, getUserData]);

  const handleChange = async (e) => {
    try {
      setImgLoading(true);
      const form = new FormData();
      form.append("file", e.file.originFileObj);
      await request.post("auth/upload", form);
      const res = await request.post("upload", form);
      console.log(res);
      setCallback(!callback);
      getUserData();
    } catch (err) {
      console.log(err);   
    } finally {
      setImgLoading(false);
    }
  };

// const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
//   try {
//     setImgLoading(true);
//     const files = e.target?.files;
//     if (files) {
//       const form = new FormData();
//       // form.append("file", e.target.files[0]);
//       // await request.post("auth/upload", form);
//       form.append("file", files[0]);
//       await request.post("auth/upload", form);
//       const res = await request.post("upload", form);
//       console.log(res);
//       setCallback(!callback);
//       getUserData();
//     } else {
//       console.log("No file selected");
//     }
//   } catch (err) {
//     console.log(err);   
//   } finally {
//     setImgLoading(false);
//   }
// };

  const submit = async (values: string) => {
    try {
      setLoading(true);
      await request.put("auth/updatedetails", values);
      message.success("Edited successfully !"); 
      getUserData();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container">
    <Row>
      <Col lg={6}>
         <Upload
          name="photo"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          onChange={handleChange}
        >
          {imageUrl ? (
            <img
              src={IMG_URL + imageUrl}
              alt="avatar"
              style={{
                width: "100%",
              }} /> ) : (
            <div>
              {imgLoading ? <LoadingOutlined /> : <PlusOutlined />}
              <div style={{ marginTop: 8, }} > Upload </div>
            </div>
          )}
        </Upload> 
      </Col>
      <Col lg={18}>
        <Form
          form={form}
          layout="vertical"
          autoComplete="off"
          onFinish={submit} >
          <Form.Item
            name="firstName"
            label="First name"
            rules={[
              {
                required: true,
                message: "Please fill this field !",
              },
            ]} >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last name"
            rules={[
              {
                required: true,
                message: "Please fill this field !",
              },
            ]} >
            <Input />
          </Form.Item>
          <Form.Item
            name="username"
            label="Username"
            rules={[
              {
                required: true,
                message: "Please fill this field !",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="info"
            label="Info"
            rules={[
              {
                required: true,
                message: "Please fill this field !",
              },
            ]} >
            <Input />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Phone number"
            rules={[
              {
                required: true,
                message: "Please fill this field !",
              },
            ]} >
            <Input />
          </Form.Item>
          <Form.Item
            name="birthday"
            label="Birthday"
            rules={[
              {
                required: true,
                message: "Please fill this field !",
              },
            ]} >
            <Input type="date" />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[
              {
                required: true,
                message: "Please fill this field !",
              },
            ]} >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please fill this field !",
              },
            ]} >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            name="github"
            label="Github"
            rules={[
              {
                required: true,
                message: "Please fill this field !",
              },
            ]} >
            <Input />
          </Form.Item>
          <Form.Item
            name="telegram"
            label="Telegram"
            rules={[
              {
                required: true,
                message: "Please fill this field !",
              },
            ]} >
            <Input />
          </Form.Item>
          <Form.Item
            name="fields"
            label="Fields"
            rules={[
              {
                required: true,
                message: "Please fill this field !",
              },
            ]} >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button loading={loading} htmlType="submit" type="primary">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
    </div>
  );
};

const Password = () => {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);  
  const submit = async (values: AccountValuesType) => {
    try {
      setLoading(true);
      const { data } = await request.put("auth/updatepassword", values);
      setAuthCookies(data);
      message.success("Changed successfully !");
      form.resetFields();
    } catch (err) {
      if (err instanceof Error) {
       message.error(err.message)    
       } else {
         console.log("error");    
       }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container">
    <Form form={form} layout="vertical" autoComplete="off" onFinish={submit}>
      <Form.Item
        name="currentPassword"
        label="Current Password"
        rules={[
          {
            required: true,
            message: "Please fill this field !",
          },
        ]} >
        <Input />
      </Form.Item>
      <Form.Item
        name="newPassword"
        label="New password"
        rules={[
          {
            required: true,
            message: "Please fill this field !",
          },
        ]} >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button loading={loading} htmlType="submit" type="primary">
          Change password
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};

export default AccountP