const Review = require('../models/Review');
const CatProduct = require('../models/CatProduct');
const DogProduct = require('../models/DogProduct');
const FishProduct = require('../models/FishProduct');
const PetAccessory = require('../models/PetAcessory');
const PetHealth = require('../models/PetHealth');
const PetSupply = require('../models/PetSupply');

// Function to find the product in the appropriate collection
const findProductById = async (productId) => {
    let product = await CatProduct.findById(productId)
        || await DogProduct.findById(productId)
        || await FishProduct.findById(productId)
        || await PetAccessory.findById(productId)
        || await PetHealth.findById(productId)
        || await PetSupply.findById(productId);
    return product;
};

exports.addReview = async (req, res) => {
    try {
        const { productId, rating, comment, productModel } = req.body;
        const userId = req.user.id;

        const product = await findProductById(productId);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        const review = new Review({
            user: userId,
            product: productId,
            productModel,
            rating,
            comment
        });

        await review.save();

        res.status(201).json(review);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getReviewsByProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const reviews = await Review.find({ product: productId }).populate('user');

        if (!reviews) {
            return res.status(404).json({ msg: 'No reviews found for this product' });
        }

        res.status(200).json(reviews);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getReviewsByUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const reviews = await Review.find({ user: userId }).populate('product');

        if (!reviews) {
            return res.status(404).json({ msg: 'No reviews found for this user' });
        }

        res.status(200).json(reviews);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
