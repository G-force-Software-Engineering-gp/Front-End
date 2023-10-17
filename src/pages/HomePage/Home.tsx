import React from 'react';
import HomePageDetails from './HomePageDetails';
import { HomeSideBar } from './HomeSideBar';

const Home = () => {
  return (
    <div>
      <div className="grid grid-flow-col grid-cols-4 justify-center sm:px-52">
        <div className=" hidden sm:block sm:col-span-1">
          <HomeSideBar />
        </div>
        <div className=" sm:col-span-3 col-span-4 p-5">
          <HomePageDetails />
        </div>
      </div>
    </div>
  );
};

export default Home;
