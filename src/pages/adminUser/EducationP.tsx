import { useEffect, useState } from "react";
import { Spin, Modal, Button, Form, Input, message, Empty } from "antd";
import { LoadingOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { request } from "../../server/request";
import "react-circular-progressbar/dist/styles.css";
import "../../pages/user/about/about.scss";
import "../../components/styles/clientPanelStyles/education.scss";
import { EducationType } from "../../types/types";
import { ROLE, USER_ID } from "../../utils/setAuthCookies";

const EducationP = () => {
  const [skills, setSkills] = useState<EducationType[]>([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [, setEdit] = useState(null);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const hideModal = () => {
    setIsModalOpen(false);
  };

  const getExperiences = async () => {
    try {
      const { data } = await request.get(
        `education${ROLE === "client" ? `?user[in]=${USER_ID}` : ""}`
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
    getExperiences();
  }, []);

  const onFinish = async (values: EducationType) => {
    try {
      const { name, level, description, startDate, endDate } = values;
      const experienceData = { name, level, description, startDate, endDate };
      if (selected) {
        const response = await request.put(
          `education/${selected}`,
          experienceData
        );
        if (response.status === 200) {
          getExperiences();
          hideModal();
          message.success("Successfully edited");
        }
      } else {
        const response = await request.post("education", experienceData);
        if (response.status === 201) {
          getExperiences();
          hideModal();
          message.success("Successfully added");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const setEditingValues = (data: EducationType) => {
    form.setFieldsValue({
      name: data.name,
      level: data.level,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
    });
  };

  const openModal = () => {
    showModal();
    form.resetFields();
    setSelected(null);
  };

  async function editSkill(id: string) {
    try {
      const { data } = await request.get(`education/${id}`);
      setEdit(data);
      setSelected(id);
      setEditingValues(data);
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
        content: "Dou wou want to delete this education ?",
        okText: "Delete",
        cancelText: "Cancel",
        onOk: async () => {
          await request.delete(`education/${id}`);
          message.success("Experience deleted");
          getExperiences();
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
          <h2>My Education</h2>
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
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
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
                <Input placeholder="Enter where you study" />
              </Form.Item>
              <Form.Item
                name="level"
                label="Level"
                rules={[
                  {
                    required: true,
                    message: "Your level is required",
                  },
                ]}
              >
                <Input type="text" placeholder="Enter your level" />
              </Form.Item>
            </div>
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
              name="startDate"
              label="Start date"
              rules={[
                {
                  required: true,
                  message: "Start date is required",
                },
              ]}
            >
              <Input placeholder="Enter a Start date" type="date" />
            </Form.Item>
            <Form.Item
              name="endDate"
              label="End date"
              rules={[
                {
                  required: true,
                  message: "End date is required",
                },
              ]}
            >
              <Input placeholder="Enter a End date" type="date" />
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
              {selected ? "Edit expereince" : "Create experience"}
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
              skills?.map((skill: EducationType) => (
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
              ))
            )}
          </div>
        </section>
      </div>
    </section>
  );
};

export default EducationP;
