import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { GET_ALL_CONTACTS } from "@/utils/ApiRoutes";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiArrowBack, BiSearchAlt2 } from "react-icons/bi";
import ChatLIstItem from "./ChatLIstItem";

function ContactsList() {
  const [allContacts, setAllContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchContacts, setSearchContacts] = useState([]);
  const [{}, dispatch] = useStateProvider();

  useEffect(() => {
    if (searchTerm.length) {
      const filteredData = {};
      Object.keys(allContacts).forEach((key) => {
        filteredData[key] = allContacts[key].filter((obj) =>
          obj.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      setSearchContacts(filteredData);
    } else {
      setSearchContacts(allContacts);
    }
  }, [searchTerm]);

  useEffect(() => {
    const getContacts = async () => {
      try {
        const {
          data: { users },
        } = await axios.get(GET_ALL_CONTACTS);
        setAllContacts(users);
        setSearchContacts(users);
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);

  return (
    <div className='h-full flex flex-col'>
      <div className='flex items-end h-24 px-3 py-4'>
        <div className='flex items-center gap-2 md:gap-12 text-white'>
          <BiArrowBack
            onClick={() =>
              dispatch({ type: reducerCases.SET_ALL_CONTACTS_PAGE })
            }
            className='cursor-pointer text-xl'
          />
          <span>New Chat</span>
        </div>
      </div>
      <div className='bg-search-input-container-background flex-auto  h-full custom-scrollbar overflow-auto'>
        <div className='flex py-3 items-center gap-3 h-14 '>
          <div className='bg-panel-header-background flex items-center gap-5 px-3 py-1 rounded-lg flex-grow mx-1 md:mx-4 '>
            <div>
              <BiSearchAlt2 className='text-panel-header-icon cursor-pointer text-xl' />
            </div>
            <div>
              <input
                type='text'
                placeholder='Search Contacts'
                className='bg-transparent text-sm focus:outline-none text-white w-full truncate'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        {/* map allContacts */}
        {Object.entries(searchContacts).map(([initialLetter, userList]) => (
          <div key={Date.now() + initialLetter} className=''>
            {userList.length > 0 && (
              <div className='text-teal-light pl-4 py-2 md:pl-10 md:py-5'>
                {initialLetter}
              </div>
            )}
            {userList.map((user) => (
              <ChatLIstItem key={user.id} data={user} isContactPage={true} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContactsList;
