// models/UserKelas.js
import { DataTypes, Sequelize } from "sequelize";
import dbContext from "../config/Database.js";
import Users from "./UserModel.js"; // Import model User
import Kelas from "./KelasModel.js"; // Import model Kelas

const UserKelas = dbContext.define(
  "user_kelas", // Nama tabel di database
  {
    // Tidak perlu kolom 'id' terpisah karena PK-nya adalah gabungan
    id_user: {
      type: DataTypes.INTEGER, // Sesuaikan dengan tipe PK di UserModel.js
      allowNull: false,
      references: {
        model: Users, // Merujuk ke model Users
        key: "id", // Kolom 'id' di tabel Users
      },
      primaryKey: true, // Bagian dari primary key gabungan
    },
    id_kelas: {
      type: DataTypes.INTEGER, // Sesuaikan dengan tipe PK di KelasModel.js
      allowNull: false,
      references: {
        model: Kelas, // Merujuk ke model Kelas
        key: "id", // Kolom 'id' di tabel Kelas
      },
      primaryKey: true, // Bagian dari primary key gabungan
    },
  },
  {
    freezeTableName: true, // Mencegah Sequelize mengubah nama tabel (misal: jadi user_kelas_s)
    timestamps: false, // Nonaktifkan createdAt dan updatedAt

  }
);


// Ini adalah bagian KRUSIAL untuk relasi Many-to-Many
Users.belongsToMany(Kelas, {
  through: UserKelas, // Tentukan model perantara (junction table)
  foreignKey: "id_user", // Foreign key di UserKelas yang merujuk ke Users
  otherKey: "id_kelas", // Foreign key di UserKelas yang merujuk ke Kelas
  as: "kelasYangDiikuti", // Alias untuk akses dari User ke Kelas
});

Kelas.belongsToMany(Users, {
  through: UserKelas, // Tentukan model perantara
  foreignKey: "id_kelas", // Foreign key di UserKelas yang merujuk ke Kelas
  otherKey: "id_user", // Foreign key di UserKelas yang merujuk ke Users
  as: "siswa", // Alias untuk akses dari Kelas ke Users
});

// Sync database (hanya untuk pengembangan)
(async () => {
  try {
    await dbContext.sync({ alter: true });
    console.log("Tabel User_Kelas berhasil dibuat/diperbarui.");
  } catch (error) {
    console.error("Gagal menyinkronkan tabel User_Kelas:", error);
  }
})();

export default UserKelas;