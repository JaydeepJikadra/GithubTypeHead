import { User } from 'types/User';

/* --- STATE --- */
export interface GithubUserState {
  username: string;
  loading: boolean;
  error?: UserErrorType | null;
  user: User | null;
}

export enum UserErrorType {
  RESPONSE_ERROR = 1,
  USER_NOT_FOUND = 2,
  USERNAME_EMPTY = 3,
  GITHUB_RATE_LIMIT = 5,
}

/* 
  If you want to use 'ContainerState' keyword everywhere in your feature folder, 
  instead of the 'HomePageState' keyword.
*/
export type ContainerState = GithubUserState;
