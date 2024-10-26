import ImageSlider from '@components/ImageSlider';
import Aside from '@components/Aside';

const Home = () => {
  return (
    <div className="flex w-screen ">
      <div>
        <Aside />
      </div>
      <div className="w-full flex items-center justify-center">
        <ImageSlider />
      </div>
    </div>
  );
};

export default Home;
