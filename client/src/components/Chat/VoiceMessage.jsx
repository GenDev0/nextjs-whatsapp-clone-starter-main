import { useStateProvider } from "@/context/StateContext";
import { HOST } from "@/utils/ApiRoutes";
import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import MessageStatus from "../common/MessageStatus";
import { calculateTime } from "@/utils/CalculateTime";
import Avatar from "../common/Avatar";
import { FaPlay, FaStop } from "react-icons/fa";

function VoiceMessage({ message }) {
  const [{ userInfo, currentChatUser }] = useStateProvider();

  const [audioMessage, setAudioMessage] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);

  const waveFormsRef = useRef(null);
  const waveform = useRef(null);

  useEffect(() => {
    const waveformInstance = WaveSurfer.create({
      container: waveFormsRef.current,
      waveColor: "ccc",
      progressColor: "#4e9eff",
      cursorColor: "7ae3c3",
      barWidth: 2,
      height: 30,
    });

    waveformInstance.on("finish", () => {
      setIsPlaying(false);
    });

    waveform.current = waveformInstance;

    return () => {
      waveform.current.destroy();
    };
  }, []);
  // useEffect(() => {
  //   return () => {
  //     waveform.current.destroy();
  //   };
  // }, []);

  useEffect(() => {
    const audioURL = `${HOST}/${message.message}`;
    const audio = new Audio(audioURL);
    setAudioMessage(audio);

    waveform.current.load(audioURL);

    waveform.current.on("ready", () => {
      setTotalDuration(waveform.current.getDuration());
    });
  }, [message.message]);

  useEffect(() => {
    if (audioMessage) {
      const updatePlayBackTime = () => {
        setCurrentPlaybackTime(audioMessage.currentTime);
      };
      audioMessage.addEventListener("timeupdate", updatePlayBackTime);

      return () => {
        audioMessage.removeEventListener("timeupdate", updatePlayBackTime);
      };
    }
  }, [audioMessage]);

  const formatTime = (time) => {
    if (isNaN(time)) {
      return "00:00";
    }
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handlePlayAudio = () => {
    if (audioMessage) {
      waveform.current.stop();
      waveform.current.play();
      audioMessage.play();
      setIsPlaying(true);
    }
  };

  const handlePauseAudio = () => {
    waveform.current.stop();

    audioMessage.pause();
    setIsPlaying(false);
  };

  return (
    <div
      className={`flex items-center text-white text-sm rounded-md h-fit py-2 ${
        message.senderId === currentChatUser.id
          ? "bg-incoming-background"
          : "bg-outgoing-background"
      }`}
    >
      <div className=''>
        <Avatar type={"lg"} image={currentChatUser?.profilePicture} />
      </div>
      <div className='cursor-pointer text-xl'>
        {!isPlaying ? (
          <FaPlay onClick={handlePlayAudio} />
        ) : (
          <FaStop onClick={handlePauseAudio} />
        )}
      </div>
      <div className='relative '>
        <div className='w-60' ref={waveFormsRef} />
        <div className='text-bubble-meta text-xs py-1 flex  justify-between absolute bottom-[-22px] w-full'>
          <span>
            {formatTime(isPlaying ? currentPlaybackTime : totalDuration)}
          </span>
          <div className='flex gap-1'>
            <span>{calculateTime(message.createdAt)}</span>
            {message.senderId === userInfo.id && (
              <MessageStatus messageStatus={message.messageStatus} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VoiceMessage;
