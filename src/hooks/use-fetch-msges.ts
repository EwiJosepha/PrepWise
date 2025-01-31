'use client'
import { useEffect, useState } from "react";
import { getChats } from "@/services/chats-api";
import useUserStore from "@/store/useUserStore";

const useFetchChats = () => {
  const { userInfo } = useUserStore();
  const [persistedMessages, setPersistedMessages] = useState([]);
  const [chatId, setChatId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const allMsges = await getChats(userInfo.id as string);
        const messagesArray = allMsges.data?.[0]?.messages || [];
        setPersistedMessages(messagesArray);
        setChatId(allMsges.data[0]?.id || null);
      } catch (err) {
        setError("Failed to fetch chats.");
      }
    };

    if (userInfo.id) {
      fetchChats();
    }
  }, [userInfo.id]);

  return { persistedMessages, chatId, error, setPersistedMessages, setChatId };
};

export default useFetchChats;
