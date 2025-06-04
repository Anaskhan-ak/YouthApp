import { useEffect, useState } from 'react';
import { getDataLocally } from '../helper';

const useUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const getUser = await getDataLocally();
      if (getUser) {
        setUser({
          id: getUser.id,
          name: `${getUser.firstName} ${getUser.lastName}`,
          photo: getUser.photo,
        });
      }
    })();
  }, []);

  return user;
};

export default useUser;
