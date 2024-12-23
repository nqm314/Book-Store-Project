const db = require("../config/db");

const getAll = async () => {
  try {
    const result = await db.execute("select * from publisher");
    return result[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAll,
};
