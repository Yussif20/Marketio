import ImageSlider from '@components/ImageSlider';
import Aside from '@components/Aside';
import Section from '../components/Section';

const Home = () => {
  return (
    <main>
      <div className="flex w-screen ">
        <div>
          <Aside />
        </div>
        <div className="w-full flex items-center justify-center">
          <ImageSlider />
        </div>
      </div>
      <Section></Section>
    </main>
  );
};

export default Home;
