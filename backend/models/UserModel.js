import { DataTypes } from "sequelize";
import dbContext from "../config/Database.js"; // Import the database connection

const User = dbContext.define('user', {
  // Define the columns
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: DataTypes.STRING,
  password: DataTypes.STRING,
  email: DataTypes.STRING,
},{
    freezeTableName: true
});

export default User;