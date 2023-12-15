import Header from '@/components/Header';
import HeaderResponsive from '@/components/HeaderResponsive';
import React from 'react';
import WorkSpacePageDetails from './components/WorkSpacePageDetails';
import { HomeSideBar } from './HomeSideBar';

const WorkSpacePage = () => {
  return (
    <div>
      <Header />
      <HeaderResponsive />
      <div className="grid grid-flow-col grid-cols-4 justify-center md:px-0 lg:px-14 xl:px-48">
        <div className=" hidden lg:col-span-1 lg:block">
          <HomeSideBar />
        </div>
        <div className=" col-span-4 p-5 lg:col-span-3">
          <WorkSpacePageDetails />
        </div>
      </div>
    </div>
  );
};

export default WorkSpacePage;
