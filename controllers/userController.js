// Import Firebase services
const { db } = require("../DB/firebase"); // Use the initialized Firestore instance from firebase.js
const { FieldValue } = require("firebase-admin/firestore"); // Import FieldValue for serverTimestamp
const generateCustomUserId = require("../utils/idGenerator");

// Add a new user to Firestore
exports.addUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: "Name and Email are required" });
    }

    // Generate a custom user ID
    const customUserId = await generateCustomUserId();

    // Prepare the user object
    const newUser = {
      name,
      email,
      createdAt: FieldValue.serverTimestamp(), // Add server timestamp
    };
 
    // Use the customUserId as the document ID in Firestore
    await db.collection("users").doc(customUserId).set(newUser);

    // Respond with the newly created custom user ID
    res
      .status(201)
      .json({ message: "User added successfully", userId: customUserId });
  } catch (error) {
    console.error("Error adding user:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Get all users from Firestore
exports.getAllUsers = async (req, res) => {
  try {
    // Fetch all documents from the "users" collection
    const usersSnapshot = await db.collection("users").get();

    // Check if the collection is empty
    if (usersSnapshot.empty) {
      return res.status(404).json({ message: "No users found" });
    }

    // Transform the Firestore documents into an array of user objects
    const users = [];
    usersSnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });

    // Respond with the list of users
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: error.message });
  }
};
