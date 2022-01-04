import axios from 'axios';
import { User } from 'firebase/auth';

import { apiBaseUrl } from '.';

export interface Member {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  email: string;
}

export interface GetMembersPayload {
  data: Member[];
  nextOffset: number;
}

export const getMembers = async (
  currentUser: User,
  searchTerm: string,
  offset = 0
): Promise<GetMembersPayload> => {
  const idToken = await currentUser.getIdToken();
  const url = apiBaseUrl.concat('/members');
  const res = await axios({
    method: 'get',
    url,
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
    params: {
      offset,
      query: searchTerm,
    },
  });

  return {
    data: res.data as Member[],
    nextOffset: offset + 25,
  };
};
