import Image from "next/image";
import React from "react";
import { IoClose } from "react-icons/io5";

function PhotoLibrary({ setPhoto, hidePhotoLibrary }) {
  const images = [
    "/avatars/1.png",
    "/avatars/2.png",
    "/avatars/3.png",
    "/avatars/4.png",
    "/avatars/5.png",
    "/avatars/6.png",
    "/avatars/7.png",
    "/avatars/8.png",
    "/avatars/9.png",
  ];

  return (
    <div className='fixed top-0 left-0 max-h-[100vh] max-w-[100vw] h-full w-full flex justify-center items-center'>
      <div className='h-max w-max bg-gray-900 gap-6 rounded-lg p-4'>
        <div className='cursor-pointer' onClick={() => hidePhotoLibrary(false)}>
          <IoClose className='h-10 w-10' />
        </div>
        <div className='grid grid-cols-3 gap-16 justify-center items-center p-20 w-full  '>
          {images.map((image) => (
            <div
              className=' relative h-24 w-24 cursor-pointer'
              key={image}
              onClick={() => {
                setPhoto(image);
                hidePhotoLibrary(false);
              }}
            >
              <Image
                key={image}
                alt='Avatar'
                src={image}
                fill
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PhotoLibrary;
