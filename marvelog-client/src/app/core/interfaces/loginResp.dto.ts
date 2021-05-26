export interface LoginResp {
  access_token: string;
  expTime: number;
}

export interface DecodedToken {
  iss: string;
  exp: number;
  sub: string;
  user: string;
  name: string;
}
