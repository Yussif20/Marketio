import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Countdown = ({
  targetDate,
  colClasses,
  dateIdentifierClasses,
  dateCountClasses,
  isSeparated = true,
  ...props
}) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +new Date(targetDate) - +new Date();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const { t } = useTranslation();
  return (
    <div {...props} className="flex items-center justify-center gap-3">
      <p className={colClasses}>
        <span className={dateIdentifierClasses}>{t('countdown.days')}</span>
        <span className={dateCountClasses}>{timeLeft.days}</span>
      </p>
      {isSeparated && <span className="text-basicRed text-3xl">:</span>}

      <p className={colClasses}>
        <span className={dateIdentifierClasses}>{t('countdown.hours')}</span>
        <span className={dateCountClasses}>{timeLeft.hours}</span>
      </p>
      {isSeparated && <span className="text-basicRed text-3xl">:</span>}
      <p className={colClasses}>
        <span className={dateIdentifierClasses}>{t('countdown.minutes')}</span>
        <span className={dateCountClasses}>{timeLeft.minutes}</span>
      </p>
      {isSeparated && <span className="text-basicRed text-3xl">:</span>}
      <p className={colClasses}>
        <span className={dateIdentifierClasses}>{t('countdown.seconds')}</span>
        <span className={dateCountClasses}>{timeLeft.seconds}</span>
      </p>
    </div>
  );
};

export default Countdown;
