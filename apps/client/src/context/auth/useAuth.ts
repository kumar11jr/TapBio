import { useContext } from "react";

import AuthContext from "./authCTX";

export const useAuth = () => {
  const data = useContext(AuthContext);
  return data;
};

export default useAuth;
