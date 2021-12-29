import axios from 'axios';

const baseUrl =
  'https://us-central1-hanbit-directory-dev.cloudfunctions.net/v1';

export type Member = {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  email: string;
};

export const getAllMembers = async (): Promise<Member[]> => {
  const url = baseUrl.concat('/members');
  const res = await axios({
    method: 'get',
    url,
  });
  return res.data;
};
