export interface PostInterface {
    userId: number;
    id: number;
    title: string;
    body: string;
  }

  export interface UserRegistrationPayload {
    username: string;
    email: string
    password: string
  }

  export interface UserInterface {
    nickname: string;
    name: string;
    picture: string;
    updated_at: string;
    email: string;
    email_verified: boolean;
    iss: string;
    aud: string;
    iat: number;
    exp: number;
    sub: string;
  }