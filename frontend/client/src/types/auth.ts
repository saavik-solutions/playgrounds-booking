import { User } from "./user";


export interface AuthState {
  accessToken: string | null;
  role: string | null;
  user: User | null;
}
