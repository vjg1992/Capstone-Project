const Book = require('../models/BooksSchema');
const Electronics = require('../models/ElectronicsSchema');
const Fashion = require('../models/FashionSchema');
const HomeAndKitchen = require('../models/HomeandKitchenSchema');
const SportsAndFitness = require('../models/SportsandFitnessSchema');

exports.getAllProducts = async (req, res) => {
  try {
    const books = await Book.find();
    const electronics = await Electronics.find();
    const fashion = await Fashion.find();
    const homeAndKitchen = await HomeAndKitchen.find();
    const sportsAndFitness = await SportsAndFitness.find();
    const allProducts = [...books, ...electronics, ...fashion, ...homeAndKitchen, ...sportsAndFitness];
    res.json(allProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductsByCategory = async (req, res) => {
  const category = req.params.category;
  try {
    let products;
    switch (category) {
      case 'books':
        products = await Book.find();
        break;
      case 'electronics':
        products = await Electronics.find();
        break;
      case 'fashion':
        products = await Fashion.find();
        break;
      case 'home-and-kitchen':
        products = await HomeAndKitchen.find();
        break;
      case 'sports-and-fitness':
        products = await SportsAndFitness.find();
        break;
      default:
        return res.status(400).json({ message: 'Invalid category' });
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
