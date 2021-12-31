import axios from 'axios';
import { User } from 'firebase/auth';

const baseUrl =
  'https://us-central1-hanbit-directory-dev.cloudfunctions.net/v1';

export type Member = {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  email: string;
};

export const getAllMembers = async (currentUser: User): Promise<Member[]> => {
  const idToken = await currentUser.getIdToken();
  const url = baseUrl.concat('/members');
  const res = await axios({
    method: 'get',
    url,
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
  return res.data;
};
