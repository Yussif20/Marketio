// Hero 
import headphoneImage from './assets/hero/headphones.jpg'
import lensImage from './assets/hero/lens.jpg'
import controllerImage from './assets/hero/controller.jpg'
import purseImage from './assets/hero/purse.jpg'
import watchImage from './assets/hero/watch.jpg'

export const heroSliderData = [
  {
    id: 1,
    title: 'Robusta Headphones',
     image: headphoneImage,
  },
  {
    id: 2,
    title: 'Canon Lens',
       image: lensImage,
  },
    {
    id: 3,
    title: 'Sony Joystick',
    image: controllerImage,
  },
  {
    id: 4,
    title: 'Gucci Purse',
    image: purseImage,
  },
  {
    id: 5,
    title: 'Rolex Watch',
       image: watchImage,
  },
];

// Categories
export const categories = [
  { id: 1, title: "Camera", icon:"fas fa-camera" },
  { id: 2, title: "Phones", icon:"fas fa-mobile-alt"},
  { id: 3, title: "Computers", icon:"fas fa-laptop" },
  { id: 4, title: "Formal Cloth", icon:"fa-solid fa-user-tie" },
  { id: 5, title: "Headphones", icon:"fas fa-headphones" },
  { id: 6, title: "Gaming", icon:"fas fa-gamepad" },
  { id: 7, title: "Cloth", icon:"fas fa-tshirt" },
  { id: 8, title: "Cups", icon:"fas fa-mug-hot" },
];


//Founders
import TomImage from './assets/about/tom.png'
import WillImage from './assets/about/will.png'

export const foundersData = [
  { id: 1, name: "Ahmed Fathy",job:"Founder & Chairman", img:TomImage },
  { id: 2, name: "Muhamed Abusrea",job:"Founder & Chairman", img:WillImage },
  { id: 3, name: "Mohamed Ali",job:"Founder & Chairman", img:TomImage },
  { id: 4, name: "Ibrahim Zakaria",job:"Founder & Chairman", img:WillImage },
  { id: 5, name: "Abdelrahman Emara",job:"Founder & Chairman", img:TomImage },
  { id: 6, name: "Mostafa Zeit",job:"Founder & Chairman", img:WillImage },
  { id: 7, name: "Yousef Ayman",job:"Founder & Chairman", img:TomImage },
];

// Products 

import joystickImage from "./assets/products/controller.png";
import monitorImage from "./assets/products/monitor.png"
import keyboardImage from "./assets/products/keyboard.png"
import chairImage from "./assets/products/chair.png"
import ploverBlackPaigeImage from "./assets/products/plover-black-paige.jpg";
import ploverBlackRoseImage from "./assets/products/plover-black-rose.jpg"
import ploverBlueImage from "./assets/products/plover-blue.jpg"
import ploverGreenImage from "./assets/products/plover-green.jpg"
import ploverBrownImage from "./assets/products/plover-brown.jpg"
import carRedImage from "./assets/products/car-red.jpg"
import carYellowImage from "./assets/products/car-yellow.jpg"
import earRingsImage from "./assets/products/ear-ring-2.jpg"
// import carBlackImage from "./assets/products/car-black.jpg"
// import jacketBlackImage from "./assets/products/jacket-black.jpg"
// import earRingImage from "./assets/products/ear-ring.jpg"
// import laptopBlueImage from "./assets/products/laptop-blue.jpg"
import jacketGrayImage from "./assets/products/jacket-gray.jpg"
import jacketWhiteImage from "./assets/products/jacket-white.jpg"
import laptopCayanImage from "./assets/products/laptop-cayan.jpg"
import laptopPurpleImage from "./assets/products/laptop-purple.jpg"
import phoneBlackImage from "./assets/products/phone-black.jpg"
import phoneWhiteImage from "./assets/products/phone-white.jpg"
import phoneRoseImage from "./assets/products/phone-rose.jpg"
import watchBlackImage from "./assets/products/watch-black.jpg"
import watchGoldImage from "./assets/products/watch-gold.jpg"
import watchGrayImage from "./assets/products/watch-gray.jpg"
import glassesBlackImage from "./assets/products/glasses-black.jpg"

