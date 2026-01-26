// import { useEffect, useState, useRef } from "react";
// import { Link, useParams } from "react-router-dom";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { FaVideo } from "react-icons/fa";
// import { IoCall, IoAttach, IoCameraOutline } from "react-icons/io5";
// import { MdAddReaction } from "react-icons/md";
// import { IoIosSend } from "react-icons/io";
// import moment from "moment";
// // import { useAuth } from "../../hooks/useAuth";
// import axios from "axios";
// import toast from "react-hot-toast";

// const ChatBox = () => {
//   const { userData } = useAuth();
//   const params = useParams();
//   const [friend, setFriend] = useState({});
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [editingMsgId, setEditingMsgId] = useState(null);
//   const [editingText, setEditingText] = useState("");
//   const [dropdownOpenId, setDropdownOpenId] = useState(null);
//   const scrollRef = useRef();
//   const pollingRef = useRef(null);

//   const fetchMessages = async () => {
//     if (!params.id || !userData?._id) return;
//     try {
//       const res = await axios.get(
//         `${import.meta.env.VITE_BACKEND_URL}/message/${params.id}?userId=${userData._id}`
//       );
//       setFriend(res.data.friend);
//       setMessages(res.data.messages);
//       scrollToBottom();
//     } catch (err) {
//       console.error("Failed to fetch messages:", err);
//     }
//   };

//   const scrollToBottom = () => {
//     setTimeout(() => {
//       scrollRef.current?.scrollTo({
//         top: scrollRef.current.scrollHeight,
//         behavior: "smooth",
//       });
//     }, 100);
//   };

//   useEffect(() => {
//     fetchMessages();

//     // auto re-fetch every 5 seconds
//     pollingRef.current = setInterval(fetchMessages, 5000);

//     return () => clearInterval(pollingRef.current);
//   }, [params.id, userData?._id]);

//   const sendMessage = async (e) => {
//     e.preventDefault();
//     if (!newMessage.trim()) return;

//     try {
//       const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/message/send`, {
//         senderId: userData._id,
//         receiverId: friend._id,
//         message: newMessage,
//       });

//       if (res.data.success) {
//         const msg = {
//           _id: Date.now(),
//           message: newMessage,
//           createdAt: new Date(),
//           senderId: userData._id,
//           receiverId: friend._id,
//         };
//         setMessages((prev) => [...prev, msg]);
//         setNewMessage("");
//         scrollToBottom();
//       }
//     } catch {
//       toast.error("Failed to send message");
//     }
//   };

//   const updateMessage = async (msgId) => {
//     try {
//       await axios.put(`${import.meta.env.VITE_BACKEND_URL}/message/update`, {
//         messageId: msgId,
//         message: editingText,
//       });
//       setMessages((prev) =>
//         prev.map((m) => (m._id === msgId ? { ...m, message: editingText } : m))
//       );
//       setEditingMsgId(null);
//       setEditingText("");
//       setDropdownOpenId(null);
//       toast.success("Message updated!");
//     } catch {
//       toast.error("Update failed");
//     }
//   };

//   const deleteMessage = async (msgId) => {
//     try {
//       await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/message/delete/${msgId}`);
//       setMessages((prev) => prev.filter((m) => m._id !== msgId));
//       setDropdownOpenId(null);
//       toast.success("Message deleted!");
//     } catch {
//       toast.error("Delete failed");
//     }
//   };

//   const copyText = (text) => {
//     navigator.clipboard.writeText(text);
//     toast.success("Copied to clipboard!");
//     setDropdownOpenId(null);
//   };

//   const formatDateTime = (dateStr) => {
//     const date = moment(dateStr);
//     const time = date.format("hh:mm A");
//     if (date.isSame(moment(), "day")) return `Today, ${time}`;
//     if (date.isSame(moment().subtract(1, "days"), "day")) return `Yesterday, ${time}`;
//     return `${date.format("MMM DD, YYYY")}, ${time}`;
//   };

