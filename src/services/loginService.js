const db = require("../config/db");

const validateLogin = async (username, password) => {
  try {
    // Query the database for the user with the provided username
    const query = "SELECT * FROM staff WHERE username = ?";
    const [staff] = await db.query(query, [username]);
    // If the staff member doesn't exist, return null
    if (!staff || staff.length === 0) {
      return null;
    }
    const staffMember = staff[0];
    if (!(staffMember.password === password)) {
      return null;
    }
    return staffMember;
  } catch (error) {
    console.error("Error during login validation:", error);
    throw new Error("Database query error");
  }
};

module.exports = {
  validateLogin,
};