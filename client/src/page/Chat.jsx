import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import BaseUrl from '../BaseUrl';
import Conversation from '../components/Conversation';
import Context from '../context/Context';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import "../scroll.css"

function ChatApp() {

  const [userChats, setUserChats] = useState([]);
  const [selectedChatMessage, setSelectedChatMessage] = useState([]);
  const context = useContext(Context);
  const { conversationId, setConversationId } = context
  const [typedMessage, setTypedMessage] = useState("");
  const [chatId, setChatId] = useState("");
  const messageContainer = useRef();
  const messageContainerSm = useRef();
  const [activeUsers, setActiveUsers] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState({});
  const [searchUsers, setSearchUsers] = useState();
  const searchRef = useRef();
  const messageInput = document.getElementById("messageInput");
  const messageInputsm = document.getElementById("messageInputsm");
  const getUserChats = async () => {

    const { data } = await axios.get(`${BaseUrl}/chat/${localStorage.getItem("currentUserId")}`)
    setUserChats(data);

  }

  const getSelectedChats = async () => {

    const chatIdd = await axios.get(`${BaseUrl}/chat/find/${localStorage.getItem("currentUserId")}/${conversationId}`)
    const { data } = await axios.get(`${BaseUrl}/message/${chatIdd.data._id}`)

    if (chatIdd.data == "no chat found") {

      const createChat = await axios.post(`${BaseUrl}/chat`,
        {
          senderId: localStorage.getItem("currentUserId"),
          receverId: conversationId
        })

      getUserChats();
    }
    setChatId(chatIdd.data);
    setSelectedChatMessage(data);
  }

  const socket = io('ws://localhost:3001');
  const sendMessage = async () => {
    const chatIdd = await axios.get(`${BaseUrl}/chat/find/${localStorage.getItem("currentUserId")}/${conversationId}`)
    const { data } = await axios.post(`${BaseUrl}/message`, {
      chatId: chatIdd.data._id,
      senderId: localStorage.getItem("currentUserId"),
      text: typedMessage
    });

    const message = {
      chatId: chatIdd.data._id,
      senderId: localStorage.getItem("currentUserId"),
      receverId: conversationId,
      text: typedMessage
    };

    socket.emit('message', message)
    setSelectedChatMessage((prev) => [...prev, message]);
  }



  useEffect(() => {
    getUserChats();
    getSelectedChats();
    document.querySelector(".mountPage")?.classList?.add("py-0")
    document.querySelector(".mountPage")?.classList?.add("px-0")
  }, [conversationId])





  useEffect(() => {
    socket.emit('new-user', localStorage.getItem("currentUserId"));
    socket.on('get-message', (message) => {
      setArrivalMessage({
        senderId: message.senderId,
        receverId: message.receverId,
        text: message.text
      })
    })
  }, [])


  useEffect(() => {

    arrivalMessage &&

      chatId?.members?.includes(arrivalMessage.senderId) &&
      setSelectedChatMessage((prev) => [...prev, arrivalMessage]);

  }, [arrivalMessage, chatId])


  useEffect(() => {
    messageContainer.current.scrollTop = messageContainer.current.scrollHeight
    messageContainerSm.current.scrollTop = messageContainerSm.current.scrollHeight
  })


  const handleSearchUser = async () => {
    const { data } = await axios.get(`${BaseUrl}/user/username/${searchRef.current.value}`)
    setSearchUsers(data);
  }



  const handleSmLayout = () => {
    const conversationColSm = document.getElementById("conversationColSm");
    conversationColSm.style.display = "flex"
  }

  // messageInput?.addEventListener('keyup', (e)=>{
  //   if(e.key === "Enter"){
  //       sendMessage();
  //   }
  // })

  // messageInputsm?.addEventListener('keyup', (e)=>{
  //   if(e.key === "Enter"){
  //       sendMessage();
  //   }
  // })

  return (
    <div className='flex h-screen w-screen justify-center items-center sm:max-h-[95vh] bg-[#425ee8]'>

      {/* style={{boxShadow:"0px 0px 10px 10px rgba(54,56,69,1)"}} */}
      <div className="flex sm:relative w-[80%] h-[80%] sm:w-[95vw] sm:h-[90%] z-10">
        {/* Conversations column */}
        <div className="w-[30%] sm:hidden h-full bg-white shadow-md z-10 bg-[#2e42a2]">
          <div className='px-2 py-2 relative'>
            <input ref={searchRef} type="text" placeholder='serach user' className='bg-cardColor rounded px-2 w-[100%]' />
            <button onClick={handleSearchUser} className='absolute right-[20px]'>Search</button>
          </div>
          {/* search users appears here */}

          {
            searchUsers &&

            <div className="p-4 overflow-y-scroll max-h-96 my-custom-scroll" >
              <div className='flex gap-[10px] text-xs w-[17rem] justify-between my-2'>

                <div className='flex gap-4'>
                  {
                    searchUsers?.profilePicture ?
                      <img src={`${BaseUrl}/images/${searchUsers.profilePicture}`} className='w-[3.5rem] rounded-[50%] h-[3.5rem]' />
                      : <FaUserAlt className='w-[3.5rem] rounded-[50%] h-[3.5rem]' />
                  }
                  <div className='flex flex-col justify-center font-bold capitalize'>
                    <button onClick={() => context.setConversationId(searchUsers._id)}>
                      <p className='text-[white] capitalize text-[14px]'>{searchUsers.firstname}</p>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          }

          {/* <h2 className="text-gray-800 font-semibold mb-2 p-4 border-b border-gray-300">Conversations</h2> */}
          <Link to={"/"} className='text-[white] ml-2'>Home</Link>
          <Link to={`/profile/${localStorage.getItem("currentUserId")}`} className='text-[white] ml-2'>Profile</Link>
          <Link to={"/auth"} className='text-[white] ml-2'>Logout</Link>
          <div className="p-4 overflow-y-auto max-h-96">
            {/* {conversations.map((conversation) => ( */}
            {
              userChats.map(c =>
                <Conversation conversationData={c} />
              )
            }
          </div>
        </div>


        {/* conversation column for sm device */}

        <div id='conversationColSm' className="w-[30%] sm:flex hidden flex-col sm:w-full h-full bg-white shadow-md z-10 bg-[#2e42a2]">
          <div className='px-2 py-2 relative'>
            <input ref={searchRef} type="text" placeholder='serach user' className='bg-cardColor rounded px-2 w-[100%]' />
            <button onClick={handleSearchUser} className='absolute right-[20px]'>Search</button>
          </div>
          {/* search users appears here */}

          {
            searchUsers &&

            <div className="p-4 overflow-y-scroll max-h-96 my-custom-scroll" >
              <div className='flex gap-[10px] text-xs w-[17rem] justify-between sm:w-full my-2'>

                <div className='flex gap-4'>
                  {
                    searchUsers?.profilePicture ?
                      <img src={`${BaseUrl}/images/${searchUsers.profilePicture}`} className='w-[3.5rem] rounded-[50%] h-[3.5rem]' />
                      : <FaUserAlt className='w-[3.5rem] rounded-[50%] h-[3.5rem]' />
                  }
                  <div className='flex flex-col justify-center font-bold capitalize'>
                    <button onClick={() => context.setConversationId(searchUsers._id)}>
                      <p className='text-[white] capitalize text-[14px]'>{searchUsers.firstname}</p>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          }

          {/* <h2 className="text-gray-800 font-semibold mb-2 p-4 border-b border-gray-300">Conversations</h2> */}
        
          <div className="p-4 overflow-y-auto max-h-96">
            {/* {conversations.map((conversation) => ( */}
            {
              userChats.map(c =>
                <Conversation conversationData={c} />
              )
            }
          </div>
        </div>

        {/* Messages column */}
        <div className="w-[70%] sm:hidden message-col h-full bg-white relative shadow-md bg-[#0a0a14]">
          {selectedChatMessage ? (
            <>
              {/* <h2 className="text-gray-800 font-semibold mb-2 p-4 border-b border-gray-300">{conversations.find((c) => c.id === selectedChat)?.name}</h2> */}
              <div className="p-4 overflow-y-auto max-h-[95%]" ref={messageContainer}>
                {selectedChatMessage?.map((message) => (
                  <div

                    key={message.id}
                    className={`rounded-lg my-2 ${message.senderId == localStorage.getItem("currentUserId") ?
                      'flex justify-end' :
                      'flex justify-start'
                      }`}
                  >
                    {
                      message.senderId == localStorage.getItem("currentUserId") ?
                        <span className="text-sm bg-[#151542] text-[white] rounded-lg py-2 px-2">{message.text}</span>
                        : <span className="text-sm bg-[#1e1033] text-[white] rounded-lg py-2 px-2">{message.text}</span>

                    }
                  </div>
                ))}


              </div>
            </>
          ) : (
            <p className="text-gray-500 text-center p-4">No conversation selected</p>
          )}

          <div className='absolute bottom-0 w-full'>
            <input id='messageInput' type="text" className='bg-[white] w-[90%] px-2' onChange={(e) => setTypedMessage(e.target.value)} />
            <button className='text-[white] bg-video w-[10%]' onClick={sendMessage}>Send</button>
          </div>

        </div>


        {/* message colum for sm device */}

        <div id='messageColSm' className="sm:w-full sm:absolute hidden sm:flex flex-col message-col h-full bg-white relative shadow-md bg-[#0a0a14]">
          <div className='px-2 py-1 flex'>
            <Conversation id={conversationId} />
            <button onClick={handleSmLayout} className='text-[white] px-2'>Back</button>
          </div>
          {selectedChatMessage ? (
            <>
              {/* <h2 className="text-gray-800 font-semibold mb-2 p-4 border-b border-gray-300">{conversations.find((c) => c.id === selectedChat)?.name}</h2> */}
              <div className="p-4 w-full overflow-y-auto max-h-[85%]" ref={messageContainerSm}>
                {selectedChatMessage?.map((message) => (
                  <div

                    key={message.id}
                    className={`rounded-lg my-2 ${message.senderId == localStorage.getItem("currentUserId") ?
                      'flex justify-end' :
                      'flex justify-start'
                      }`}
                  >
                    {
                      message.senderId == localStorage.getItem("currentUserId") ?
                        <span className="text-sm bg-[#151542] text-[white] rounded-lg py-2 px-2">{message.text}</span>
                        : <span className="text-sm bg-[#1e1033] text-[white] rounded-lg py-2 px-2">{message.text}</span>

                    }
                  </div>
                ))}


              </div>
            </>
          ) : (
            <p className="text-gray-500 text-center p-4">No conversation selected</p>
          )}

          <div className='absolute bottom-0 w-full'>
            <input id='messageInputsm' type="text" className='bg-[white] w-[90%] px-2' onChange={(e) => setTypedMessage(e.target.value)} />
            <button className='text-[white] bg-video w-[10%]' onClick={sendMessage}>Send</button>
          </div>

        </div>
      </div>

    </div>

  );
}

export default ChatApp;
