import type { RegisterFormData } from "@/types/auth";
import { ref } from 'vue';

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  githubEmail: string | null;
  googleEmail: string | null;
}

const user = ref<User>({
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
  githubEmail: 'john@github.com',
  googleEmail: null,
});

export function useAuth() {
  const registerWithEmail = async (data: RegisterFormData) => {
    // Implement your registration logic here
    // Example with Firebase:
    // await createUserWithEmailAndPassword(auth, data.email, data.password);
    // await updateProfile(auth.currentUser!, { displayName: data.name });
  };

  const loginWithGoogle = async () => {
    // Implement Google login
    // Example: await signInWithPopup(auth, new GoogleAuthProvider());
  };

  const loginWithGithub = async () => {
    // Implement GitHub login
    // Example: await signInWithPopup(auth, new GithubAuthProvider());
  };

  const updateProfile = async (data: Partial<User>) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update user data
    Object.assign(user.value, data);
  };

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate password validation
    if (currentPassword === 'wrong') {
      throw new Error('Current password is incorrect');
    }
  };

  return {
    registerWithEmail,
    loginWithGoogle,
    loginWithGithub,
    user,
    updateProfile,
    updatePassword,
  };
} 