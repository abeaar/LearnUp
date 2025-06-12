// models/TugasModel.js
import { DataTypes, Sequelize } from "sequelize";
import dbContext from "../config/Database.js";
import Kelas from "./KelasModel.js"; // Pastikan Anda mengimpor model Kelas

const Tugas = dbContext.define(
  "tugas", // Nama tabel di database
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    judul: {
      type: DataTypes.STRING,
      allowNull: false, // Judul tugas tidak boleh kosong
    },
    deadline: {
      type: DataTypes.DATE, // Tipe DATE untuk menyimpan tanggal dan waktu deadline
      allowNull: false, // Deadline harus ada
    },
    id_kelas: {
      type: DataTypes.INTEGER, // Tipe data harus sama dengan PK Kelas
      allowNull: false, // Tugas harus selalu terhubung ke sebuah kelas
      references: {
        model: Kelas, // Merujuk ke model Kelas
        key: "id", // Kolom 'id' di tabel Kelas
      },
    },
  },
  {
    freezeTableName: true, // Mencegah Sequelize mengubah nama tabel
    timestamps: true, // Aktifkan createdAt dan updatedAt
  }
);

// Mendefinisikan Asosiasi
// Sebuah Tugas hanya dimiliki oleh satu Kelas
Tugas.belongsTo(Kelas, {
  foreignKey: "id_kelas",
  as: "kelas", // Alias untuk akses mudah: tugas.getKelas()
});

// Sinkronisasi database (hanya untuk pengembangan)
(async () => {
  try {
    await dbContext.sync({ alter: true });
    console.log("Tabel Tugas berhasil dibuat/diperbarui.");
  } catch (error) {
    console.error("Gagal menyinkronkan tabel Tugas:", error);
  }
})();

export default Tugas;