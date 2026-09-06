const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://root:1234@cluster0.gztopa6.mongodb.net/ecommerce"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("DB Connection Error:", err));

const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  new_price: {
    type: Number,
    required: true
  },
  old_price: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  available: {
    type: Boolean,
    default: true
  }
});

const Users = mongoose.model("Users", {
  name: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  cartData: {
    type: Object
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(
        file.originalname
      )}`
    );
  }
});

const upload = multer({
  storage: storage
});

app.use(
  "/images",
  express.static("upload/images")
);

app.post(
  "/upload",
  upload.single("product"),
  (req, res) => {
    res.json({
      success: 1,
      image_url:
        `http://localhost:${port}/images/${req.file.filename}`
    });
  }
);

const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send({
      errors:
        "Please authenticate using a valid token"
    });
  }
  try {
    const data = jwt.verify(
      token,
      "secret_ecom"
    );
    req.user = data.user;
    next();
  } catch (error) {
    return res.status(401).send({
      errors: "Token is not valid"
    });
  }
};

app.post("/signup", async (req, res) => {
  try {
    let check = await Users.findOne({
      email: req.body.email
    });
    if (check) {
      return res.status(400).json({
        success: false,
        errors: "Existing user found"
      });
    }

    let cart = {};
    for (let i = 0; i < 300; i++) {
      cart[i] = 0;
    }

    const user = new Users({
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
      cartData: cart
    });

    await user.save();

    const data = {
      user: {
        id: user.id
      }
    };

    const token = jwt.sign(
      data,
      "secret_ecom"
    );

    res.json({
      success: true,
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      errors: "Signup failed"
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const ADMIN_EMAIL = "admin@gmail.com";
    const ADMIN_PASSWORD = "admin123password";

    if (req.body.email === ADMIN_EMAIL && req.body.password === ADMIN_PASSWORD) {
      const adminData = {
        admin: {
          email: ADMIN_EMAIL
        }
      };
      const adminToken = jwt.sign(adminData, "secret_admin_ecom");
      return res.json({
        success: true,
        isAdmin: true,
        token: adminToken
      });
    }

    let user = await Users.findOne({
      email: req.body.email
    });

    if (!user) {
      return res.json({
        success: false,
        errors: "Wrong Email Id"
      });
    }

    const passCompare =
      req.body.password === user.password;

    if (!passCompare) {
      return res.json({
        success: false,
        errors: "Wrong Password"
      });
    }

    const data = {
      user: {
        id: user.id
      }
    };

    const token = jwt.sign(
      data,
      "secret_ecom"
    );

    res.json({
      success: true,
      isAdmin: false,
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      errors: "Login failed"
    });
  }
});

app.post(
  "/addtocart",
  fetchUser,
  async (req, res) => {
    try {
      let userData = await Users.findOne({
        _id: req.user.id
      });

      if (!userData) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }

      const itemId = req.body.itemId;

      if (!userData.cartData) {
        userData.cartData = {};
      }

      if (!userData.cartData[itemId]) {
        userData.cartData[itemId] = 0;
      }

      userData.cartData[itemId] += 1;

      await Users.findOneAndUpdate(
        {
          _id: req.user.id
        },
        {
          $set: {
            cartData: userData.cartData
          }
        }
      );

      res.json({
        success: true,
        message: "Added"
      });
    } catch (error) {
      console.error(
        "Add cart error:",
        error
      );
      res.status(500).json({
        success: false,
        message: "Error adding product"
      });
    }
  }
);

app.post(
  "/removefromcart",
  fetchUser,
  async (req, res) => {
    try {
      let userData = await Users.findOne({
        _id: req.user.id
      });

      if (!userData) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }

      const itemId = req.body.itemId;

      if (userData.cartData) {
        delete userData.cartData[itemId];
      }

      await Users.findOneAndUpdate(
        {
          _id: req.user.id
        },
        {
          $set: {
            cartData: userData.cartData
          }
        }
      );

      res.json({
        success: true,
        message: "Product completely removed"
      });
    } catch (error) {
      console.error(
        "Remove cart error:",
        error
      );
      res.status(500).json({
        success: false,
        message: "Error removing product"
      });
    }
  }
);

app.post(
  "/getcart",
  fetchUser,
  async (req, res) => {
    try {
      let userData = await Users.findOne({
        _id: req.user.id
      });

      if (!userData) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }

      res.json(
        userData.cartData || {}
      );
    } catch (error) {
      console.error(
        "Get cart error:",
        error
      );
      res.status(500).json({
        success: false,
        message: "Error getting cart"
      });
    }
  }
);

app.get(
  "/allproduct",
  async (req, res) => {
    try {
      let products = await Product.find({});
      res.send(products);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        error: "Error fetching products"
      });
    }
  }
);

app.post(
  "/addproduct",
  async (req, res) => {
    try {
      let products = await Product.find({});

      let id =
        products.length > 0
          ? products[products.length - 1].id + 1
          : 1;

      const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price
      });

      await product.save();

      res.json({
        success: true,
        name: req.body.name
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false
      });
    }
  }
);

app.post(
  "/removeproduct",
  async (req, res) => {
    try {
      await Product.findOneAndDelete({
        id: req.body.id
      });

      console.log(
        "Product Removed"
      );

      res.json({
        success: true,
        name: req.body.name
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false
      });
    }
  }
);

app.get(
  "/newcollections",
  async (req, res) => {
    try {
      let products =
        await Product.find({});

      let newcollection =
        products
          .slice(-8)
          .reverse();

      console.log(
        "NewCollection Fetched"
      );

      res.send(newcollection);
    } catch (error) {
      console.error(error);
      res.status(500).send([]);
    }
  }
);

app.get(
  "/popularinwomen",
  async (req, res) => {
    try {
      let products =
        await Product.find({
          category: "women"
        });

      let popular_in_women =
        products.slice(0, 4);

      console.log(
        "Popular in women fetched"
      );

      res.send(popular_in_women);
    } catch (error) {
      console.error(error);
      res.status(500).send([]);
    }
  }
);

app.listen(
  port,
  (error) => {
    if (!error) {
      console.log(
        "Server Running on Port " + port
      );
    } else {
      console.log(
        "Error : " + error
      );
    }
  }
);