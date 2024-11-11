const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const port = 3000;
const app = express();
app.use(bodyParser.json());

// MySQL connection configuration
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Hassan_45!",
  database: "alumni-portal-backend-dev",
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// Endpoint to save accepted users
app.post("/saveAcceptedUsers", async (req, res) => {
  const { acceptedUsers } = req.body;

  // Validate that acceptedUsers is an array
  if (!Array.isArray(acceptedUsers)) {
    return res.status(400).json({ message: "Invalid data format. Expected an array of users." });
  }

  try {
    for (const user of acceptedUsers) {
      const { name, email, organisation, employed } = user;

      // Validate the user object before inserting
      if (!name || !email || !organisation || typeof employed !== "boolean") {
        return res.status(400).json({ message: "Invalid user data" });
      }

      const query = "INSERT INTO users (name, email, organisation, employed) VALUES (?, ?, ?, ?)";
      await promisifyQuery(query, [name, email, organisation, employed]);
    }

    res.json({ message: "Accepted users saved successfully" });
  } catch (error) {
    console.error("Error saving accepted users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Start the server
const PORT = process.env.PORT || port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Utility function to promisify MySQL queries
function promisifyQuery(query, values) {
  return new Promise((resolve, reject) => {
    connection.query(query, values, (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}
