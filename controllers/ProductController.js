const Product = require('../models/Product');

module.exports = {
    async index(request, response) {
        const products = await Product.find().sort({ date: 'desc' });
        return response.json(products);
    },
    async delete(request, response) {
        const rates = await Product.findByIdAndRemove(request.params.id, function (err, output) {
            if (err) {
                return next(err);
            }
            
            response.send(output === 1 ? { msg: "success" } : { msg: "error" });
        });
    },
    async store(request, response) {
        const { name, image, price, width, heigth } = request.body;

        try {
            let rate = await Product.create({
                name,
                image,
                price,
                width, 
                heigth,
                date: Date.now(),
            }, function (err, result) {
                if (err) {
                    // it failed
                    response.statusCode = 500;
                    response.send(err);
                } else {
                    response.json(result)
                    response.send();
                }
            });
        } catch (e) {
            return e;
        }
    }
}