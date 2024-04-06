import React from "react";
import ButtonCard from "../ButtonCard/Button";
import Image from "next/image";

interface CardItem {
  linkURL: string;
  platform: string;
}

interface MobileProps {
  cards: CardItem[];
  user: string;
}

const Mobile: React.FC<MobileProps> = ({ cards, user }) => {
  return (
    <div className="text-black justify-center flex items-center h-[665px] w-[307px] bg-gray-300 rounded-[35px] border-2 border-gray-800 overflow-hidden">
      <div className="border-[7px] border-black w-full h-full rounded-[33px] bg-gradient-to-b from-teal-400 to-blue-500 overflow-y-auto scrollbar-hidden">
        {/* Notch */}
        <div className="notch w-[89px] h-[25px] bg-black mx-auto mt-3 rounded-full"></div>
        <div className="users flex flex-col justify-center items-center">
          <div className="text-3xl">Add avatar</div>
          <h1 className="text-xl mx-auto">{user}</h1>
        </div>
        {/* cards */}
        <div className="flex flex-col items-center pt-10">
          {cards.map((card, index) => (
            <div key={index} className="w-[80%] text-white py-2">
              <ButtonCard linkName={card.platform} linkURL={card.linkURL} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mobile;
