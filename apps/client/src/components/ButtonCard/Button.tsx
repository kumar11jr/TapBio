import React from 'react';

export interface IProps {
  linkName: string | undefined;
  linkURL: string;
}

const ButtonCard: React.FC<IProps> = (props) => {
  const handleClick = () => {
    window.open(props.linkURL, '_blank');
  };

  return (
    <>
      <div
        className='bg-white shadow-3 text-black py-5 rounded-3xl'
        onClick={handleClick} 
        style={{ cursor: 'pointer' }}>
        {props.linkName}
      </div>
    </>
  );
};

export default ButtonCard;
