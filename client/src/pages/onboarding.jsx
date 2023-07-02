import Avatar from "@/components/common/Avatar";
import Input from "@/components/common/Input";
import { useStateProvider } from "@/context/StateContext";
import { ONBOARD_USER_ROUTE } from "@/utils/ApiRoutes";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { reducerCases } from "@/context/constants";

function onboarding() {
  const [{}, dipatch] = useStateProvider();

  const [{ userInfo, newUser }] = useStateProvider();
  const [name, setName] = useState(userInfo?.name || "");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState("/default_avatar.png");

  const router = useRouter();

  useEffect(() => {
    if (!newUser && !userInfo?.email) {
      router.push("/login");
    } else if (!newUser && userInfo?.email) {
      router.push("/");
    }
  }, [newUser, userInfo, router]);

  const onBoarduserHandler = async () => {
    if (validateDetails) {
      const email = userInfo.email;
      try {
        const { data } = await axios.post(ONBOARD_USER_ROUTE, {
          email,
          name,
          about,
          image,
        });
        if (data.status) {
          dipatch({ type: reducerCases.SET_NEW_USER, newUser: false });
          dipatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              id: data.id,
              name,
              email,
              profileImage: image,
              status: about,
            },
          });
          router.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const validateDetails = () => {
    if (name.length < 3) {
      return false;
    }
    return true;
  };

  return (
    <div className='bg-panel-header-background h-screen w-screen text-white flex flex-col justify-center items-center'>
      <div className='flex justify-center items-center gap-2'>
        <Image src={"/whatsapp.gif"} alt='whatsapp' height={300} width={300} />
        <span className='text-xl md:text-7xl'>whatsapp</span>
      </div>
      <h2 className='text-xl md:text-2xl'>Create your Profile</h2>
      <div className='flex gap-6 mt-6'>
        <div className='flex flex-col justify-center items-center mt-5 gap-6'>
          <Input label name={"Display Name"} state={name} setState={setName} />
          <Input label name={"About"} state={about} setState={setAbout} />
          <div className='flex justify-center items-center'>
            <button
              className='flex justify-center items-center gap-7 bg-search-input-container-background p-5 rounded-xl'
              onClick={onBoarduserHandler}
            >
              Create Profile
            </button>
          </div>
        </div>
        <div className='flex justify-center items-center w-60 h-60'>
          <Avatar type={"xl"} image={image} setImage={setImage} />
        </div>
      </div>
    </div>
  );
}

export default onboarding;
