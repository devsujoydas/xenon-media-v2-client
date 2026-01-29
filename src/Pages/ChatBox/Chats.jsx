// // import React, { useEffect, useState, useRef } from "react";
// // import { Outlet, useNavigate } from "react-router-dom";
// // // import { useAuth } from "../../hooks/useAuth";
// // import moment from "moment";
// // import axios from "axios";

// // const ChatListItem = ({ chat, onClick }) => {
// //   const lastMsg = chat?.lastMessage || "No messages yet";
// //   const lastMsgTime = chat?.lastMessageTime
// //     ? moment(chat.lastMessageTime).calendar({
// //       sameDay: "h:mm A",
// //       lastDay: "[Yesterday]",
// //       lastWeek: "MMM D",
// //       sameElse: "MMM D",
// //     })
// //     : "";

// //   return (
// //     <div
// //       onClick={onClick}
// //       className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer transition-all border-b rounded-lg mx-2 my-1"
// //     >
// //       {/* Profile Photo */}
// //       <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
// //         <img
// //           src={chat?.friend?.profile?.profilePhotoUrl || "/default.jpg"}
// //           alt={chat?.friend?.name}
// //           className="w-full h-full object-cover"
// //         />
// //         {/* Active status */}
// //         <span
// //           className={`absolute bottom-1 right-1 w-3.5 h-3.5 border-2 border-white rounded-full ${chat?.friend?.onlineStatus ? "bg-green-500" : "bg-gray-400"
// //             }`}
// //         ></span>
// //       </div>

// //       {/* Friend info */}
// //       <div className="flex justify-between items-start w-full">
// //         <div className="flex flex-col overflow-hidden">
// //           <p className="font-semibold text-sm truncate">{chat?.friend?.name}</p>
// //           <p className="text-xs text-gray-500 truncate max-w-[200px]">{lastMsg}</p>
// //         </div>
// //         <p className="text-xs text-gray-400 whitespace-nowrap ml-2">{lastMsgTime}</p>
// //       </div>
// //     </div>
// //   );
// // };

// // const Chats = () => {
// //   const { userData } = useAuth();
// //   const [chatList, setChatList] = useState([]);
// //   const navigate = useNavigate();
// //   const pollingRef = useRef(null);

// //   const fetchChats = async () => {
// //     if (!userData?._id) return;
// //     try {
// //       const res = await axios.get(
// //         `${import.meta.env.VITE_BACKEND_URL}/message?userId=${userData._id}`
// //       );

// //       // Sort chats: newest message on top
// //       const sortedChats = res.data.sort((a, b) => {
// //         const timeA = a.lastMessageTime ? new Date(a.lastMessageTime).getTime() : 0;
// //         const timeB = b.lastMessageTime ? new Date(b.lastMessageTime).getTime() : 0;
// //         return timeB - timeA;
// //       });

// //       setChatList(sortedChats);
// //     } catch (err) {
// //       console.error("Failed to fetch chats:", err);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchChats();

// //     // Real-time polling (every 5 sec)
// //     pollingRef.current = setInterval(fetchChats, 2000);
// //     return () => clearInterval(pollingRef.current);
// //   }, [userData?._id]);

// //   const handleSelectFriend = (chat) => {
// //     navigate(`/message/${chat.friend._id}`);
// //   };

// //   return (
// //     <div className="flex h-screen bg-gray-50">
// //       {/* Left sidebar: Chat list */}
// //       <div className="flex-1 flex flex-col bg-gray-100">
// //         <Outlet />
// //       </div>

// //       {/* Right side: Chat conversation area */}
// //       <div className="w-[360px] border-r border-gray-300 bg-white flex flex-col">
// //         <h2 className="text-lg font-semibold p-4 py-5 border-b bg-gray-50">Chats</h2>
// //         <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 p-2">
// //           {chatList.length > 0 ? (
// //             chatList.map((chat) => (
// //               <ChatListItem
// //                 key={chat.friend._id}
// //                 chat={chat}
// //                 onClick={() => handleSelectFriend(chat)}
// //               />
// //             ))
// //           ) : (
// //             <p className="text-center text-gray-500 py-10">
// //               No friends or chats yet.
// //             </p>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Chats;



