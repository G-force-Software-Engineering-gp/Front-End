import Header from '@/components/Header';
import HeaderResponsive from '@/components/HeaderResponsive';
import BoardHeader from './boardHeader';
import BurnDownChart from './components/BurnDownChart';

const BurnDownPage = () => {
  return (
    <div className="h-[calc(100vh-8.5rem)">
      <Header />
      <HeaderResponsive />
      <BoardHeader />
      <div className="flex overflow-x-auto">
        <BurnDownChart />
      </div>
    </div>
  );
};

export default BurnDownPage;
