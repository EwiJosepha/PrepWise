export async function createUser(values: { firstName: string; lastName: string; email: string; password: string }) {
  try {
    const response = await fetch('/auth/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      console.log(response);
      
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}
