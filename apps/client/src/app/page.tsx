"use client";

import appwriteDB from "@/appwrite-service/appwriteDB";

export default function Page(): JSX.Element {
  const madharchod = async () => {
    appwriteDB
      .get()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <button onClick={madharchod}>click me mf</button>
    </>
  );
}
