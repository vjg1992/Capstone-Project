const Order = require('../models/Order');
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

exports.createOrder = async (req, res) => {
    try {
        const { items, totalPrice } = req.body;
        const userId = req.user.id;

        const orderItems = await Promise.all(items.map(async item => {
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

        const order = new Order({
            user: userId,
            items: orderItems,
            totalPrice
        });

        await order.save();

        res.status(201).json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getOrderHistory = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await Order.find({ user: userId }).populate('items.productId');

        if (!orders) {
            return res.status(404).json({ msg: 'No orders found' });
        }

        res.status(200).json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId).populate('items.productId');

        if (!order) {
            return res.status(404).json({ msg: 'Order not found' });
        }

        res.status(200).json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ msg: 'Order not found' });
        }

        order.status = status;
        await order.save();

        res.status(200).json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
