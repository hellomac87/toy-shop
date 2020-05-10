const express = require("express");
const router = express.Router();
const multer = require("multer");

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

module.exports = router;
