"use client";

import appwriteDB from "@/appwrite-service/appwriteDB";

export default function Page(): JSX.Element {
  const madharchod = async () => {
    // appwriteDB.create().then((res) => {
    //   console.log(res);
    // });
  };

  return (
    <>
      <button onClick={madharchod}>click me mf</button>
    </>
  );
}
