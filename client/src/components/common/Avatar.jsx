import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import ContextMenu from "./ContextMenu";
import PhotoPicker from "./PhotoPicker";
import PhotoLibrary from "./PhotoLibrary";
import CapturePhoto from "./CapturePhoto";

function Avatar({ type, image, setImage }) {
  const [hover, setHover] = useState(false);
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  const [contextMenuCoordinates, setContextMenuCoordinates] = useState({
    x: 0,
    y: 0,
  });
  const [grabPhoto, setGrabPhoto] = useState(false);
  const [showPhotoLibrary, setShowPhotoLibrary] = useState(false);
  const [showCapturePhoto, setShowCapturePhoto] = useState(false);

  const showContextMenu = (e) => {
    setContextMenuCoordinates({ x: e.pageX, y: e.pageY });
    setIsContextMenuVisible(true);
  };

  useEffect(() => {
    if (grabPhoto) {
      const data = document.getElementById("photo-picker");
      data.click();
      document.body.onfocus = async (e) => {
        setTimeout(() => {
          setGrabPhoto(false);
        }, 1000);
      };
    }
  }, [grabPhoto]);

  const contextMenuOptions = [
    {
      name: "Take a Picture",
      callback: () => {
        setShowCapturePhoto(true);
      },
    },
    {
      name: "Choose From Library",
      callback: () => {
        setShowPhotoLibrary(true);
      },
    },
    {
      name: "Upload a Picture",
      callback: () => {
        setGrabPhoto(true);
      },
    },
    {
      name: "Remove Picture",
      callback: () => {
        setImage("/default_avatar.png");
      },
    },
  ];

  const photoPickerChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    const data = document.createElement("img");
    reader.onload = function (event) {
      data.src = event.target.result;
      data.setAttribute("data-src", event.target.result);
    };
    reader.readAsDataURL(file);
    setTimeout(() => {
      setImage(data.src);
    }, 100);
  };

  return (
    <>
      <div className='flex justify-center items-center'>
        {type === "sm" && (
          <div className='relative h-10 w-10'>
            <Image
              src={image}
              alt='avatar'
              className='rounded-full'
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            />
          </div>
        )}
        {type === "lg" && (
          <div className='relative h-14 w-14'>
            <Image
              src={image}
              alt='avatar'
              className='rounded-full'
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            />
          </div>
        )}
        {type === "xl" && (
          <div
            className='relative cursor-pointer z-0 h-60 w-60'
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <div
              className={`bg-photopicker-overlay-background h-60 w-60 absolute top-0 left-0 flex items-center rounded-full justify-center flex-col text-center gap-2 z-10 ${
                hover ? "visible" : "hidden"
              }`}
              id='context-opener'
              onClick={(e) => showContextMenu(e)}
            >
              <FaCamera className='text-2xl' id='context-opener' />
              <span onClick={(e) => showContextMenu(e)} id='context-opener'>
                Change Profile Picture
              </span>
            </div>
            <div className='relative h-60 w-60'>
              <Image
                src={image}
                alt='avatar'
                className='rounded-full'
                fill
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              />
            </div>
          </div>
        )}
      </div>
      {isContextMenuVisible && (
        <ContextMenu
          options={contextMenuOptions}
          coordinates={contextMenuCoordinates}
          contextMenu={isContextMenuVisible}
          setContextMenu={setIsContextMenuVisible}
        />
      )}
      {showCapturePhoto && (
        <CapturePhoto
          setPhoto={setImage}
          hideCapturePhoto={setShowCapturePhoto}
        />
      )}
      {showPhotoLibrary && (
        <PhotoLibrary
          setPhoto={setImage}
          hidePhotoLibrary={setShowPhotoLibrary}
        />
      )}
      {grabPhoto && <PhotoPicker onChange={photoPickerChange} />}
    </>
  );
}

export default Avatar;
