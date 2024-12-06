const { loginService } = require("../services");
const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required." });
  }
  try {
    const staff = await loginService.validateLogin(username, password);
    if (!staff) {
      return res.status(401).json({ error: "Invalid username or password." });
    }
    res.status(200).json({
      message: "Login successful",
      staff: {
        StaffID: staff.StaffID,
        lname: staff.lname,
        fname: staff.fname,
        ManagerFlag: staff.ManagerFlag,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  login,
};