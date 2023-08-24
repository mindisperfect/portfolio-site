// import { useEffect, useState } from "react";
// import { request } from "../../../server/request";
// import { PersonalInfoType } from "../../../types/types";
// import { Spin } from "antd";
// import { LoadingOutlined } from "@ant-design/icons";

// const Info = () => {
//   const [infos, setInfo] = useState([]);

//   const getInfosss = async () => {
//     try {
//       const { data } = await request.get("auth/me");
//       console.log(data);
//       setInfo(data?.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   useEffect(() => {
//     getInfosss();
//   }, []);

//   const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;
//   return (
//     <>
//       {loading ? (
//         <Spin
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             paddingBottom: "50px",
//           }}
//           indicator={antIcon}
//         />
//       ) : (
//         infos?.map((el: PersonalInfoType) => {
//           return (
//             <li className="info__item" key={el?._id}>
//               <span className="info__title"></span>
//               <span className="info__description">
//                 First name : {el?.firstName}
//                 Last name : {el?.lastName}
//                 Username : {el?.username}
//                 Info : {el?.info}
//                 Phone number : {el?.phoneNumber}
//                 Birthday : {el?.birthday.split("T")[0]}
//                 Address : {el?.address}
//                 Email : {el?.email}
//                 Github : {el?.github}
//                 Telegram : {el?.telegram}
//               </span>
//             </li>
//           );
//         })
//       )}
//     </>
//   );
// };

// export default Info;

// {
//   firstName,
//   lastName,
//   username,
//   info,
//   phoneNumber,
//   birthday,
//   address,
//   email,
//   github,
//   telegram,
//   _id,
// }



// const Info = ({ user }) => {
//   return (
//     <>
        {/* {infos?.map((el: InfosType) => {
          return (
        //     <li className="info__item" key={el?._id}>
        //     <span className="info__title"></span>
        //     <span className="info__description">
        //       First name : {el?.firstName}
        //     </span>
        //   </li>
        <li className="info__item" key={el?._id}>
            {el?.firstName}
          </li>
          )
        })} */}
      {/* <p>First Name: {user.firstName}</p>
      <p>Last Name: {user.lastName}</p>
      <p>Email: {user.email}</p>
      <p>Birthday: {user.birthday}</p>
      <p>Address: {user.address}</p>
      <p>Phone Number: {user.phoneNumber}</p>
      <p>Github: {user.github}</p>
      <p>Telegram: {user.telegram}</p>
      <p>Info: {user.info}</p>
      <p>Role: {user.role}</p>
      <p>Created At: {user.createdAt}</p>
      <p>GitHub: {user.github}</p>
      <p>Fields: {user.fields.join(', ')}</p> */}
      {/* <img src={user.photo} alt="User Photo" /> */}

{/* 
      {JSON.stringify(infos)}  */}
    {/* </>
  );
};

export default Info; */}
