import React from "react";
import { BsCheck, BsCheckAll } from "react-icons/bs";

function MessageStatus({ messageStatus }) {
  return (
    <>
      {messageStatus === "sent" && <BsCheck className='text-lg' />}
      {messageStatus === "read" && (
        <BsCheckAll className='text-lg text-icon-ack' />
      )}
      {messageStatus === "delivered" && <BsCheckAll className='text-lg' />}
    </>
  );
}

export default MessageStatus;
