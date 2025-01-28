'use client'
import { useChat } from "ai/react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import defaultAvatar from '@/assets/images/avatar.png';
import prepAvatar from '@/assets/images/prep-avatar.jpg';
import { createChat } from "@/services/chats-api";
import { createMessage, getMessages } from "@/services/message-api";
import useUserStore from "@/store/useUserStore";

const Dashboard = () => {
  const { userInfo } = useUserStore()
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/openai",
  });
  const [chatId, setChatId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const chatContainer = useRef<HTMLDivElement>(null);
  const scroll = () => {
    if (chatContainer.current) {
      const { offsetHeight, scrollHeight, scrollTop } = chatContainer.current;
      if (scrollHeight >= scrollTop + offsetHeight) {
        chatContainer.current.scrollTo(0, scrollHeight + 200);
      }
    }
  };

  useEffect(() => {
    scroll();
  }, [messages]);

  const initChat = async () => {
    if (!chatId) {
      try {
        const title = "New Chat";
        const user = userInfo.id;
        const chat = await createChat(user!, title);
        setChatId(chat.id);
      } catch (err) {
        setError("Failed to initialize chat. Please try again.");
      }
    }
  };

  useEffect(() => {
    initChat();
  }, [userInfo]);

  const handleSubmitWithSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.clear()
    if (!chatId && userInfo.id) {
      try {
        const title = "New Chat";
        const user = userInfo.id;
        const data = await createChat(user, title);
        if(data.success){
          const chat = data.data
          setChatId(chat._id);  
          const newMessage = {
            chatId: chat._id,
            role: 'user',
            content: input,
            createdAt: new Date(),
          };
          const msgCreated = await createMessage(newMessage);
        }
       
      } catch (err) {
        setError("Failed to create chat or save message. Please try again.");
        return;
      }
    } else if (chatId) {
      const userMessage = {
        chatId,
        role: 'user',
        content: input,
        createdAt: new Date(),
      };
      const msgCreated = await createMessage(userMessage);
    }

    handleSubmit(e);
  };


  const renderResponse = () => {
    return (
      <div className="response md:p-[30px]">
        {messages.map((m, index) => (
          <div
            key={m.id}
            className={`chat-line ${m.role === "user" ? "user-chat" : "ai-chat"}`}
          >
            <Image
              className="avatar"
              alt="avatar"
              width={40}
              height={40}
              src={m.role === "user" ? defaultAvatar : prepAvatar}
            />
            <div style={{ width: "100%", marginLeft: "16px" }}>
              <p className="message text-white leading-6">{m.content}</p>
              {index < messages.length - 1 && (
                <div className="horizontal-line" />
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div ref={chatContainer} className="chat">
      {renderResponse()}
      <form
        onSubmit={handleSubmitWithSave}
        className="chat-form w-[350px] md:w-[700px] absolute bottom-8 pl-4 md:pl-0"
      >
        <input
          name="input-field"
          type="text"
          placeholder="Paste your job here"
          onChange={handleInputChange}
          value={input}
        />
        <button type="submit" className="send-button" />
      </form>
    </div>
  );
};

export default Dashboard;
