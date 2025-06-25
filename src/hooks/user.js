import { useEffect, useState } from 'react';
import { getDataLocally } from '../helper';
import { apiCall } from '../services/apiCall';

const useUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const getUser = await getDataLocally();
      try {
        const result = await apiCall?.getProfileData({userId: getUser?.id});
        setUser({
          id: result.id,
          name: `${result?.firstName} ${result?.lastName}`,
          photo: result?.profilePicture,
        });
      } catch (e) {
        console.error('Failed to fetch profile data', e);
      }
    })();
  }, []);

  return user;
};

export default useUser;
