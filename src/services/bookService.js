const db = require("../config/db");

const getAll = async () => {
  try {
    const results = await db.execute("select * from book");
    return results[0];
  } catch (error) {
    throw error;
  }
};

const search = async (query) => {
  try {
    const results = await db.execute(
      "select * from book where title like ? limit 10",
      [`%${query}%`]
    );
    return results[0];
  } catch (error) {
    throw error;
  }
};
// Create
const create = async () => {};
module.exports = {
  getAll,
  search,
};
