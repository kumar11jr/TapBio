"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/context/user/useUserCTX";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page(): JSX.Element {
  const user = useUser();
  const [username, setUsername] = useState<string>("");
  const router = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const generateTapBio = () => {
    if (username.trim() != "") {
      user
        .saveUser({
          uid: username,
          name: ""
        })
        .then(() => {
          router.push("/signup");
        });
    }
  };

  const generateTapBioOnEnter = (e: any) => {
    if (e.key === "Enter") {
      generateTapBio();
    }
  };

  return (
    <>
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
              onKeyDown={generateTapBioOnEnter}
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
