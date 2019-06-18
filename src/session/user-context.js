import React, { useContext } from 'react';

const UserContext = React.createContext(null);

export default UserContext;

export const useUser = () => useContext(UserContext);
