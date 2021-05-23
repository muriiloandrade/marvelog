export interface JwtDTO {
  iss?: string;
  exp?: number;
  sub?: string;
  user: string;
  name: string;
}
