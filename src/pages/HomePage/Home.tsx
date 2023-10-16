import React from 'react';
import HomePageDetails from './HomePageDetails';
import { HomeSideBar } from './HomeSideBar';

const Home = () => {
  return (
    <div>
      <div className="grid grid-flow-col grid-cols-4 justify-center px-52">
        <div className=" col-span-1">
          <HomeSideBar />
        </div>
        <div className=" col-span-3 p-5">
          <HomePageDetails />
        </div>
      </div>
    </div>
  );
};

export default Home;
