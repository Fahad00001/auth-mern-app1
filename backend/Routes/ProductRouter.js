const ensureAuthenticated = require("../Middlewares/Auth");

const router = require("express").Router();

router.get("/", ensureAuthenticated, (req, res) => {
  res.status(200).json([
    {
      name: "mobile",
      price: 1000,
    },
    {
      name: "tv",
      price: 15400,
    },
  ]);
});

module.exports = router;
