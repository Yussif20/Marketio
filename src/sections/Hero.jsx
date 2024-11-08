import Aside from '@components/Aside.jsx';
import HeroSlider from '@components/HeroSlider.jsx';

const Hero = () => {
  return (
    <section className="flex w-screen ">
      <div>
        <Aside />
      </div>
      <div className="w-full flex items-center justify-center">
        <HeroSlider />
      </div>
    </section>
  );
};

export default Hero;
