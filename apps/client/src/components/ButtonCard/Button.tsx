import React from "react";
import "./Button.css";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaGithub, FaXTwitter } from "react-icons/fa6";

export interface IProps {
  linkName: string | undefined;
  linkURL: string;
}

const ButtonCard: React.FC<IProps> = ({ linkName, linkURL }) => {
  const handleClick = () => {
    window.open(linkURL, "_blank");
  };

  if (linkName == "LinkedIn") {
    return (
      <>
        <div
          className="btnComp flex flow-row items-center bg-white shadow-3 justify-center text-black font-bold py-3 rounded-xl hover:cursor-pointer hover:scale-105"
          onClick={handleClick}>
          {linkName} <FaLinkedin />
        </div>
      </>
    );
  } else if (linkName == "GitHub") {
    return (
      <>
        <div
          className="btnComp flex flow-row items-center bg-white shadow-3 justify-center text-black font-bold py-3 rounded-xl hover:cursor-pointer hover:scale-105"
          onClick={handleClick}>
          {linkName} <FaGithub />
        </div>
      </>
    );
  } else if (linkName == "X") {
    return (
      <>
        <div
          className="btnComp flex flow-row items-center bg-white shadow-3 justify-center text-black font-bold py-3 rounded-xl hover:cursor-pointer hover:scale-105"
          onClick={handleClick}>
          <FaXTwitter />
        </div>
      </>
    );
  } else if (linkName == "Instagram") {
    return (
      <>
        <div
          className="btnComp flex flow-row items-center bg-white shadow-3 justify-center text-black font-bold py-3 rounded-xl hover:cursor-pointer hover:scale-105"
          onClick={handleClick}>
          {linkName} <FaInstagram />
        </div>
      </>
    );
  }
};

export default ButtonCard;
