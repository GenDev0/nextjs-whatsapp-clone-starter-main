import React from "react";
import Avatar from "../common/Avatar";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { calculateTime } from "@/utils/CalculateTime";
import MessageStatus from "../common/MessageStatus";
import { FaImage, FaMicrophone } from "react-icons/fa";

function ChatLIstItem({ data, isContactPage = false }) {
  const [{ userInfo, currentChatUser }, dispatch] = useStateProvider();
  const handleContactClick = () => {
    // if (currentChatUser?.id === data?.id) {
    if (!isContactPage) {
      dispatch({
        type: reducerCases.CHANGE_CURRENT_CHAT_USER,
        user: {
          name: data.name,
          about: data.about,
          profilePicture: data.profilePicture,
          email: data.email,
          id: userInfo?.id === data.senderId ? data.receiverId : data.senderId,
        },
      });
    } else {
      dispatch({
        type: reducerCases.CHANGE_CURRENT_CHAT_USER,
        user: { ...data },
      });
      dispatch({ type: reducerCases.SET_ALL_CONTACTS_PAGE });
    }
    // }
  };

  return (
    <div
      className={`flex cursor-pointer items-center hover:bg-background-default-hover`}
      onClick={handleContactClick}
    >
      <div className='min-w-fit px-2 pt-1 pb-1 md:px-5 md:pt-3'>
        <Avatar type={"sm"} image={data?.profilePicture} />
      </div>
      <div className='min-h-full flex flex-col justify-center mt-3 pr-2 w-full'>
        <div className='flex justify-between'>
          <div>
            <span className='text-white'>{data?.name}</span>
          </div>
          {!isContactPage && (
            <div>
              <span
                className={`${
                  !(data.totalUnreadMessages > 0)
                    ? "text-secondary"
                    : "text-icon-green"
                } text-sm`}
              >
                {calculateTime(data?.createdAt)}
              </span>
            </div>
          )}
        </div>
        <div className='flex border-b border-conversation-border pb-2 pt-1 pr-2'>
          <div className='flex justify-between w-full'>
            <span className='text-secondary line-clamp-1 text-sm'>
              {isContactPage ? (
                data?.about || "\u00A0"
              ) : (
                <div className='flex items-center gap-1 max-w-md'>
                  {data.senderId === userInfo.id && (
                    <MessageStatus messageStatus={data.messageStatus} />
                  )}
                  {data.type === "text" && (
                    <span
                      className={`truncate ${
                        data.totalUnreadMessages > 0 ? "text-icon-green" : ""
                      }`}
                    >
                      {data.senderId === userInfo.id
                        ? "You : " + data.message
                        : data.message}
                    </span>
                  )}
                  {data.type === "audio" && (
                    <span className='flex gap-1 items-center truncate'>
                      {data.senderId === userInfo.id ? "You : " : ""}
                      <FaMicrophone className='text-panel-header-icon' />
                      Sent an audio Message
                    </span>
                  )}
                  {data.type === "image" && (
                    <span className='flex gap-1 items-center truncate'>
                      {data.senderId === userInfo.id ? "You : " : ""}
                      <FaImage className='text-panel-header-icon' />
                      Sent an Image
                    </span>
                  )}
                </div>
              )}
            </span>
            {data.totalUnreadMessages > 0 && (
              <span className='bg-icon-green rounded-full ml-1 w-fit px-[6px] justify-center items-center text-center text-white text-sm '>
                {data.totalUnreadMessages}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatLIstItem;
