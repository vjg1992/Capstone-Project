const Review = require('../models/Review');
const CatProduct = require('../models/CatProduct');
const DogProduct = require('../models/DogProduct');
const FishProduct = require('../models/FishProduct');
const PetAccessory = require('../models/PetAccessory');
const PetHealth = require('../models/PetHealth');
const PetSupply = require('../models/PetSupply');

// Function to find the product in the appropriate collection
const findProductById = async (productId) => {
    let product = await CatProduct.findOne({ ProductID: productId })
        || await DogProduct.findOne({ ProductID: productId })
        || await FishProduct.findOne({ ProductID: productId })
        || await PetAccessory.findOne({ ProductID: productId })
        || await PetHealth.findOne({ ProductID: productId })
        || await PetSupply.findOne({ ProductID: productId });
    return product;
};

exports.addReview = async (req, res) => {
    try {
        const { productId, rating, comment } = req.body;
        const userId = req.user.id;

        const product = await findProductById(productId);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        const review = new Review({
            user: userId,
            product: product._id,
            productModel: product.constructor.modelName,
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

        if (!reviews.length) {
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

        if (!reviews.length) {
            return res.status(404).json({ msg: 'No reviews found for this user' });
        }

        res.status(200).json(reviews);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
