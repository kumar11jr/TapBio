"use client";
import { createContext, useContext, useState } from "react";

export interface IUser {
  uid: string | "invalid";
  name: string;
}

const UserDatacontext = createContext<any>(null);

export const useUser = () => {
  const data = useContext(UserDatacontext);
  return data;
};

export const UserProvider = (props: any) => {
  const [userData, setUserData] = useState<IUser>();

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
