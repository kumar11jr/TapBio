import React from "react";
import "./Button.css";

export interface IProps {
  linkName: string | undefined;
  linkURL: string;
}

const ButtonCard: React.FC<IProps> = ({ linkName, linkURL }) => {
  const handleClick = () => {
    window.open(linkURL, "_blank");
  };

  return (
    <>
      <div
        className="btnComp bg-white shadow-3 text-black py-3 rounded-xl hover:cursor-pointer"
        onClick={handleClick}>
        {linkName}
      </div>
    </>
  );
};

export default ButtonCard;
