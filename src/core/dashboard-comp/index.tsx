'use client'
import { useChat } from "ai/react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import defaultAvatar from '@/assets/images/avatar.png';
import prepAvatar from '@/assets/images/prep-avatar.jpg';
import { createChat, updateChatMessages } from "@/services/chats-api";
import useUserStore from "@/store/useUserStore";
import useMessages from "@/hooks/use-message";
import { getChats } from "@/services/chats-api";

const Dashboard = () => {
  const { userInfo } = useUserStore();
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/openai",
  });

  const [chatId, setChatId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // const { messages: prevMessages, error: fetchError } = useMessages(chatId);
  // console.log({ messages });

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

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const allMsges = await getChats(userInfo.id as string);
        console.log("Fetched Chats:", allMsges);

        if (allMsges.length > 0) {
          setChatId(allMsges[0].id); 
        }
      } catch (err) {
        setError("Failed to fetch chats.");
      }
    };

    if (userInfo.id) {
      fetchChats();
    }
  }, [userInfo.id]);

  const handleSubmitWithSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Message submitted!");

    if (!chatId && userInfo.id) {
      try {
        const title = `Prep wise@ chat with ${userInfo.id}`;
        const user = userInfo.id;
        const filteredMessages = messages.map(({ 
          experimental_attachments, reasoning, data, annotations, toolInvocations, createdAt, ...msg 
        }) => ({
          ...msg,
          createdAt: createdAt ?? new Date(),
        }));
        
       console.log( {filteredMessages});
       
        const chat = await createChat(user, title, filteredMessages);

        console.log({chat});
        
        setChatId(chat.id);
      } catch (err) {
        setError("Failed to initialize chat. Please try again.");
        return;
      }
    } else if (chatId) {
      try {
        console.log("Updating messages...");
        await updateChatMessages(chatId, messages);
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
