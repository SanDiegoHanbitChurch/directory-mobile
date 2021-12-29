import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import { getAllMembers, Member } from '../api/member';

export const useMembers = () =>
  useQuery<Member[], AxiosError>('members', getAllMembers);
