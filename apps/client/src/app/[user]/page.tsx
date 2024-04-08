"use client"

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import ButtonCard from "@/components/ButtonCard/Button";
import axios from "axios";

const UserPage = () => {
  const path = usePathname();
  const username = path.substring(1);
  const [userData, setUserData] = useState<any>();

  useEffect(() => {
    axios
      .post("http://localhost:8080/api/v1/user/userpage", {
        username,
      })
      .then((res) => {
        setUserData(res.data);
      });
  }, []);

  // Log the contents of userData?.urls to the console
  console.log(userData?.urls);

  return (
    <>
      <div className="flex flex-col space-y-7 justify-center items-center w-screen h-screen text-black bg-gradient-to-b from-teal-400 to-blue-500">
        <div className="users flex flex-col justify-center items-center">
          <div className="text-3xl">Add avatar</div>
          <h1 className="text-xl mx-auto">{userData?.name}</h1>
        </div>
        <div className="w-80 flex flex-col space-y-5">
          {userData?.urls.map((card, index) => (
            <ButtonCard
              linkName={card.platform}
              key={index}
              linkURL={card.link}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default UserPage;
