export interface SignupData {
  email: string;
  password: string;
  name: string;
  avatar: string;
}

export interface SignupResponse {
  email: string;
  password: string;
  name: string;
  avatar: string;
  role: string;
  id: number;
}
