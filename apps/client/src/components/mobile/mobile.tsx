import React from "react";
import ButtonCard from "../ButtonCard/Button";

interface CardItem {
  linkURL: string;
}

interface MobileProps {
  cards: CardItem[];
  platform: string[];
}

const Mobile: React.FC<MobileProps> = ({ cards , platform }) => {
  return (
    <div className="text-black justify-center flex items-center h-[665px] w-[307px] bg-gray-300 rounded-[35px] border-2 border-gray-800 overflow-hidden">
      <div className="border-[7px] border-black w-full h-full rounded-[33px] bg-green-400 overflow-y-auto scrollbar-hidden">
        {/* Notch */}
        <div className="notch w-[89px] h-[25px] bg-black mx-auto mt-3 rounded-full"></div>
        {/* cards */}
        <div className="flex flex-col items-center pt-10">
          {cards.map((card, index) => (
            <div key={index} className="w-[80%] text-white">
              <ButtonCard linkName={platform[index]} linkURL={card.linkURL} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mobile;
