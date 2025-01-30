'use client'
import { useChat } from "ai/react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import defaultAvatar from '@/assets/images/avatar.png';
import prepAvatar from '@/assets/images/prep-avatar.jpg';
import { createChat, updateChatMessages } from "@/services/chats-api";
import useUserStore from "@/store/useUserStore";
import { getChats } from "@/services/chats-api";
import { createMessage } from "@/services/message-api";
import { v4 as uuidv4 } from 'uuid';
import { extractQuestions } from "@/utils/extract-question";

const Dashboard = () => {
  const { userInfo } = useUserStore();
  const { messages, input, handleInputChange, handleSubmit, setInput, setMessages } = useChat({
    api: "/api/openai",
  });

  const [chatId, setChatId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [persistedMessages, setPersistedMessages] = useState([]);

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

        // if (allMsges.length > 0) {
        const messagesArray = allMsges.data?.[0]?.messages || [];
        setPersistedMessages(messagesArray);
        // setMessages(messagesArray)
        console.log("Setting persistedMessages:", messagesArray);
        setChatId(allMsges.data[0].id);
        setPersistedMessages(allMsges[0].messages || []);

      } catch (err) {
        setError("Failed to fetch chats.");
      }
    };

    if (userInfo.id) {
      fetchChats();
    }
  }, [userInfo.id]);

  useEffect(() => {
    console.log("Updated persistedMessages:", persistedMessages);
  }, [persistedMessages]);



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
        const chat = await createChat(user, title, filteredMessages);
        setChatId(chat.id);
      } catch (err) {
        setError("Failed to initialize chat. Please try again.");
        return;
      }
    } else if (chatId) {
      try {
        await updateChatMessages(chatId, messages);
      } catch (err) {
        setError("Failed to update chat messages. Please try again.");
        return;
      }
    }
    // setPersistedMessages([]);
    handleSubmit(e);
  };

  const handleQuestionClick = async (question: string) => {
    console.log("Fetching answer for:", question);

    setInput(question);
    // setMessages((prev) => [
    //   ...prev,
    //   { id: uuidv4(), role: "user", content: question, userId: userInfo.id, createdAt: new Date() },
    // ]);

    try {
      await createMessage({
        role: "user",
        content: question,
        userId: userInfo.id!,
        createdAt: new Date(),
      });

        setTimeout(() => {
          handleSubmit();
        }, 100);

    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  };

  const renderResponse = () => {
    const displayedMessages = persistedMessages.length > 0 ? persistedMessages : messages;

    return (
      <div className="response md:p-[30px]">
        {displayedMessages.map((m, index) => (
          <div
            key={index}
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
              <div className="message text-white leading-6">
                {m.role === "assistant" ? (
                  <>p
                    <p className="leading-6">{m.content}</p>
                    {extractQuestions(m.content).length > 0 && (
                 <div className="question-suggestions leading-8">
                 {m.content.split("?").map((part, i) => (
                   <span
                     key={i}
                     onClick={() => handleQuestionClick(part + (i < m.content.split("?").length - 1 ? "?" : ""))}
                     className="cursor-pointer text-blue-400 hover:underline block"
                   >
                     {part.trim()}
                   </span>
                 ))}
               </div>
               
                    )}
                  </>
                ) : (
                  m.content
                )}

              </div>
              {index < messages.length - 1 && <div className="horizontal-line" />}
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
