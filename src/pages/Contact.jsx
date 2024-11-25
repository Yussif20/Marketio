import { Link } from 'react-router-dom';
import Button from '@components/Button';
import { useTranslation } from 'react-i18next';

export const Contact = () => {
  const { t } = useTranslation();
  const inputStyles =
    'bg-[#F5F5F5] dark:bg-darkSecondary outline-none py-2 px-4 rounded w-full md:w-[300px] lg:w-fit';
  return (
    <section className="mx-12 dark:bg-darkPrimary dark:text-white font-poppins">
      <h5 className="py-10">
        <Link className="text-gray-400" to="/">
          {t('pages.contact.breadcrumbs.home')} /
        </Link>
        <span> {t('pages.contact.breadcrumbs.contact')}</span>
      </h5>
      <div className="flex flex-col sm:flex-row py-6 md:py-0 items-center md:justify-evenly gap-8">
        <div className="order-2 sm:order-1 w-[340px]  shadow-md flex flex-col items-center justify-center ">
          <div className=" flex flex-col items-center sm:items-start gap-4 py-10 w-10/12 mx-12 border-b">
            <div className="flex items-center gap-4 ">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="40" height="40" rx="20" fill="#DB4444" />
                <path
                  d="M18.5542 14.24L15.1712 10.335C14.7812 9.885 14.0662 9.887 13.6132 10.341L10.8312 13.128C10.0032 13.957 9.76623 15.188 10.2452 16.175C13.1069 22.1 17.8853 26.8851 23.8062 29.755C24.7922 30.234 26.0222 29.997 26.8502 29.168L29.6582 26.355C30.1132 25.9 30.1142 25.181 29.6602 24.791L25.7402 21.426C25.3302 21.074 24.6932 21.12 24.2822 21.532L22.9182 22.898C22.8484 22.9712 22.7565 23.0194 22.6566 23.0353C22.5567 23.0512 22.4543 23.0339 22.3652 22.986C20.1357 21.7021 18.2862 19.8502 17.0052 17.619C16.9573 17.5298 16.9399 17.4272 16.9558 17.3272C16.9717 17.2271 17.02 17.135 17.0932 17.065L18.4532 15.704C18.8652 15.29 18.9102 14.65 18.5542 14.239V14.24Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h3> {t('pages.contact.callToUs.phone.title')}</h3>
            </div>
            <p className="text-sm">
              {t('pages.contact.callToUs.phone.description')}
            </p>
            <p className="text-sm">
              {' '}
              {t('pages.contact.callToUs.phone.phoneNumber')}
            </p>
          </div>
          <div className="flex flex-col items-center sm:items-start gap-4 py-10 w-10/12 mx-12">
            <div className="flex items-center gap-4 ">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="40" height="40" rx="20" fill="#DB4444" />
                <path
                  d="M10 13L20 20L30 13M10 27H30V13H10V27Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <h3> {t('pages.contact.callToUs.email.title')}</h3>
            </div>
            <p className="text-sm">
              {t('pages.contact.callToUs.email.description')}
            </p>
            <p className="text-sm">
              {' '}
              {t('pages.contact.callToUs.email.email')}
            </p>
          </div>
        </div>
        <div className="order-1 sm:order-2 flex flex-col lg:flex-1 gap-6">
          <div className=" flex flex-col lg:flex-row items-center gap-4">
            <input
              type="text"
              name="name"
              placeholder={t('pages.contact.form.namePlaceholder')}
              className={inputStyles}
            />
            <input
              type="mail"
              name="mail"
              placeholder={t('pages.contact.form.emailPlaceholder')}
              className={inputStyles}
            />
            <input
              type="tel"
              name="phone"
              placeholder={t('pages.contact.form.phonePlaceholder')}
              className={inputStyles}
            />
          </div>
          <textarea
            className="bg-[#F5F5F5] dark:bg-darkSecondary resize-none rounded h-36 md:h-52 max-w-[730px] py-2 px-4 outline-none"
            name="message"
            id="message"
            placeholder={t('pages.contact.form.messagePlaceholder')}
          ></textarea>
          <Button className="lg:ml-auto">
            {t('pages.contact.form.submitButton')}
          </Button>
        </div>
      </div>
    </section>
  );
};
