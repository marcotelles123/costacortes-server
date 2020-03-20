const Product = require("../models/Product");
const fs = require("fs");
var randomstring = require("randomstring");

module.exports = {
  async index(request, response) {
    const products = await Product.find().sort({ date: "desc" });
    products.forEach(prod => {
      if (fs.existsSync("images\\" + prod.image)) {
        let fileData = fs.readFileSync("images\\" + prod.image);
        let bytes = new Buffer(fileData).toString('base64')
        prod.image = "data:image/png;base64," + bytes;
      }
    });
    return response.json(products);
  },
  async delete(request, response) {
    const rates = await Product.findByIdAndRemove(request.params.id, function(
      err,
      output
    ) {
      if (err) {
        return next(err);
      }

      response.send(output === 1 ? { msg: "success" } : { msg: "error" });
    });
  },
  async store(request, response) {
    const { name, image, price, width, heigth } = request.body;

    try {
      // var guid = Guid.create();
      let fileName = randomstring.generate(10);
      let rate = await Product.create(
        {
          name,
          image: fileName,
          price,
          width,
          heigth,
          date: Date.now()
        },
        function(err, result) {
          if (err) {
            // it failed
            response.statusCode = 500;
            response.send(err);
          } else {
            response.json(result);
            response.send();
          }
        }
      );

      var data = image.replace(/^data:image\/\w+;base64,/, "");
      var buf = new Buffer(data, "base64");
      let path = "images\\";
      path += fileName;
      fs.writeFile(path, buf, function(err, result) {
        if (err) console.log("error", err);
      });
    } catch (e) {
      return e;
    }
  }
};
