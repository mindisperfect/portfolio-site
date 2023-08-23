import { useEffect, useState } from "react";
import { Spin, Modal, Button, Form, Input, message } from "antd";
import { LoadingOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { request } from "../../server/request";
import "react-circular-progressbar/dist/styles.css";
import "../../pages/user/about/about.scss";
import "../../components/styles/clientPanelStyles/skills.scss";
import { ExperienceType } from "../../types/types";
import { ROLE, USER_ID } from "../../utils/setAuthCookies";

const ExperiencesP = () => {
  const [skills, setSkills] = useState<ExperienceType[]>([]);
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
        `experiences${ROLE === "client" ? `?user[in]=${USER_ID}` : ""}`
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

  const onFinish = async (values: ExperienceType) => {
    try {
      const { workName, companyName, description, startDate, endDate } = values;
      const experienceData = {
        workName,
        companyName,
        description,
        startDate,
        endDate,
      };
      if (selected) {
        const response = await request.put(
          `experiences/${selected}`,
          experienceData
        );
        if (response.status === 200) {
          getExperiences();
          hideModal();
        }
      } else {
        const response = await request.post("experiences", experienceData);
        if (response.status === 201) {
          getExperiences();
          hideModal();
          message.success("You can also check here");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const setEditingValues = (data: ExperienceType) => {
    form.setFieldsValue({
      workName: data.workName,
      companyName: data.companyName,
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
      const { data } = await request.get(`experiences/${id}`);
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
        content: "Dou wou want to delete this experience ?",
        okText: "Delete",
        cancelText: "Cancel",
        onOk: async () => {
          await request.delete(`experiences/${id}`);
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
          <h2>My Experiences</h2>
          <button onClick={openModal}>Add</button>
        </div>
        <Modal
          title={selected ? "Editing experience" : "Adding new experience"}
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
                name="workName"
                label="Work name"
                rules={[
                  {
                    required: true,
                    message: "Name is required",
                  },
                ]}
              >
                <Input placeholder="Enter a work name" />
              </Form.Item>
              <Form.Item
                name="companyName"
                label="Company name"
                rules={[
                  {
                    required: true,
                    message: "Company name is required",
                  },
                ]}
              >
                <Input type="text" placeholder="Company name" />
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
          <div className="skills__container grid" style={{ marginTop: "50px" }}>
            {skills.length == 0
              ? "Nothing"
              : skills?.map((skill: ExperienceType) => (
                  <div className="expereince__card" key={skill?._id}>
                    <h1>{skill?.workName}</h1>
                    <h1>{skill?.companyName}</h1>
                    <div className="experience__content">
                      <h4 className="desc-part">{skill?.description}</h4>
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
                  </div>
                ))}
          </div>
        </section>
      </div>
    </section>
  );
};

export default ExperiencesP;
