import Header from '@/components/Header';
import HomePageDetails from './HomePageDetails';
import { HomeSideBar } from './HomeSideBar';

const Home = () => {
  return (
    <div>
      <Header />
      <div className="grid grid-flow-col grid-cols-4 justify-center sm:px-52">
        <div className=" hidden sm:col-span-1 sm:block">
          <HomeSideBar />
        </div>
        <div className=" col-span-4 p-5 sm:col-span-3">
          <HomePageDetails />
        </div>
      </div>
    </div>
  );
};

export default Home;
