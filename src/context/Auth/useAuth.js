import { useContext } from 'react';

import AuthContext from './AuthContext';

/**
 * Context Hook holding authentication logic
 */
const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthContext');
  }

  return context;
};

export default useAuth;
