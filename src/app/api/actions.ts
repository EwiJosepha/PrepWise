'use server';

import User from "@/models/user.model";
export async function createUser(formData: FormData) {
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;
  try {
    const user = new User({ firstName, lastName, email, password , confirmPassword});
    await user.save();
    return { success: true, user };
  } catch (error) {
    throw new Error('Failed to save user');
  }
}

