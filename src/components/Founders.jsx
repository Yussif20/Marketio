import { useTranslation } from 'react-i18next';

const Founders = () => {
  const { t } = useTranslation();
  const foundersData = t('pages.about.founders.data', { returnObjects: true });

  return (
    <div className="flex justify-center items-center gap-4 flex-wrap mt-16">
      {foundersData.map((founder, index) => (
        <div
          className="flex flex-col items-center gap-4 w-[250px] md:w-[370px] mb-12 dark:bg-darkSecondary shadow-md px-2 py-4 rounded"
          key={index}
        >
          <img className="w-full" src={founder.img} alt={founder.name} />
          <div className="flex flex-col gap-2 text-center text-darkPrimary dark:text-white">
            <h3 className="mt-4">{founder.name}</h3>
            <p>{founder.job}</p>
            <div className="flex gap-3 mx-auto">
              <i className="fa-brands fa-facebook-f"></i>
              <i className="fa-brands fa-square-x-twitter"></i>
              <i className="fa-brands fa-linkedin-in"></i>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Founders;
