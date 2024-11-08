import qrImg from '@assets/footer/qrcode.svg';
import googlePlayImg from '@assets/footer/google-play.svg';
import playStoreImg from '@assets/footer/download-appstore.svg';

const Footer = () => {
  return (
    <footer className="font-poppins flex flex-wrap items-start justify-center gap-8 p-8 md:gap-16 md:p-16 bg-black text-[#FAFAFA] dark:bg-darkSecondary">
      <div className="flex flex-col gap-4 w-full md:w-auto md:flex-1 text-center md:text-left">
        <h4 className="text-2xl leading-6 font-inter font-bold">Exclusive</h4>
        <p className="text-xl font-medium">Subscribe</p>
        <p>Get 10% off your first order</p>
        <form className="relative mt-2">
          <input
            className="py-2 px-4 bg-transparent w-full outline-none rounded border border-white text-sm"
            type="text"
            placeholder="Enter Your Email"
          />
          <button>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute right-2 top-2"
            >
              <path
                d="M9.91199 11.9998H3.99999L2.02299 4.1348C2.01033 4.0891 2.00262 4.04216 1.99999 3.9948C1.97799 3.2738 2.77199 2.7738 3.45999 3.1038L22 11.9998L3.45999 20.8958C2.77999 21.2228 1.99599 20.7368 1.99999 20.0288C2.00201 19.9655 2.01313 19.9029 2.03299 19.8428L3.49999 14.9998"
                stroke="#FAFAFA"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </form>
      </div>

      <div className="flex flex-col gap-4 w-full md:w-auto md:flex-1 text-center md:text-left">
        <h4 className="text-xl font-medium">Support</h4>
        <p>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
        <p>exclusive@gmail.com</p>
        <p>+88015-88888-9999</p>
      </div>

      <div className="flex flex-col gap-4 w-full md:w-auto md:flex-1 text-center md:text-left">
        <h4 className="text-xl font-medium">Account</h4>
        <ul className="flex flex-col gap-2">
          <li>My Account</li>
          <li>Login / Register</li>
          <li>Cart</li>
          <li>Wishlist</li>
          <li>Shop</li>
        </ul>
      </div>

      <div className="flex flex-col gap-4 w-full md:w-auto md:flex-1 text-center md:text-left">
        <h4 className="text-xl font-medium">Quick Link</h4>
        <ul className="flex flex-col gap-2">
          <li>Privacy Policy</li>
          <li>Terms Of Use</li>
          <li>FAQ</li>
          <li>Contact</li>
        </ul>
      </div>

      <div className="flex flex-col gap-4 w-full md:w-auto md:flex-1 text-center md:text-left">
        <h4 className="text-xl font-medium">Download App</h4>
        <p className="text-sm">Save $3 with App New User Only</p>
        <div className="flex items-center justify-center md:justify-start gap-2">
          <img src={qrImg} alt="qr code" />
          <div className="flex flex-col gap-1">
            <img
              src={googlePlayImg}
              alt="download for android"
              className="w-24"
            />
            <img src={playStoreImg} alt="download for ios" className="w-24" />
          </div>
        </div>
        <div className="flex justify-center md:justify-start gap-4 mt-4">
          <button>
            <i className="fa-brands fa-facebook-f"></i>
          </button>
          <button>
            <i className="fa-brands fa-square-x-twitter"></i>
          </button>
          <button>
            <i className="fa-brands fa-linkedin-in"></i>
          </button>
          <button>
            <i className="fa-brands fa-instagram"></i>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
