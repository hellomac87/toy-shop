const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Product } = require("../models/Product");

//=================================
//             Product
//=================================

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // 저장위치
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // 파일명
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage }).single("file");

router.post("/image", (req, res) => {
  // 가져온 이미지를 저장
  upload(req, res, (err) => {
    if (err) return res.json({ success: false, err });

    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

router.post("/", (req, res) => {
  // 받아온 정보들을 DB에 넣어준다
  const product = new Product(req.body);

  product.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post("/products", (req, res) => {
  let { skip, limit, filters, searchTerm } = req.body;

  limit = limit ? parseInt(limit) : 20;
  skip = skip ? parseInt(skip) : 0;
  let term = searchTerm;

  let findArgs = {};

  for (let key in filters) {
    if (filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          $gte: req.body.filters[key][0], // greater than equal 크거나 같고
          $lte: req.body.filters[key][1], // less than equal 작거나 같고
        };
      } else {
        findArgs[key] = filters[key];
      }
    }
  }

  console.log("findArgs", findArgs);

  if (term) {
    // product collection 에 들어있는 모든 상품정보 가져오기
    Product.find(findArgs)
      .find({ $text: { $search: term } })
      .populate("writer") // writer 의 정보를 가져오기 위해
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        return res
          .status(200)
          .json({ success: true, productInfo, postSize: productInfo.length });
      });
  } else {
    // product collection 에 들어있는 모든 상품정보 가져오기
    Product.find(findArgs)
      .populate("writer") // writer 의 정보를 가져오기 위해
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        return res
          .status(200)
          .json({ success: true, productInfo, postSize: productInfo.length });
      });
  }
});

// so tired...

router.get("/product_by_id", (req, res) => {
  let type = req.query.type;
  let productIds = req.query.id;

  if (type === "array") {
    let ids = req.query.id.split(",");
    productIds = ids.map((item) => item);
  }
  // product id를 이용해서 db에서 가져옴

  Product.find({ _id: { $in: productIds } })
    .populate("writer")
    .exec((err, product) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({ success: true, product });
    });
});

module.exports = router;
