// service/chat.ts

import mongoose from "mongoose";

export async function createChat(user: string,title: string) {
  const objectIdRegex = /^[a-f\d]{24}$/i;
if (!objectIdRegex.test(user)) {
  throw new Error("Invalid user ID format.");
}
  const userId = new mongoose.Types.ObjectId(user)
  console.log({userId});
  
  try {
    const response = await fetch('/api/chats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({user: userId,  title })
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (response.status === 400) {
        throw new Error(errorData.error || 'Invalid input. Please check your data.');
      }
      throw new Error(errorData.error || 'An error occurred while creating the chat. Please try again.');
    }

    const chat = await response.json();
    return chat;
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
