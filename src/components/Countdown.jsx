import { useState, useEffect } from 'react';

const Countdown = ({ targetDate }) => {
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

  let colClasses = 'flex flex-col items-center';
  let dateIdentifierClasses = 'text-xs font-poppins font-medium';
  let dateCountClasses = 'font-bold text-[32px] leading-[30px]';

  return (
    <div className="flex items-center justify-center gap-3">
      <p className={colClasses}>
        <span className={dateIdentifierClasses}>Days</span>
        <span className={dateCountClasses}>{timeLeft.days}</span>
      </p>
      <span className="text-basicRed text-3xl">:</span>
      <p className={colClasses}>
        <span className={dateIdentifierClasses}>Hours</span>
        <span className={dateCountClasses}>{timeLeft.hours}</span>
      </p>
      <span className="text-basicRed text-3xl">:</span>
      <p className={colClasses}>
        <span className={dateIdentifierClasses}>Minutes</span>
        <span className={dateCountClasses}>{timeLeft.minutes}</span>
      </p>
      <span className="text-basicRed text-3xl">:</span>
      <p className={colClasses}>
        <span className={dateIdentifierClasses}>Seconds</span>
        <span className={dateCountClasses}>{timeLeft.seconds}</span>
      </p>
    </div>
  );
};

export default Countdown;
