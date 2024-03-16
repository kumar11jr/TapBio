"use client";
import { createContext, useContext, useState } from "react";

const UserDatacontext = createContext<any>(null);
export const useUser = () => {
  const data = useContext(UserDatacontext);
  return data;
};

interface IUser {
  username: string;
  name: string;
  email: string;
}

export const UserProvider = (props: any) => {
  const [userData, setUserData] = useState<IUser>({
    username: "",
    name: "",
    email: "",
  });

  const saveUser = async (data: IUser) => {
    setUserData(data);
  };

  const getUser = async () => {
    return userData;
  };

  return (
    <UserDatacontext.Provider value={{ saveUser, getUser }}>
      {props.children}
    </UserDatacontext.Provider>
  );
};

export default UserProvider;
