const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    const con = await mongoose.connect(process.env.DB_LOCAL_URI);

    console.log(
      `MongoDB Database connected with HOST: ${con.connection.host}`
    );
  } catch (error) {
    console.error("Database Connection Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDatabase;