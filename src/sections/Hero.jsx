import Aside from '../components/Aside.jsx';
import ImageSlider from '../components/ImageSlider.jsx';

const Hero = () => {
  return (
    <section className="flex w-screen ">
      <div>
        <Aside />
      </div>
      <div className="w-full flex items-center justify-center">
        <ImageSlider />
      </div>
    </section>
  );
};

export default Hero;
