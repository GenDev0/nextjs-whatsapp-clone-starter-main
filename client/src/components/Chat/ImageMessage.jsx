import { useStateProvider } from "@/context/StateContext";
import Image from "next/image";
import React from "react";
import MessageStatus from "../common/MessageStatus";
import { calculateTime } from "@/utils/CalculateTime";
import { HOST } from "@/utils/ApiRoutes";

function ImageMessage({ message }) {
  const [{ currentChatUser, userInfo }] = useStateProvider();
  return (
    <div
      className={`text-white px-2 py-[5px] text-sm rounded-md flex flex-col gap-2 items-end max-w-[60%] md:max-w-[45%] ${
        message.senderId === currentChatUser.id
          ? "bg-incoming-background"
          : "bg-outgoing-background"
      }`}
    >
      <div className='relative'>
        <Image
          src={`${HOST}/${message.message}`}
          alt='uploaded Image'
          width={300}
          height={300}
          className='rounded-lg'
        />
      </div>
      <div className='flex gap-1 items-end'>
        <span className='text-bubble-meta text-[11px] pt-1 min-w-fit'>
          {calculateTime(message.createdAt)}
        </span>
        <span>
          {message.senderId === userInfo.id && (
            <MessageStatus messageStatus={message.messageStatus} />
          )}
        </span>
      </div>
    </div>
  );
}

export default ImageMessage;
