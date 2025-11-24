require("dotenv").config();
const mongoose = require("mongoose");
const Banker = require("./models/Banker");

const createDefaultBanker = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected");

    const banker = new Banker({
      employeeId: "BANK1001",
      name: "Admin Banker",
      password: "admin123"
    });

    await banker.save();
    console.log("Banker Created:");
    console.log("Employee ID: BANK1001");
    console.log("Password: admin123");

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

createDefaultBanker();
