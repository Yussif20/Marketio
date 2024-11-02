import { Link } from 'react-router-dom';

import Statics from '@components/statics';

import aboutImg from '../assets/about/about.jpeg';
import Founders from '../components/Founders';
import Services from '../components/Services';

const About = () => {
  return (
    <section className="mx-12 dark:bg-darkPrimary dark:text-white">
      <h5 className="py-10 font-poppins">
        <Link className="text-gray-400" to="/">
          Home /{' '}
        </Link>
        <span> About</span>
      </h5>
      <div className="flex items-center gap-6">
        <div className="flex flex-col gap-6">
          <h2 className="font-semibold text-[54px]">Our Story</h2>
          <p>
            Launced in 2015, Exclusive is South Asia’s premier online shopping
            makterplace with an active presense in Bangladesh. Supported by wide
            range of tailored marketing, data and service solutions, Exclusive
            has 10,500 sallers and 300 brands and serves 3 millioons customers
            across the region.{' '}
          </p>
          <p>
            Exclusive has more than 1 Million products to offer, growing at a
            very fast. Exclusive offers a diverse assotment in categories
            ranging from consumer.
          </p>
        </div>
        <img
          className="w-[700px] h-[600px] rounded-md"
          src={aboutImg}
          alt="About us"
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-16">
        <Statics />
        <Founders />
        <Services />
      </div>
    </section>
  );
};

export default About;
