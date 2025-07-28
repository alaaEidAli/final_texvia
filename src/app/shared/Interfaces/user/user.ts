export interface User {
  id?: number;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}
