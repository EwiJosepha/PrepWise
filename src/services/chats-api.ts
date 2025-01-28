
import mongoose from "mongoose";
import { IMessage } from "@/models/chats.model";

export async function createChat(user: string, title: string, messages: IMessage[]) {
  const objectIdRegex = /^[a-f\d]{24}$/i;
  if (!objectIdRegex.test(user)) {
    throw new Error("Invalid user ID format.");
  }
  const userId = new mongoose.Types.ObjectId(user)
  try {
    const messageIds = messages.map((msg) => {
      if (typeof msg.id !== 'string') {
        throw new Error(`Message ID should be a string, but got ${typeof msg.id}`);
      }
      return msg.id;
    });
      const response = await fetch('/api/chats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: userId, title, messages: messageIds })
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (response.status === 400) {
        throw new Error(errorData.error || 'Invalid input. Please check your data.');
      }
      throw new Error(errorData.error || 'An error occurred while creating the chat. Please try again.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during chat creation:', error);
    throw error;
  }
}

export async function getChats(user: string) {
  try {
    const response = await fetch(`/api/chats?user=${user}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'An error occurred while fetching chats.');
    }

    const chats = await response.json();
    return chats;
  } catch (error) {
    console.error('Error during fetching chats:', error);
    throw error;
  }
}

const getLatestChatId = async (userId: string) => {
  try {
    const response = await fetch(`/api/chats/latest/${userId}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching latest chat:", error);
    throw error;
  }
};


interface UpdateChatMessagesBody {
  messages: string[];
}

export const updateChatMessages = async (chatId: string, messages: any[]) => {
  try {
    const response = await fetch(`/api/chat/${chatId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      throw new Error('Failed to update chat messages.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating chat messages:', error);
    throw new Error('Failed to update chat messages. Please try again.');
  }
};
