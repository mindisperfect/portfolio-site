import { useEffect, useState, ChangeEvent } from "react";
import { Spin, Modal, Button, Form, Input, message, Empty } from "antd";
import { LoadingOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { request } from "../../server/request";
import "react-circular-progressbar/dist/styles.css";
import "../../pages/user/about/about.scss";
import "../../components/styles/clientPanelStyles/education.scss";
import { PortfolioType } from "../../types/types";
import { Link } from "react-router-dom";
import { IMG_URL } from "../../constants";
import { ROLE, USER_ID } from "../../utils/setAuthCookies";

const PortfolioP = () => {
  const [skills, setSkills] = useState<PortfolioType[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [PhotoUrl, setPhotoUrl] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [, setEdit] = useState(null);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const hideModal = () => {
    setIsModalOpen(false);
  };

  const getPortfolios = async () => {
    try {
      const { data } = await request.get(
        `portfolios${ROLE === "client" ? `?user[in]=${USER_ID}` : ""}`
      );
      setLoading(true);
      setSkills(data?.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getPortfolios();
  }, []);
  const downloadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const files = e.target?.files;
      if (files) {
        const form = new FormData();
        form.append("file", files[0]);
        const res = await request.post("upload", form);
        setUploadedImage(res?.data?._id);
        const imageUrl = `${IMG_URL + res?.data?._id}.${
          res?.data?.name.split(".")[1]
        }`;
        setPhotoUrl(imageUrl);
        setSelected(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onFinish = async (values: PortfolioType) => {
    try {
      const { name, url, description } = values;
      const experienceData = { name, url, description, photo: uploadedImage };
      // console.log(experienceData.photo.name);  rasmni qanday turligi haqida datani olb kelolmadm photoni idsi keldi xolos
      if (selected) {
        const response = await request.put(
          `portfolios/${selected}`,
          experienceData
        );
        if (response.status === 200) {
          getPortfolios();
          hideModal();
          message.success("Successfully edited");
        }
      } else {
        const response = await request.post("portfolios", experienceData);
        if (response.status === 201) {
          getPortfolios();
          hideModal();
          message.success("Successfully added");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const editingValues = (data: PortfolioType) => {
    console.log(data);
    form.setFieldsValue({
      name: data.name,
      url: data.url,
      description: data.description,
      uploadedImage: data.photo._id,
    });
    // shu yerda photoni idsi keldi lekin uni png yoki jpg haqidagi malumotini olb kelolmadm   -  console.log(`${IMG_URL + data?.photo}`)

    const getImageUrl = `${IMG_URL + data?.photo?._id}.${
      data?.photo?.name?.split(".")[1]
    }`;
    setPhotoUrl(getImageUrl);
  };

  const openModal = () => {
    showModal();
    form.resetFields();
    setSelected(null);
  };

  async function editSkill(id: string) {
    try {
      const { data } = await request.get(`portfolios/${id}`);
      setEdit(data);
      setSelected(id);
      editingValues(data);
      showModal();
    } catch (err) {
      console.log(err);
    }
  }

  async function deletePost(id: string) {
    try {
      Modal.confirm({
        title: "Confirm",
        icon: <ExclamationCircleFilled />,
        content: "Dou wou want to delete this portfolio ?",
        okText: "Delete",
        cancelText: "Cancel",
        onOk: async () => {
          await request.delete(`portfolios/${id}`);
          message.success("Portfolio deleted");
          getPortfolios();
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;
  return (
    <section className="slider">
      <div className="container">
        <div className="slider-paragraph" style={{ marginTop: "40px" }}>
          <h2>My Portfolios</h2>
          <button onClick={openModal}>Add</button>
        </div>
        <Modal
          title={selected ? "Editing education" : "Adding new education"}
          open={isModalOpen}
          onCancel={hideModal}
          footer={false}
        >
          <Form
            id="addPostForm"
            layout="vertical"
            autoComplete="off"
            onFinish={onFinish}
            form={form}
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Name is required",
                },
              ]}
            >
              <Input placeholder="Enter project name" />
            </Form.Item>
            <Form.Item
              name="url"
              label="Url"
              rules={[
                {
                  required: true,
                  message: "Url is required",
                },
              ]}
            >
              <Input type="text" placeholder="Enter your level" />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: "Description is required",
                },
              ]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item
              name="photo"
              label="Image"
              rules={[
                {
                  required: false,
                  message: "Select image",
                },
              ]}
            >
              <input type="file" onChange={downloadImage} />
              {PhotoUrl && (
                <img
                  style={{
                    width: "200px",
                    marginTop: "15px",
                  }}
                  src={PhotoUrl}
                  alt="image"
                />
              )}
            </Form.Item>
            <Button
              danger
              type="primary"
              onClick={hideModal}
              style={{ marginRight: "10px" }}
            >
              Close
            </Button>
            <Button type="primary" htmlType="submit">
              {selected ? "Edit portfolio" : "Create portfolio"}
            </Button>
          </Form>
        </Modal>
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
        <section className="skills">
          <div
            className="education__container grid"
            style={{ marginTop: "50px" }}
          >
            {skills.length == 0 ? (
              <div style={{ display: "flex", justifyItems: "center" }}>
                <Empty />
              </div>
            ) : (
              skills?.map((skill: PortfolioType) => (
                <div className="expereince__card" key={skill?._id}>
                  <img
                    src={`${IMG_URL + skill?.photo?._id}.${
                      skill?.photo?.name?.split(".")[1]
                    }`}
                    alt="shu yerda photoni idsi keldi lekin uni png yoki jpg haqidagi malumotini olb kelolmadm"
                    height={150}
                  />
                  <div className="content__portfolio">
                    <h1>{skill?.name}</h1>
                    <Link to={skill?.url}>{skill?.url}</Link>
                    <p>{skill?.description}</p>
                    <div className="btns">
                      <Button
                        type="primary"
                        onClick={() => editSkill(skill?._id)}
                      >
                        Edit
                      </Button>
                      <Button danger onClick={() => deletePost(skill?._id)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </section>
  );
};

export default PortfolioP;
