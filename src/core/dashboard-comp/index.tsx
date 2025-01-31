'use client'
import { useChat } from "ai/react";
import { useEffect, useRef } from "react";
import useUserStore from "@/store/useUserStore";
import { createChat, updateChatMessages } from "@/services/chats-api";
import { createMessage } from "@/services/message-api";
import useFetchChats from "@/hooks/use-fetch-msges";
import ChatHistory from "@/core/dashboard-comp/chat-board/chat-history";
import ChatInput from "@/core/dashboard-comp/chat-board/chat-input-upload";

const Dashboard = () => {
  const { userInfo } = useUserStore();
  const { messages, input, handleInputChange, handleSubmit, setInput, setMessages } = useChat({
    api: "/api/openai",
  });

  const { persistedMessages, chatId, setChatId, setPersistedMessages } = useFetchChats();
  
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

  const handleSubmitWithSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!chatId && userInfo.id) {
      try {
        const title = `Prep wise@ chat with ${userInfo.id}`;
          const filteredMessages = messages.map(({
          experimental_attachments, reasoning, data, annotations, toolInvocations, createdAt, ...msg
        }) => ({
          ...msg,
          createdAt: createdAt ?? new Date(),
        }));
        const chat = await createChat(userInfo.id, title, filteredMessages);
        setChatId(chat.id);
      } catch {
        console.error("Failed to initialize chat.");
        return;
      }
    } else if (chatId) {
      try {
        await updateChatMessages(chatId, messages);
      } catch {
        console.error("Failed to update chat messages.");
        return;
      }
    }
    handleSubmit(e);
  };

  const handleQuestionClick = async (question: string) => {
    setInput(question);
    try {
      await createMessage({ role: "user", content: question, userId: userInfo.id!, createdAt: new Date() });
    } catch {
      console.error("Error fetching AI response.");
    }
  };

  return (
    <div ref={chatContainer} className="chat w-[350px] md:w-[700px]">
      <ChatHistory messages={persistedMessages.length ? persistedMessages : messages} onQuestionClick={handleQuestionClick} />
      <ChatInput input={input} onInputChange={handleInputChange} onSubmit={handleSubmitWithSave} />
    </div>
  );
};

export default Dashboard;
