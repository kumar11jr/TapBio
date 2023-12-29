import React from 'react';
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
    <div className="phone">
      <div className="screen">
        {cards.map((card, index) => (
          <div key={index} className="card">
            <h2>{card.linkName}</h2>
            <p>{card.linkURL}</p>    
          </div>
        ))}
      </div>
    
    </div>
  );
};

export default Mobile;

