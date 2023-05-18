/////////////////////////////////////
// Install SETUP
const express = require("express");
const mongoose = require("mongoose");
const Customers = require("./module/customer_module");
const app = express();
PORT = 3000;

/////////////////////////////////////
// API SETUP
mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://oditrp:IBM@ibm.ussedj4.mongodb.net/customers_database?retryWrites=true&w=majority"
  )
  .then(() => {
    //then itu promise (janji)
    console.log("Connected to mongoDB 🦆🦆🦆");
    app.listen(PORT, () => {
      console.log(`Running at PORT : ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

/////////////////////////////////////
// Middleware
app.use(express.json());
// BONUS kalau mau update pake form (usualy JSON)
app.use(express.urlencoded({ extended: false }));

/////////////////////////////////////
// ROUTES 30:32

// Post
app.post("/customers", async (req, res) => {
  try {
    const customers = await Customers.create(req.body);
    res.status(200).json(customers);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Get ALL
app.get("/customers", async (req, res) => {
  try {
    const customers = await Customers.find({});
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get ID
app.get("/customers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const customers = await Customers.findById(id);
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE
app.put("/customers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const customers = await Customers.findByIdAndUpdate(id, req.body);
    // jika data Customers tidak di update
    if (!customers) {
      return res
        .status(404)
        .json({ message: `cannot find product with ID: ${id}` });
    }

    const updated_customers = await Customers.findById(id);
    res.status(200).json(updated_customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.patch("/customers/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const customers = await Customers.findByIdAndUpdate(id, req.body);

      // jika data Customers tidak di update
      if (!customers) {
        return res
          .status(404)
          .json({ message: `cannot find product with ID: ${id}` });
      }
  
      const updated_customers = await Customers.findById(id);
      res.status(200).json(updated_customers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// DELETE
app.delete("/customers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const customers = await Customers.findByIdAndDelete(id, req.body);

    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
