import { DataTypes } from "sequelize";
import dbContext from "../config/Database.js"; // Import the database connection
import User from "./UserModel.js";

const Kelas = dbContext.define('kelas', {
  // Define the columns
  nama: DataTypes.STRING,
  kode_kelas: DataTypes.STRING,
  id_pembuat: {
    type: DataTypes.INTEGER, 
    allowNull: false, 
    references: {
      model: User, 
      key: "id", 
    },
  },
},{
    freezeTableName: true
});

export default Kelas;