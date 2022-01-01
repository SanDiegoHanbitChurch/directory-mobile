import axios from 'axios';
import { User } from 'firebase/auth';

const baseUrl =
  'https://us-central1-hanbit-directory-dev.cloudfunctions.net/v1';

export interface Member {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  email: string;
}

export interface GetAllMembersPayload {
  data: Member[];
  nextOffset: number;
}

export const getAllMembers = async (
  currentUser: User,
  offset = 0
): Promise<GetAllMembersPayload> => {
  const idToken = await currentUser.getIdToken();
  const url = baseUrl.concat('/members');
  const res = await axios({
    method: 'get',
    url,
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
    params: {
      offset,
    },
  });
  return {
    data: res.data as Member[],
    nextOffset: offset + 25,
  };
};
