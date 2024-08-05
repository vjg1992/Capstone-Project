const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WishlistSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        productId: {
            type: Schema.Types.ObjectId,
            refPath: 'products.productModel'
        },
        productModel: {
            type: String,
            required: true,
            enum: ['CatProduct', 'DogProduct', 'FishProduct', 'PetAccessory', 'PetHealth', 'PetSupply']
        }
    }]
});

module.exports = mongoose.model('Wishlist', WishlistSchema);