//   return (
//     <div className="flex flex-col h-full w-full">
//       {/* Header */}
//       <div className="flex justify-between items-center border-b border-gray-300 p-3 bg-white shadow-sm">
//         <Link to={`/profile/${friend?._id}`} className="flex items-center gap-2">
//           <img
//             className="w-11 h-11 object-cover rounded-full border border-gray-300"
//             src={friend?.profile?.profilePhotoUrl || "/default.jpg"}
//             alt=""
//           />
//           <div>
//             <h1 className="font-semibold text-sm md:text-base">{friend?.name}</h1>
//             <p className="text-xs text-gray-500">@{friend?.username}</p>
//           </div>
//         </Link>
//         <div className="flex items-center gap-2 text-gray-600">
//           <IoCall className="cursor-pointer text-3xl hover:bg-gray-200 p-2 rounded-full" />
//           <FaVideo className="cursor-pointer text-3xl hover:bg-gray-200 p-2 rounded-full" />
//         </div>
//       </div>

//       {/* Messages */}
//       <div className="flex-1 flex flex-col justify-between overflow-hidden bg-[#f3f4f6]">
//         <div
//           ref={scrollRef}
//           className="flex-1 overflow-y-auto flex flex-col justify-end gap-3 p-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
//         >
//           {messages.map((msg) => {
//             const isSender = msg.senderId === userData._id;
//             return (
//               <div key={msg._id} className="flex flex-col">
//                 <p className="text-center text-xs text-gray-400 my-1">
//                   {formatDateTime(msg.createdAt)}
//                 </p>
//                 <div
//                   className={`flex items-end gap-2 ${isSender ? "justify-end" : "justify-start"}`}
//                 >
//                   {!isSender && (
//                     <img
//                       className="w-8 h-8 object-cover rounded-full border border-gray-300"
//                       src={friend?.profile?.profilePhotoUrl || "/default.jpg"}
//                       alt=""
//                     />
//                   )}
//                   <div className="relative max-w-[70%]">
//                     <div
//                       className={`px-4 py-2 rounded-2xl shadow-sm ${
//                         isSender
//                           ? "bg-blue-500 text-white rounded-br-none"
//                           : "bg-white text-black rounded-bl-none"
//                       }`}
//                     >
//                       {editingMsgId === msg._id ? (
//                         <div className="flex gap-2">
//                           <input
//                             type="text"
//                             value={editingText}
//                             onChange={(e) => setEditingText(e.target.value)}
//                             className="px-3 py-1 rounded-full border w-full text-black"
//                           />
//                           <button
//                             onClick={() => updateMessage(msg._id)}
//                             className="bg-blue-500 text-white px-3 rounded-full text-sm"
//                           >
//                             Save
//                           </button>
//                         </div>
//                       ) : (
//                         msg.message
//                       )}
//                     </div>

//                     {/* Dropdown */}
//                     <div className={`absolute top-2 ${isSender ? "-left-6" : "-right-6"}`}>
//                       <BsThreeDotsVertical
//                         className="cursor-pointer text-gray-500 hover:text-black"
//                         onClick={() =>
//                           setDropdownOpenId(dropdownOpenId === msg._id ? null : msg._id)
//                         }
//                       />
//                       {dropdownOpenId === msg._id && (
//                         <div className="absolute top-6 right-0 bg-white border rounded-lg shadow-lg z-50 w-32">
//                           {isSender ? (
//                             <>
//                               <button
//                                 onClick={() => {
//                                   setEditingMsgId(msg._id);
//                                   setEditingText(msg.message);
//                                   setDropdownOpenId(null);
//                                 }}
//                                 className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
//                               >
//                                 Edit
//                               </button>
//                               <button
//                                 onClick={() => deleteMessage(msg._id)}
//                                 className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
//                               >
//                                 Delete
//                               </button>
//                               <button
//                                 onClick={() => copyText(msg.message)}
//                                 className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
//                               >
//                                 Copy
//                               </button>
//                             </>
//                           ) : (
//                             <>
//                               <button
//                                 onClick={() => copyText(msg.message)}
//                                 className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
//                               >
//                                 Copy
//                               </button>
//                               <button
//                                 onClick={() => deleteMessage(msg._id)}
//                                 className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
//                               >
//                                 Delete
//                               </button>
//                             </>
//                           )}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                   {isSender && (
//                     <img
//                       className="w-8 h-8 object-cover rounded-full border border-gray-300"
//                       src={userData?.profile?.profilePhotoUrl || "/default.jpg"}
//                       alt=""
//                     />
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Input */}
//       <form onSubmit={sendMessage} className="p-3 border-t bg-white flex items-center gap-3">
//         <MdAddReaction className="text-xl cursor-pointer" />
//         <input
//           type="text"
//           placeholder="Message..."
//           className="flex-1 border rounded-full px-4 py-2 outline-none"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//         />
//         <IoAttach className="text-xl cursor-pointer" />
//         <IoCameraOutline className="text-xl cursor-pointer" />
//         <button
//           type="submit"
//           className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
//         >
//           <IoIosSend size={20} />
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ChatBox;








