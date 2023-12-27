"use client";

import appwriteService from "../appwrite-service/appwrite";


export default function Page(): JSX.Element {
  const madharchod = async () => {
    appwriteService
      .createAccount({
        email: "test@gmail.com",
        password: "test123456",
        username: "test",
      })
      .then((res) => console.log(res));
  };

  return (
    <>
      <button onClick={madharchod}>click me mf</button>
    </>
  );
}