export const productsData =[
  {
    id: 1,
    imgSrc: joystickImage,
    title: 'Sony Joystick Controller',
    price: '$120',
    oldPrice:"$200",
    discount: '-40%',
    rating:4.5,
    ratingCount: 459,
  },
  {
    id: 2,
    imgSrc: monitorImage,
    title: 'Dragon Headphones',
    price: '$960',
    oldPrice:"$1050",
    discount: '-35%',
    rating: 4.7,
    ratingCount: 780,
  },
  {
    id: 3,
    imgSrc: keyboardImage,
    title: 'Rolex Water-Resist Watch',
    price: '$370',
    oldPrice:"$450",
    discount: '-30%',
    rating: 3,
    ratingCount: 68,
  },
  {
    id: 4,
    imgSrc: chairImage,
    title: 'Canon Digital Camera',
    price: '$375',
    oldPrice:"$430",
    discount: '-25%',
    rating: 4.9,
    ratingCount: 695,
  },
  {
    id: 5,
    imgSrc: phoneBlackImage,
    title: 'Sony Joystick Controller',
    price: '$120',
    oldPrice:"$150",
    discount: '-40%',
    rating: 2.2,
    ratingCount: 120,
  },
  {
    id: 6,
    imgSrc: watchBlackImage,
    title: 'Dragon Headphones',
    price: '$960',
    oldPrice:"$1150",
    discount: '-35%',
    rating: 4,
    ratingCount: 534,
  },
  {
    id: 7,
    imgSrc: ploverBlackPaigeImage,
    title: 'Rolex Water-Resist Watch',
    price: '$370',
    oldPrice:"$440",
    discount: '-30%',
    rating: 3,
    ratingCount: 104,
  },
  {
    id: 8,
    imgSrc: carRedImage,
    title: 'Canon Digital Camera',
    price: '$375',
    oldPrice:"$450",
    discount: '-25%',
    rating: 1.4,
    ratingCount: 254,
  },
    {
    id: 9,
    imgSrc: jacketGrayImage,
    title: 'Sony Joystick Controller',
    price: '$120',
    oldPrice:"$200",
    discount: '-40%',
    rating:4.5,
    ratingCount: 459,
  },
  {
    id: 10,
    imgSrc: earRingsImage,
    title: 'Dragon Headphones',
    price: '$960',
    oldPrice:"$1050",
    discount: '-35%',
    rating: 4.7,
    ratingCount: 780,
  },
  {
    id: 11,
    imgSrc: ploverBlackRoseImage,
    title: 'Rolex Water-Resist Watch',
    price: '$370',
    oldPrice:"$450",
    discount: '-30%',
    rating: 3,
    ratingCount: 68,
  },
  {
    id: 12,
    imgSrc: laptopCayanImage,
    title: 'Canon Digital Camera',
    price: '$375',
    oldPrice:"$430",
    discount: '-25%',
    rating: 4.9,
    ratingCount: 695,
  },
  {
    id: 13,
    imgSrc: watchGoldImage,
    title: 'Sony Joystick Controller',
    price: '$120',
    oldPrice:"$150",
    discount: '-40%',
    rating: 2.2,
    ratingCount: 120,
  },
  {
    id: 14,
    imgSrc: phoneWhiteImage,
    title: 'Dragon Headphones',
    price: '$960',
    oldPrice:"$1150",
    discount: '-35%',
    rating: 4,
    ratingCount: 534,
  },
  {
    id: 15,
    imgSrc: ploverGreenImage,
    title: 'Rolex Water-Resist Watch',
    price: '$370',
    oldPrice:"$440",
    discount: '-30%',
    rating: 3,
    ratingCount: 104,
  },
  {
    id: 16,
    imgSrc: glassesBlackImage,
    title: 'Canon Digital Camera',
    price: '$375',
    oldPrice:"$450",
    discount: '-25%',
    rating: 1.4,
    ratingCount: 254,
  },
    {
    id: 17,
    imgSrc: carYellowImage,
    title: 'Sony Joystick Controller',
    price: '$120',
    oldPrice:"$200",
    discount: '-40%',
    rating:4.5,
    ratingCount: 459,
  },
  {
    id: 18,
    imgSrc: jacketWhiteImage,
    title: 'Dragon Headphones',
    price: '$960',
    oldPrice:"$1050",
    discount: '-35%',
    rating: 4.7,
    ratingCount: 780,
  },
  {
    id: 19,
    imgSrc: laptopPurpleImage,
    title: 'Rolex Water-Resist Watch',
    price: '$370',
    oldPrice:"$450",
    discount: '-30%',
    rating: 3,
    ratingCount: 68,
  },
  {
    id: 20,
    imgSrc: watchGrayImage,
    title: 'Canon Digital Camera',
    price: '$375',
    oldPrice:"$430",
    discount: '-25%',
    rating: 4.9,
    ratingCount: 695,
  },
  {
    id: 21,
    imgSrc: ploverBlueImage,
    title: 'Sony Joystick Controller',
    price: '$120',
    oldPrice:"$150",
    discount: '-40%',
    rating: 2.2,
    ratingCount: 120,
  },
  {
    id: 22,
    imgSrc: phoneRoseImage,
    title: 'Dragon Headphones',
    price: '$960',
    oldPrice:"$1150",
    discount: '-35%',
    rating: 4,
    ratingCount: 534,
  },
  {
    id: 23,
    imgSrc: glassesBlackImage,
    title: 'Rolex Water-Resist Watch',
    price: '$370',
    oldPrice:"$440",
    discount: '-30%',
    rating: 3,
    ratingCount: 104,
  },
  {
    id: 24,
    imgSrc: ploverBrownImage,
    title: 'Canon Digital Camera',
    price: '$375',
    oldPrice:"$450",
    discount: '-25%',
    rating: 1.4,
    ratingCount: 254,
  },
];

