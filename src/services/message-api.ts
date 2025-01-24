
export async function createMessage(chat: string, role: 'user' | 'assistant', content: string) {
  try {
    const response = await fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chat: chat, role, content }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (response.status === 400) {
        throw new Error(errorData.error || 'Invalid input. Please check your data.');
      }
      throw new Error(errorData.error || 'An error occurred while creating the message. Please try again.');
    }

    const message = await response.json();
    return message;
  } catch (error) {
    console.error('Error during message creation:', error);
    throw error;
  }
}

export async function getMessages(chat: string) {
  try {
    const response = await fetch(`/api/messages?chat=${chat}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'An error occurred while fetching messages.');
    }

    const messages = await response.json();
    return messages;
  } catch (error) {
    console.error('Error during fetching messages:', error);
    throw error;
  }
}
