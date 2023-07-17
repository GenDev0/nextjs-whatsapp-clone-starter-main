import React from "react";
import ChatHeader from "./ChatHeader";
import ChatContainer from "./ChatContainer";
import MessageBar from "./MessageBar";
import { useStateProvider } from "@/context/StateContext";
import SearchMessages from "./SearchMessages";

function Chat() {
  const [{ userInfo, currentChatUser, messagesSearch }, dispatch] =
    useStateProvider();
  return (
    <div className='border-conversation-border border-l w-full bg-conversation-panel-background flex flex-col h-[100vh] z-10'>
      <ChatHeader />

      {messagesSearch ? (
        <SearchMessages />
      ) : (
        <>
          <ChatContainer />
          <MessageBar />
        </>
      )}
    </div>
  );
}

export default Chat;
