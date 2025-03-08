import MD5 from 'crypto-js/md5';
import { IAuthUser } from '../../contexts/AuthContext';

export const getAvatar = (user: IAuthUser): string => {
  if (user.photoURL) {
    return user.photoURL;
  }

  return `http://www.gravatar.com/avatar/${MD5(user.email)}.jpg?s=${80}`;
};

export default getAvatar;

