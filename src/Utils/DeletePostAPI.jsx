import userToken from '../Recoil/userToken/userToken';
import { useRecoilValue } from 'recoil';
import URL from './URL';

const DeletePostAPI = (deleteId) => {
  const token = useRecoilValue(userToken);

  const handlePostDelete = async () => {
    try {
      const response = await fetch(`${URL}/post/${deleteId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API 응답에 실패하였습니다.', error);
    }
  };

  return handlePostDelete;
};

export default DeletePostAPI;
