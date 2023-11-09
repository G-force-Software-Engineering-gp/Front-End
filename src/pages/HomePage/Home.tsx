import Header from '@/components/Header';
import HeaderResponsive from '@/components/HeaderResponsive';
import HomePageDetails from './HomePageDetails';
import { HomeSideBar } from './HomeSideBar';

const Home = () => {
  return (
    <div>
      <Header />
      <HeaderResponsive />
      <div className="grid grid-flow-col grid-cols-4 justify-center lg:px-14 md:px-0 xl:px-48">
        <div className=" hidden lg:col-span-1 lg:block">
          <HomeSideBar />
        </div>
        <div className=" col-span-4 p-5 lg:col-span-3">
          <HomePageDetails />
        </div>
      </div>
    </div>
  );
};

export default Home;