// import React, { useEffect, useState } from "react";
// import { Outlet, useNavigate } from "react-router-dom";
// // import { useAuth } from "../../hooks/useAuth";
// import moment from "moment";
// import axios from "axios";
// import { io } from "socket.io-client";

// const socket = io(import.meta.env.VITE_BACKEND_URL); // connect socket

// const ChatListItem = ({ chat, onClick }) => {
//   const lastMsg = chat?.lastMessage || "No messages yet";
//   const lastMsgTime = chat?.lastMessageTime
//     ? moment(chat.lastMessageTime).calendar({
//         sameDay: "h:mm A",
//         lastDay: "[Yesterday]",
//         lastWeek: "MMM D",
//         sameElse: "MMM D",
//       })
//     : "";

//   return (
//     <div
//       onClick={onClick}
//       className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer transition-all border-b rounded-lg mx-2 my-1"
//     >
//       <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
//         <img
//           src={chat?.friend?.profile?.profilePhotoUrl || "/default.jpg"}
//           alt={chat?.friend?.name}
//           className="w-full h-full object-cover"
//         />
//         <span
//           className={`absolute bottom-1 right-1 w-3.5 h-3.5 border-2 border-white rounded-full ${
//             chat?.friend?.onlineStatus ? "bg-green-500" : "bg-gray-400"
//           }`}
//         ></span>
//       </div>

//       <div className="flex justify-between items-start w-full">
//         <div className="flex flex-col overflow-hidden">
//           <p className="font-semibold text-sm truncate">{chat?.friend?.name}</p>
//           <p className="text-xs text-gray-500 truncate max-w-[200px]">{lastMsg}</p>
//         </div>
//         <p className="text-xs text-gray-400 whitespace-nowrap ml-2">{lastMsgTime}</p>
//       </div>
//     </div>
//   );
// };

// const Chats = () => {
//   const { userData } = useAuth();
//   const [chatList, setChatList] = useState([]);
//   const navigate = useNavigate();

//   const fetchChats = async () => {
//     if (!userData?._id) return;
//     try {
//       const res = await axios.get(
//         `${import.meta.env.VITE_BACKEND_URL}/message?userId=${userData._id}`
//       );
//       setChatList(res.data);
//     } catch (err) {
//       console.error("Failed to fetch chats:", err);
//     }
//   };

//   useEffect(() => {
//     if (!userData?._id) return;

//     // join socket room for online status
//     socket.emit("join_room", userData._id);

//     fetchChats();

//     // listen for live messages
//     socket.on("receive_message", (msg) => {
//       // update lastMessage in chat list
//       setChatList((prev) =>
//         prev.map((chat) => {
//           if (chat.friend._id === msg.senderId || chat.friend._id === msg.receiverId) {
//             return {
//               ...chat,
//               lastMessage: msg.message,
//               lastMessageTime: msg.createdAt,
//             };
//           }
//           return chat;
//         })
//       );
//     });

//     return () => {
//       socket.off("receive_message");
//     };
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [userData?._id]);

//   const handleSelectFriend = (chat) => {
//     navigate(`/message/${chat.friend._id}`);
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-50 md:flex-row flex-col-reverse">
//       <div className="flex-1 flex flex-col bg-gray-100">
//         <Outlet />
//       </div>

//       <div className="md:w-[360px]  border-r border-gray-300 bg-white flex flex-col">
//         <h2 className="text-lg font-semibold p-4 py-5 border-b bg-gray-50">Chats</h2>
//         <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 p-2">
//           {chatList.length > 0 ? (
//             chatList.map((chat) => (
//               <ChatListItem
//                 key={chat.friend._id}
//                 chat={chat}
//                 onClick={() => handleSelectFriend(chat)}
//               />
//             ))
//           ) : (
//             <p className="text-center text-gray-500 py-10">No friends or chats yet.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chats;
