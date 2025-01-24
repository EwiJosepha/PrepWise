// service/chat.ts

export async function createChat(title: string, user: string) {
  try {
    const response = await fetch('/api/chats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, user }),
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
