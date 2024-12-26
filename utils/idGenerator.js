const { db } = require("../DB/firebase"); // Use the initialized Firestore instance

/**
 * Generate a custom user ID in the format UID-001, UID-002, etc.
 */
const generateCustomUserId = async () => {
  try {
    // Fetch all user documents
    const usersSnapshot = await db.collection("users").get();

    if (usersSnapshot.empty) {
      // If there are no users, start with UID-001
      return "UID-001";
    }

    // Extract numeric parts from existing user IDs
    const userIds = usersSnapshot.docs
      .map((doc) => doc.id)
      .filter((id) => id.startsWith("UID-"))
      .map((id) => parseInt(id.split("-")[1], 10)) // Extract and parse the numeric part
      .filter((num) => !isNaN(num)); // Ensure valid numbers

    // Find the next numeric ID
    const nextId = Math.max(0, ...userIds) + 1;

    // Format the new ID with leading zeros
    return `UID-${String(nextId).padStart(3, "0")}`;
  } catch (error) {
    console.error("Error generating custom user ID:", error.message);
    throw new Error("Failed to generate custom user ID");
  }
};

module.exports = generateCustomUserId;