// import { useEffect, useState, useRef } from "react";
// import { Link, useParams } from "react-router-dom";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { FaVideo } from "react-icons/fa";
// import { IoCall, IoAttach, IoCameraOutline } from "react-icons/io5";
// import { MdAddReaction } from "react-icons/md";
// import { IoIosSend } from "react-icons/io";
// import moment from "moment";
// // import { useAuth } from "../../hooks/useAuth";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { io } from "socket.io-client";

// const socket = io(import.meta.env.VITE_BACKEND_URL);

// const ChatBox = () => {
//   const { userData } = useAuth();
//   const params = useParams();
//   const [friend, setFriend] = useState({});
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [menuOpen, setMenuOpen] = useState(null);
//   const scrollRef = useRef();

//   const fetchMessages = async () => {
//     if (!params.id || !userData?._id) return;
//     try {
//       const res = await axios.get(
//         `${import.meta.env.VITE_BACKEND_URL}/message/${params.id}?userId=${userData._id}`
//       );
//       setFriend(res.data.friend);
//       setMessages(res.data.messages);
//       scrollToBottom();
//     } catch (err) {
//       console.error("Failed to fetch messages:", err);
//     }
//   };

//   const scrollToBottom = () => {
//     setTimeout(() => {
//       scrollRef.current?.scrollTo({
//         top: scrollRef.current.scrollHeight,
//         behavior: "smooth",
//       });
//     }, 100);
//   };

//   useEffect(() => {
//     if (!userData?._id) return;
//     socket.emit("join_room", userData._id);

//     fetchMessages();

//     socket.on("receive_message", (msg) => {
//       if (msg.senderId !== userData._id && (msg.senderId === params.id || msg.receiverId === params.id)) {
//         setMessages((prev) => [...prev, msg]);
//         scrollToBottom();
//       }
//     });

//     return () => {
//       socket.off("receive_message");
//     };
//   }, [params.id, userData?._id]);

//   const sendMessage = async (e) => {
//     e.preventDefault();
//     if (!newMessage.trim()) return;

//     const msgData = {
//       senderId: userData._id,
//       receiverId: friend._id,
//       message: newMessage,
//     };

//     // locally update first
//     setMessages((prev) => [
//       ...prev,
//       { ...msgData, createdAt: new Date(), _id: Date.now() },
//     ]);
//     setNewMessage("");
//     scrollToBottom();

//     try {
//       await axios.post(`${import.meta.env.VITE_BACKEND_URL}/message/send`, msgData);

//       socket.emit("send_message", {
//         ...msgData,
//         createdAt: new Date(),
//       });
//     } catch {
//       toast.error("Failed to send message");
//     }
//   };

//   const formatDateTime = (dateStr) => {
//     const date = moment(dateStr);
//     const time = date.format("hh:mm A");
//     if (date.isSame(moment(), "day")) return `Today, ${time}`;
//     if (date.isSame(moment().subtract(1, "days"), "day")) return `Yesterday, ${time}`;
//     return `${date.format("MMM DD, YYYY")}, ${time}`;
//   };

//   const handleDelete = async (msgId) => {
//     try {
//       await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/message/${msgId}`);
//       setMessages((prev) => prev.filter((m) => m._id !== msgId));
//     } catch {
//       toast.error("Failed to delete message");
//     }
//   };

//   const handleEdit = async (msgId) => {
//     const newMsg = prompt("Edit message:");
//     if (!newMsg) return;
//     try {
//       await axios.put(`${import.meta.env.VITE_BACKEND_URL}/message/${msgId}`, { message: newMsg });
//       setMessages((prev) =>
//         prev.map((m) => (m._id === msgId ? { ...m, message: newMsg } : m))
//       );
//     } catch {
//       toast.error("Failed to edit message");
//     }
//   };

