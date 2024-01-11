import React from "react";
import './mobile.css';

interface CardItem {
  linkName: string;
  linkURL: string;
}

interface MobileProps {
  cards: CardItem[];
}

const Mobile: React.FC<MobileProps> = ({ cards }) => {
  return (
    <div className="text-black justify-center flex items-center h-[832px] w-[384px] bg-gray-300 rounded-[35px] border-2 border-gray-800 ">
      <div className="border-[7px] border-black w-full h-full rounded-[33px] bg-green-400 ">
        <div className="notch w-28 h-8 bg-black mx-auto mt-3 rounded-full"></div>
        <div className="screen">
          {cards.map((card, index) => (
            <div key={index} className="card">
              <h2>{card.linkName}</h2>
              <p>{card.linkURL}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mobile;
