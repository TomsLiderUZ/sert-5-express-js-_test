const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors({ origin: "https://sert-5-express-js-test.vercel.app" }));
app.use(express.json());

const databaseFilePath = path.join(__dirname, "data-base.json");

// Helper function to read data from the JSON file
const readDatabase = () => {
    if (fs.existsSync(databaseFilePath)) {
        const data = fs.readFileSync(databaseFilePath, "utf8");
        return JSON.parse(data);
    }
    return [];
};

// Helper function to write data to the JSON file
const writeDatabase = (data) => {
    fs.writeFileSync(databaseFilePath, JSON.stringify(data, null, 2), "utf8");
};

// Endpoint to submit data
app.post("/submit", (req, res) => {
    const { message } = req.body;
    console.log("Received data:", { message });

    // Read the current database, add the new data, and write it back to the file
    const database = readDatabase();
    database.push({ message });
    writeDatabase(database);

    res.json({ success: true, message: "Data successfully received!" });
});

// Endpoint to retrieve all data from the JSON file
app.get("/data-base", (req, res) => {
    const database = readDatabase();
    res.json(database); // Return the stored data
});

// Start the server
app.listen(5000, () => console.log("Server running at http://localhost:5000/data-base"));
