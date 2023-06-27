import Image from "next/image";
import React from "react";

function onboarding() {
  return (
    <div className='bg-panel-header-background h-screen w-screen text-white flex flex-col justify-center items-center'>
      <div className='flex justify-center items-center gap-2'>
        <Image src={"/whatsapp.gif"} alt='whatsapp' height={300} width={300} />
        <span className='text-xl md:text-7xl'>whatsapp</span>
      </div>
      <h2 className='text-xl md:text-2xl'>Create your Profile</h2>
      <div className='flex gap-6 mt-6'>
        <div className='flex flex-col justify-center items-center mt-5 gap-6'>
          <input type='email' placeholder='<EMAIL>' required />
        </div>
      </div>
    </div>
  );
}

export default onboarding;
