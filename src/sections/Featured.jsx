import Section from '../components/Section';
import Services from '../components/Services';

import playstationImg from '../assets/featured/playstation.png';
import speakersImg from '../assets/featured/speakers.png';
import perfumeImg from '../assets/featured/perfume.png';

const Featured = () => {
  return (
    <Section title="Featured" headline="New Arrival">
      <div className="flex items-center justify-evenly gap-4 my-12 flex-wrap">
        <div className="relative h-[600px] w-[570px] max-w-full rounded bg-black flex items-center justify-center ">
          <img
            className="hover:scale-105 transition-transform "
            src={playstationImg}
            alt="playstation"
          />
          <div className="absolute bottom-20 left-8 flex flex-col items-start gap-4 text-white ">
            <h3 className="text-2xl">Playstation 5</h3>
            <p className="text-sm font-poppins">
              Black and White version of the PS5 <br /> coming out on sale.
            </p>
            <button className="font-semibold underline hover:no-underline transition-all duration-[300ms] ease-in-out">
              ShopNow
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="relative h-[284px] w-[400px] md:w-[570px] rounded bg-black max-w-full">
            <div className="absolute bottom-12 left-8 flex flex-col items-start gap-4 text-white ">
              <h3 className="text-2xl">Women’s Collections</h3>
              <p className="text-sm font-poppins">
                Featured woman collections that <br /> give you another vibe.
              </p>
              <button className="font-semibold underline hover:no-underline transition-all duration-[300ms] ease-in-out">
                ShopNow
              </button>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative h-[284px] w-[270px] rounded bg-black flex items-center justify-center">
              <img
                className="hover:scale-105 transition-transform "
                src={speakersImg}
                alt="speakers"
              />
              <div className="absolute bottom-12 left-8 flex flex-col items-start gap-3 text-white ">
                <h3 className="text-2xl">Speakers</h3>
                <p className="text-sm font-poppins">Amazon wireless speakers</p>
                <button className="font-semibold underline hover:no-underline transition-all duration-[300ms] ease-in-out">
                  ShopNow
                </button>
              </div>
            </div>
            <div className="relative h-[284px] w-[270px] rounded bg-black flex items-center justify-center">
              <img
                className="hover:scale-105 transition-transform "
                src={perfumeImg}
                alt="perfume"
              />

              <div className="absolute bottom-12 left-8 flex flex-col items-start gap-3 text-white ">
                <h3 className="text-2xl">Perfume</h3>
                <p className="text-sm font-poppins">GUCCI INTENSE OUD EDP</p>
                <button className="font-semibold underline hover:no-underline transition-all duration-[300ms] ease-in-out">
                  Shop now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center ">
        <Services />
      </div>
    </Section>
  );
};

export default Featured;
