"use client";

import appwriteDB from "@/appwrite-service/appwriteDB";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/context/user/useUserCTX";
import { ChangeEvent, useState } from "react";

export default function Page(): JSX.Element {
  const user = useUser();
  const [username, setUsername] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const generateTapBio = () => {
    if (username.trim() !== "") {
      const newTapBio = "tapbio/" + username;
      setUsername(newTapBio);
    }
  };

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
      <Button onClick={madharchod}>click me mf</Button>
      <Button onClick={bc}>click me mf</Button>

      <div className="flex flex-col items-center justify-center h-screen">
        <div className="absolute top-0 left-0 p-4">
          <ModeToggle />
        </div>
        <div className="flex flex-col items-center space-y-4">
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              value={username}
              onChange={handleInputChange}
              type="text"
              placeholder="Username"
            />
            <Button onClick={generateTapBio} type="submit">
              Claim TapBio
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
