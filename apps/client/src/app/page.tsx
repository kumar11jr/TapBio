"use client";

import appwriteDB from "@/appwrite-service/appwriteDB";
import { useUser } from "@/context/user/useUserCTX";

export default function Page(): JSX.Element {
  const user = useUser();

  const madharchod = async () => {
    // appwriteDB.create().then((res) => {
    //   console.log(res);
    // });
    user.saveUser({
      uid: "123",
      platform: "twitter",
      url: "https://twitter.com/123",
    });
  };

  const bc = async () => {
    user.getUser().then((res: any) => {
      console.log(res);
    });
  };

  return (
    <>
      <button onClick={madharchod}>click me mf</button>
      <button onClick={bc}>click me mf</button>
    </>
  );
}
