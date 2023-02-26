const express = require("express");
const { productModel } = require("../model/productModel")
const productRouter = express.Router();
productRouter.get("/", async (req, res) => {
  const query = {};
  const filter = {};
  const { search,category,min,max,sort} = req.query
  if(search)query.name = {$regex:search,$options:"i"}
  if(category)query.category = category
  if(sort)filter.price = +sort;
  query.price={$gte:min?+min:0,$lte:max?+max:Infinity}

  try {
   const productData =  await productModel.find(query).sort(filter)
   res.send(productData)
  } catch (error) {
    res.send({ "error": error.message })
  }
})
productRouter.post("/add", async (req, res) => {
  try {
    const new_product = new productModel(req.body)
    new_product.save()
    res.send({ "mssg": "Successfully Product added" })
  } catch (error) {
    console.log({ "mssg": "Something Error" })
  }
})
productRouter.patch("/update/:id", async (req, res) => {
  let id = req.params.id
  try {
    await productModel.findByIdAndUpdate({ "_id": id }, req.body)
    res.send("Updated the Products")
  } catch (error) {
    res.send({ "mssg": "Something went wrong", "error": error.message })
  }
})
productRouter.delete("/delete/:id", async (req, res) => {
  let id = req.params.id
  try {
    await productModel.findByIdAndDelete({ "_id": id })
    res.send("Deleted the Product")
  } catch (error) {
    res.send({ "mssg": "Something went wrong", "error": error.message })
  }
})
module.exports = { productRouter }
// {"name":"Desert Boot",
//    "image":"https://clarks.scene7.com/is/image/Pangaea2Build/26155527_W_1?fmt=webp&wid=200",
//    "category":"boot",
//    "description":"Cultural cachet and design DNA: no shoe is quite like the Clarks Originals Desert Boot. Nathan Clark’s 1950 design was inspired by a rough boot from Cairo’s Old Bazaar, and its minimal, progressive style sparked a worldwide footwear revolution – worn by beatniks, mods, Britpop bands, and Jamaican rude boys, from Paris to Kingston, Tokyo to London. Every design detail today remains true to that first pioneering pair – here, the boot’s crafted, clean lines are enhanced with premium sand suede, finished with an unfussy lace fastening. The authentic, sustainably sourced crepe sole completes this distinctive silhouette. Instantly recognizable, forever iconic. A true original.",
//    "price":150,
//    "delivery_In":7

// }