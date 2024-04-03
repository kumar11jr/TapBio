"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Page(): JSX.Element {
  const [username, setUsername] = useState<string>("");
  const router = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const generateTapBio = () => {
    if (username.trim() != "") {
      axios
        .post("http://localhost:8080/api/v1/user/username", {
          username,
        })
        .then((res: any) => {
          if (res.status == 200) {
            router.push(`/signup?username=${username}`);
          }
        });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("tapbio-token");
    if (token) {
      router.push("/profile");
    }
  }, []);
  
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
