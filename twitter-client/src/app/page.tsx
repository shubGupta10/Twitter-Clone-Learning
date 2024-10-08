'use client'
import React, { useCallback } from 'react';
import { BsBell, BsBookmark, BsEnvelope, BsTwitter } from 'react-icons/bs';
import { BiHash, BiHomeCircle, BiMoney, BiUser } from 'react-icons/bi';
import FeedCards from '@/components/FeedCards';
import { SlOptions } from 'react-icons/sl';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import toast from 'react-hot-toast';
import { graphQLClient } from '@/clients/api';
import { verifyUserGoogleTokenQuery } from '../../graphql/query/user';

interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode;
}

const sideBarMenuItems: TwitterSidebarButton[] = [
  { title: "Home", icon: <BiHomeCircle /> },
  { title: "Explore", icon: <BiHash /> },
  { title: "Notification", icon: <BsBell /> },
  { title: "Messages", icon: <BsEnvelope /> },
  { title: "Twitter Blue", icon: <BiMoney /> },
  { title: "Bookmarks", icon: <BsBookmark /> },
  { title: "Profile", icon: <BiUser /> },
  { title: "More", icon: <SlOptions /> },
];

const Home = () => {

  const handleLoginGoogle = useCallback(async (cred: CredentialResponse) => {
    const googleToken = cred.credential;
    if (!googleToken) {
      return toast.error('Google token not found');
    }

    try {
      const { verifyGoogleToken } = await graphQLClient.request(verifyUserGoogleTokenQuery, { token: googleToken });
      toast.success("Verified Success");
      console.log(verifyGoogleToken);
      if(verifyGoogleToken) window.localStorage.setItem('token', verifyGoogleToken)
    } catch (error) {
      toast.error('Verification failed');
      console.error(error);
    }

    
  }, []);

  return (
    <div>
      <div className='grid grid-cols-12 h-screen w-screen'>
        <div className='col-span-3 pt-1 px-4 ml-28'>
          <div className='text-4xl w-fit h-fit hover:bg-gray-600 cursor-pointer transition-all rounded-full p-4'>
            <BsTwitter />
          </div>
          <div className='mt-4 text-xl pr-4'>
            <ul>
              {sideBarMenuItems.map(item => (
                <li key={item.title} className='flex justify-start items-center gap-4 hover:bg-gray-800 rounded-full w-fit px-5 py-2 cursor-pointer mt-2'>
                  <span className='text-3xl'>{item.icon}</span>
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
            <div className='mt-5 px-3'>
              <button className='bg-[#1d9bf0] text-lg p-4 font-semibold rounded-full w-full mx-4'>Tweet</button>
            </div>
          </div>
        </div>
        <div className='col-span-5 border-r-[0.2px] border-l-[0.1px] border h-screen overflow-scroll border-gray-600'>
          <FeedCards />
          <FeedCards />
          <FeedCards />
        </div>
        <div className='col-span-3 p-5'>
          <div className='p-5 bg-slate-700 rounded-lg'>
            <h1>New to Twitter?</h1>
            <GoogleLogin onSuccess={handleLoginGoogle} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
