export type AuthResponse = {
  user: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    role: string;
    createdAt: Date;
  };
  accessToken: string;
};
