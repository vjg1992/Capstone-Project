const Purchase = require('../models/Purchase');
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

exports.createPurchase = async (req, res) => {
    try {
        const { items, totalPrice, paymentMethod } = req.body;
        const userId = req.user.id;

        const purchaseItems = await Promise.all(items.map(async item => {
            const product = await findProductById(item.productId);
            if (!product) {
                throw new Error('Product not found');
            }
            return {
                productId: item.productId,
                quantity: item.quantity,
                productModel: item.productModel
            };
        }));

        const purchase = new Purchase({
            user: userId,
            items: purchaseItems,
            totalPrice,
            paymentMethod
        });

        await purchase.save();

        res.status(201).json(purchase);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getPurchaseHistory = async (req, res) => {
    try {
        const userId = req.user.id;
        const purchases = await Purchase.find({ user: userId }).populate('items.productId');

        if (!purchases) {
            return res.status(404).json({ msg: 'No purchases found' });
        }

        res.status(200).json(purchases);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getPurchaseById = async (req, res) => {
    try {
        const purchaseId = req.params.id;
        const purchase = await Purchase.findById(purchaseId).populate('items.productId');

        if (!purchase) {
            return res.status(404).json({ msg: 'Purchase not found' });
        }

        res.status(200).json(purchase);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.updatePaymentStatus = async (req, res) => {
    try {
        const { purchaseId, paymentStatus } = req.body;

        const purchase = await Purchase.findById(purchaseId);

        if (!purchase) {
            return res.status(404).json({ msg: 'Purchase not found' });
        }

        purchase.paymentStatus = paymentStatus;
        await purchase.save();

        res.status(200).json(purchase);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
