"use client"
import { useEffect, useState } from 'react';
import { getMessages } from "@/services/message-api";

const useMessages = (chatId: string | null) => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      if (chatId) {
        try {
          const fetchedMessages = await getMessages(chatId)
          console.log("fetchedmsg", fetchMessages);
          ;
          setMessages(fetchedMessages);
        } catch (err) {
          console.error("Failed to fetch messages:", err);
          setError("Failed to load messages. Please try again.");
        }
      }
    };

    fetchMessages();
  }, [chatId]);

  return { messages, error };
};

export default useMessages;
