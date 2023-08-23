import { useEffect, useState } from "react";
import { Spin, Modal, Button, Form, Input, message, Empty } from "antd";
import { LoadingOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { request } from "../../server/request";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../../pages/user/about/about.scss";
import "../../components/styles/clientPanelStyles/skills.scss";
import { SkillsType } from "../../types/types";

const SkillsP = () => {
  const [skills, setSkills] = useState<SkillsType[]>([]);
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

  const getSkills = async () => {
    try {
      const { data } = await request.get(
        // `skills${ROLE === 'client' ? `?user[in]=${USER_ID}` : ''}`
        "skills?user=64dde9e1dccb1b00143b2e8e"
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
    getSkills();
  }, []);

  const onFinish = async (values: SkillsType) => {
    try {
      const { name, percent } = values;
      const skillData = { name, percent };
      if (selected) {
        const response = await request.put(`skills/${selected}`, skillData);
        if (response.status === 200) {
          getSkills();
          hideModal();
        } 
      } else {
        const response = await request.post("skills", skillData);
        if (response.status === 201) {
          getSkills();
          hideModal();
          message.success('You can also check here')
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const setEditingValues = (data: SkillsType) => {
    form.setFieldsValue({ name: data.name, percent: data.percent });
  };

  const openModal = () => {
    showModal();
    form.resetFields();
    setSelected(null)
  };

  async function editSkill(id: string) {
    try {
      const { data } = await request.get(`skills/${id}`);
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
        content: "Dou wou want to delete this skill ?",
        okText: "Delete",
        cancelText: "Cancel",
        onOk: async () => {
          await request.delete(`skills/${id}`);
          message.success("Post deleted");
          getSkills();
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
          <h2>My Skills</h2>
          <button onClick={openModal}>Add</button>
        </div>
        <Modal
          title={selected ? "Editing skill" : "Adding new skill"}
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
              <Input placeholder="Enter a name" />
            </Form.Item>
            <Form.Item
              name="percent"
              label="Percent"
              rules={[
                {
                  required: true,
                  message: "Percent is required",
                },
              ]}
            >
              <Input type="number" placeholder="Enter number" />
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
              {selected ? "Edit skill" : "Create skill"}
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
              ? <Empty />
              : skills?.map((skill: SkillsType) => (
                  <div className="progress__boxss" key={skill?._id}>
                    <div className="progress__circle">
                      <CircularProgressbar
                        strokeWidth={7.5}
                        text={`${skill?.percent}%`}
                        value={skill.percent}
                      />
                    </div>
                    <h3 className="skills__title">{skill?.name}</h3>
                    <div className="btns">
                      <Button
                        type="primary"
                        onClick={() => editSkill(skill?._id)} >
                        Edit
                      </Button>
                      <Button danger onClick={() => deletePost(skill?._id)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
          </div>
        </section>
      </div>
    </section>
  );
};

export default SkillsP;




