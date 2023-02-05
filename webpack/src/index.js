import "./index.html";
import './index.scss';
import ferra from './img/ferrari.webp';
import {mult, sum} from "./modules/calc";

const img =new Image();
img.src = ferra;

console.log(mult(2,4))
console.log(sum(3,4))