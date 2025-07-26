// src/data/productsData.js
import fashion from '../images/fashion.jpeg';
import grocerie from '../images/grocerie.jpeg';
import hotel from '../images/onfoodd.png';
import laptops from '../images/laptops.jpeg';
import makeup from '../images/makeup.jpeg';
import mobiles from '../images/mobiles.jpeg';
import caps from '../images/caps1.jpeg';
import dress from '../images/fashion.jpeg';
import food from '../images/dryfruits.jpeg';
import footwere from '../images/footwere.png';
import phants from '../images/phants.jpeg';

const productsData = [
  {
    name: 'Fashion',
    category: 'topwere',
    src: fashion,
    cost: '30',
    store: 'Spicy',
    stock: 'Tuni'
  },
  {
    name: 'Groceries',
    category: 'essentials',
    src: grocerie,
    cost: '50',
    store: 'GrocerMart',
    stock: 'Tuni'
  },
  {
    name: 'Medico',
    category: 'medical',
    src: hotel,
    cost: '120',
    store: 'HealthStore',
    stock: 'Kakinada'
  },
  
  
  
  { src: phants, name: 'MensPhant', cost: '1', store: 'Spicy', stock: 'Pithapuram', category: 'fashion' },
  { src: phants, name: 'MensPhant', cost: '1', store: 'Spicy', stock: 'Pithapuram', category: 'bottomwere' },

  { src: caps, name: 'RedCap', cost: '129', store: 'Capsden', stock: 'Pithapuram', category: 'fashion' },
  { src: footwere, name: 'MensShoe', cost: '499', store: 'PopularShoeMart', stock: 'Kakinada', category: 'fashion' },
  { src: food, name: 'DryFruits 500gm', cost: '599', store: 'Madhu', stock: 'Pithapuram', category: 'groceries' },
  { src: dress, name: 'CottonDress', cost: '999', store: 'Spicy', stock: "Tuni", category: 'fashion' },
  { src: laptops, name: 'Lenovo Ideapad', cost: '29999', store: 'LaptopWorld', stock: 'Kakinada', category: 'laptops' },
  { src: mobiles, name: 'Samsung M14', cost: '13999', store: 'MobileMart', stock: 'Pithapuram', category: 'mobiles' },
  { src: makeup, name: 'Lipstick Set', cost: '699', store: 'GlowUp', stock: 'Tuni', category: 'makeup' }

];

export default productsData;


