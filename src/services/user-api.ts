export async function createUser(values: { firstName: string; lastName: string; email: string; password: string }) {
  try {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      const errorData = await response.json();
            if (response.status === 409) {
        throw new Error(errorData.error || 'User already exists, please try another email.');
      } else if (response.status === 400) {
        throw new Error(errorData.error || 'Invalid input. Please check your data.');
      }

      throw new Error(errorData.error || 'An error occurred during registration. Please try again.');
    }

    const { user, token } = await response.json();
    return { user, token };
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
}


export async function loginUser(values: { email: string; password: string }) {
  try {
    const response = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (response.status === 401) {
        throw new Error(errorData.error || 'Unauthorized access. Please check your credentials.');
      }

      throw new Error(errorData.error || 'An error occurred. Please try again.');
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}