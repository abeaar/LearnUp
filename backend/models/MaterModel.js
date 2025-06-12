import { DataTypes } from "sequelize";
import dbContext from "../config/Database.js"; // Import the database connection

const User = dbContext.define('user', {
  // Define the columns
  name: DataTypes.STRING,
  password: DataTypes.STRING,
  email: DataTypes.STRING,
  title: DataTypes.STRING,
  category: DataTypes.STRING
},{
    freezeTableName: true
});

export default User;

(async()=>{
    await dbContext.sync();
    console.log("User table created");
})();