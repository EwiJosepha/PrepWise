'use client'
import { useChat } from "ai/react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import defaultAvatar from '@/assets/images/avatar.png';
import prepAvatar from '@/assets/images/prep-avatar.jpg';
import { createChat, updateChatMessages } from "@/services/chats-api";
import useUserStore from "@/store/useUserStore";
import useMessages from "@/hooks/use-message";

const Dashboard = () => {
  const { userInfo } = useUserStore()
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/openai",
  });

  console.log({messages});
  
  const [chatId, setChatId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { messages: prevMessages, error: fetchError } = useMessages(chatId);
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
        const title = "New from here";
        const user = userInfo.id;
        const chat = await createChat(user!, title, messages);
        setChatId(chat.id);
      } catch (err) {
        setError("Failed to initialize chat. Please try again.");
      }
    }
  };

  useEffect(() => {
    initChat();
  }, [userInfo.id]);

  
  const handleSubmitWithSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  console.log("mewww");
  
    if (!chatId && userInfo.id) {
      try {
        const title = "chat test";
        const user = userInfo.id;
  
        const chat = await createChat(user, title, messages);
        setChatId(chat.id);
      } catch (err) {
        setError("Failed to initialize chat. Please try again.");
        return;
      }
    } else if (chatId) {
      try {
        console.log("newww");
        
       const neww = await updateChatMessages(chatId, messages);
       console.log({neww});
       
      } catch (err) {
        setError("Failed to update chat messages. Please try again.");
        return;
      }
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