//   const handleCopy = (text) => {
//     navigator.clipboard.writeText(text);
//     toast.success("Copied to clipboard!");
//   };

//   return (
//     <div className="flex flex-col h-full w-full">
//       {/* Header */}
//       <div className="flex justify-between items-center border-b border-gray-300 p-3 bg-white shadow-sm">
//         <Link to={`/profile/${friend?._id}`} className="flex items-center gap-2">
//           <img
//             className="w-11 h-11 object-cover rounded-full border border-gray-300"
//             src={friend?.profile?.profilePhotoUrl || "/default.jpg"}
//             alt=""
//           />
//           <div>
//             <h1 className="font-semibold text-sm md:text-base">{friend?.name}</h1>
//             <p className="text-xs text-gray-500">@{friend?.username}</p>
//           </div>
//         </Link>
//         <div className="flex items-center gap-2 text-gray-600">
//           <IoCall className="cursor-pointer text-3xl hover:bg-gray-200 p-2 rounded-full" />
//           <FaVideo className="cursor-pointer text-3xl hover:bg-gray-200 p-2 rounded-full" />
//         </div>
//       </div>

//       {/* Messages */}
//       <div className="flex-1 flex flex-col justify-end overflow-hidden bg-[#f3f4f6]">
//         <div
//           ref={scrollRef}
//           className="flex-1 overflow-y-auto flex flex-col-reverse gap-3 p-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
//         >
//           {messages.slice().reverse().map((msg) => {
//             const isSender = msg.senderId === userData._id;
//             return (
//               <div key={msg._id} className="flex flex-col">
//                 <p className="text-center text-[10px] md:text-xs text-gray-400 my-1">
//                   {formatDateTime(msg.createdAt)}
//                 </p>
//                 <div className={`flex items-end gap-2 ${isSender ? "justify-end" : "justify-start"} md:text-[16px] text-xs`}>
//                   {!isSender && (
//                     <img
//                       className="w-8 h-8 object-cover rounded-full border border-gray-300"
//                       src={friend?.profile?.profilePhotoUrl || "/default.jpg"}
//                       alt=""
//                     />
//                   )}
//                   <div className="relative max-w-[70%]">
//                     <div
//                       className={`px-4 py-2 rounded-2xl shadow-sm ${isSender ? "bg-blue-500 text-white rounded-br-none" : "bg-white text-black rounded-bl-none "
//                         }`}
//                     >
//                       {msg.message}
//                     </div>
//                     <div className={`absolute top-3 -right-5`}>
//                       <BsThreeDotsVertical
//                         className="cursor-pointer p-1 text-xl"
//                         onClick={() => setMenuOpen(menuOpen === msg._id ? null : msg._id)}
//                       />
//                       {menuOpen === msg._id && (
//                         <div className="absolute right-0 mt-5 bg-white shadow-md rounded-md z-50 w-28">
//                           <ul className="flex flex-col">
//                             <li
//                               className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
//                               onClick={() => handleCopy(msg.message)}
//                             >
//                               Copy
//                             </li>
//                             {isSender && (
//                               <li
//                                 className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
//                                 onClick={() => handleEdit(msg._id)}
//                               >
//                                 Edit
//                               </li>
//                             )}
//                             <li
//                               className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
//                               onClick={() => handleDelete(msg._id)}
//                             >
//                               Delete
//                             </li>
//                           </ul>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                   {isSender && (
//                     <img
//                       className="w-8 h-8 object-cover rounded-full border border-gray-300"
//                       src={userData?.profile?.profilePhotoUrl || "/default.jpg"}
//                       alt=""
//                     />
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Input */}
//       <form onSubmit={sendMessage} className="p-3 border-t bg-white flex items-center gap-3">
//         <MdAddReaction className="text-xl cursor-pointer" />
//         <input
//           type="text"
//           placeholder="Message..."
//           className="flex-1 border w-30 rounded-full px-4 py-2 outline-none"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//         />
//         <IoAttach className="text-xl cursor-pointer" />
//         <IoCameraOutline className="text-xl cursor-pointer" />
//         <button type="submit" className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600">
//           <IoIosSend size={20} />
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ChatBox;

