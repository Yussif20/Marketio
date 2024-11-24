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

import glassesBlackImage from "./assets/products/glasses-black.jpg"
import glassesRoseImage from "./assets/products/glasses-rose.jpg"

import jacketGrayImage from "./assets/products/jacket-gray.jpg"
import jacketBlackImage from "./assets/products/jacket-black.jpg"

import laptopBlueImage from "./assets/products/laptop-blue.jpg"
import laptopGrayImage from "./assets/products/laptop-grey.jpg"

import phoneBlackImage from "./assets/products/phone-black.jpg"
import phoneGoldImage from "./assets/products/phone-gold.jpg"

import ploverBlueImage from "./assets/products/plover-blue.jpg"
import ploverGreenImage from "./assets/products/plover-green.jpg"

import watchBlackImage from "./assets/products/watch-black.jpg"
import watchGoldImage from "./assets/products/watch-gold.jpg"


export const productsData = [
    {
    id: 8,
    imgSrc: laptopBlueImage,
    secondImg: laptopGrayImage,
    firstColor:"black",
    secondColor:"gray",
    title: 'Laptop',
    description: 'Modern and full of feature laptop suitable for work and gaming.',
    price: '375',
    oldPrice: '450',
    discount: '-25%',
    rating: 1.4,
    ratingCount: 254,
  },
  {
    id: 9,
    imgSrc: phoneBlackImage,
    secondImg: phoneGoldImage,
    firstColor:"black",
    secondColor:"yellow",
    title: 'IPhone',
    description: 'Modern Iphone to keep you up with recent features',
    price: '120',
    oldPrice: '200',
    discount: '-40%',
    rating: 4.5,
    ratingCount: 459,
  },
  {
    id: 10,
    imgSrc: ploverBlueImage,
    secondImg: ploverGreenImage,
    firstColor:"blue",
    secondColor:"green",
    title: 'Plover',
    description: 'Warm, Casual plover to keep you warm.',
    price: '960',
    oldPrice: '1050',
    discount: '-35%',
    rating: 4.7,
    ratingCount: 780,
  },
  {
    id: 1,
    imgSrc: joystickImage,
    title: 'Sony Joystick Controller',
    description: 'A versatile joystick controller compatible with multiple gaming systems, designed for precision and comfort.',
    price: '120',
    oldPrice: '200',
    discount: '-40%',
    rating: 4.5,
    ratingCount: 459,
  },
  {
    id: 2,
    imgSrc: monitorImage,
    title: 'Dragon Screen',
    description: 'High-quality Screen offering exceptional sound clarity and clear Vision, perfect for immersive experiences.',
    price: '960',
    oldPrice: '1050',
    discount: '-35%',
    rating: 4.7,
    ratingCount: 780,
  },
  {
    id: 3,
    imgSrc: keyboardImage,
    title: 'Gaming Keyboard',
    description: 'A stylish, mechanical Keyboard crafted with precision for the modern, active lifestyle.',
    price: '370',
    oldPrice: '450',
    discount: '-30%',
    rating: 3,
    ratingCount: 68,
  },
  {
    id: 4,
    imgSrc: chairImage,
    title: 'Ikea Chair',
    description: 'A very comfortable chair to help you relax after tiring long days.',
    price: '375',
    oldPrice: '430',
    discount: '-25%',
    rating: 4.9,
    ratingCount: 695,
  },
  {
    id: 5,
    imgSrc: glassesBlackImage,
    secondImg: glassesRoseImage,
    firstColor:"black",
    secondColor:"rose",
    title: 'Modern Sun glasses',
    description: 'A sleek, ergonomic sun glasses to protect your eyes in sunny days.',
    price: '120',
    oldPrice: '150',
    discount: '-40%',
    rating: 2.2,
    ratingCount: 120,
  },
  {
    id: 6,
    imgSrc: watchBlackImage,
    secondImg: watchGoldImage,
    firstColor:"black",
    secondColor:"yellow",
    title: 'Rolex Watch',
    description: 'Modern, Stylish watch to keep you elegant.',
    price: '960',
    oldPrice: '1150',
    discount: '-35%',
    rating: 4,
    ratingCount: 534,
  },
  {
    id: 7,
    imgSrc: jacketBlackImage,
    secondImg: jacketGrayImage,
    firstColor:"black",
    secondColor:"gray",
    title: 'Waterproof Jacket',
    description: 'Casual Jacket to protect you from Rain.',
    price: '370',
    oldPrice: '440',
    discount: '-30%',
    rating: 3,
    ratingCount: 104,
  },
  
];

