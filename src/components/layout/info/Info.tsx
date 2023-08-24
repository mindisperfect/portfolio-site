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


// import { useEffect, useState } from "react";
// import { request } from "../../../server/request";

// const Info = () => {
//   const [infos, setInfo] = useState([]);

//   const getInfosss = async () => {
//     try {
//       const { data } = await request.get("users/64dde9e1dccb1b00143b2e8e");
//       console.log(data);
//       setInfo(data?.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   useEffect(() => {
//     getInfosss();
//   }, []);

//   return (
//     <>
//         {infos?.map((el) => {
//           return (
//             <li className="info__item" key={el?._id}>
//             <span className="info__title"></span>
//             <span className="info__description">
//               First name : {el?.firstName}
//             </span>
//           </li>
//           )
//         })}

//       {/* {JSON.stringify(infos)}  */}
//     </>
//   );
// };

// export default Info;
