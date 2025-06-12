import { Sequelize } from 'sequelize';

const dbContext = new Sequelize("t3_notes_109", "root", "", {
  host: "34.70.179.84",
  dialect: "mysql",
}); // Database name

export default dbContext;