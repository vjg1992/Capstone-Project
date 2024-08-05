const Wishlist = require('../models/Wishlist');
const CatProduct = require('../models/CatProduct');
const DogProduct = require('../models/DogProduct');
const FishProduct = require('../models/FishProduct');
const PetAccessory = require('../models/PetAccessory');
const PetHealth = require('../models/PetHealth');
const PetSupply = require('../models/PetSupply');

const findProductById = async (productId) => {
    let product = await CatProduct.findById(productId)
        || await DogProduct.findById(productId)
        || await FishProduct.findById(productId)
        || await PetAccessory.findById(productId)
        || await PetHealth.findById(productId)
        || await PetSupply.findById(productId);
    return product;
};

exports.addToWishlist = async (req, res) => {
    try {
        const { productId, productModel } = req.body;
        const userId = req.user.id;

        let wishlist = await Wishlist.findOne({ user: userId });
        
        if (!wishlist) {
            wishlist = new Wishlist({ user: userId, products: [] });
        }

        const product = await findProductById(productId);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        wishlist.products.push({ productId, productModel });
        await wishlist.save();

        res.status(200).json(wishlist);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.removeFromWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user.id;

        let wishlist = await Wishlist.findOne({ user: userId });
        if (!wishlist) {
            return res.status(404).json({ msg: 'Wishlist not found' });
        }

        wishlist.products = wishlist.products.filter(item => item.productId.toString() !== productId);

        await wishlist.save();

        res.status(200).json(wishlist);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const wishlist = await Wishlist.findOne({ user: userId }).populate('products.productId');

        if (!wishlist) {
            return res.status(404).json({ msg: 'Wishlist not found' });
        }

        res.status(200).json(wishlist);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
