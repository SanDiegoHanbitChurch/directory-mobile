import { AxiosError } from 'axios';
import { User } from 'firebase/auth';
import { useQuery } from 'react-query';

import { getAllMembers, Member } from '../api/member';

export const useMembers = (currentUser: User) =>
  useQuery<Member[], AxiosError>('members', () => getAllMembers(currentUser));
