const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./models/Employee");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection (hardcoded URI)
mongoose.connect("mongodb://127.0.0.1:27017/empoyee_details")
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

// Test root route to avoid "Cannot GET /"
app.get("/", (req, res) => {
    res.send("👋 Welcome to the Employee API");
});

// POST /register route
app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check for existing user
        const existing = await EmployeeModel.findOne({ email });
        if (existing) {
            return res.status(400).json({ error: "Email already registered" });
        }

        const employee = await EmployeeModel.create({ name, email, password });
        res.status(201).json(employee);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Start the server on port 3001
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
