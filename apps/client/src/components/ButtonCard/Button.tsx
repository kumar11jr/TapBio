import React from "react";
import "./Button.css";

export interface IProps {
  linkName: string | undefined;
  linkURL: string;
}

const ButtonCard: React.FC<IProps> = (props) => {
  const handleClick = () => {
    window.open(props.linkURL, "_blank");
  };

  return (
    <>
      <div
        className="btnComp bg-white shadow-3 text-black py-5 rounded-xl hover:cursor-pointer"
        onClick={handleClick}>
        {props.linkName}
      </div>
    </>
  );
};

export default ButtonCard;
