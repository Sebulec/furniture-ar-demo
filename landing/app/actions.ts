'use server'

import fs from 'fs';
import path from 'path';

export async function joinWaitlist(prevState: any, formData: FormData) {
  const email = formData.get('email');

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return { message: 'Please enter a valid email address.', success: false };
  }

  try {
    const filePath = path.join(process.cwd(), 'waitlist.txt');
    const timestamp = new Date().toISOString();
    const entry = `${timestamp}: ${email}\n`;
    
    // Append to file
    fs.appendFileSync(filePath, entry);
    
    return { message: 'You have been added to the waitlist!', success: true };
  } catch (error) {
    console.error('Failed to save email:', error);
    return { message: 'Something went wrong. Please try again.', success: false };
  }
}
