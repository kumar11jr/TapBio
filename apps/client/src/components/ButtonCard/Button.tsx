import React from 'react'

export interface IProps {
  linkName: string;
  linkURL: string;
}

const ButtonCard = (props: IProps) => {
  return (
    <>
      <div className='bg-white shadow-3 text-black py-5 rounded-3xl'>
        {props.linkName}
      </div>
    </>
  )
}

export default ButtonCard;
