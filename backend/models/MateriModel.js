// models/MateriModel.js
import { DataTypes, Sequelize } from "sequelize";
import dbContext from "../config/Database.js";
import Kelas from "./KelasModel.js"; // Pastikan Anda mengimpor model Kelas

const Materi = dbContext.define(
  "materi", // Nama tabel di database
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false, // ID tidak boleh null
    },
    judul: {
      type: DataTypes.STRING,
      allowNull: false, // Judul materi tidak boleh kosong
    },
    file_attachment: {
      type: DataTypes.STRING, // Tipe data untuk menyimpan nama file atau path
      allowNull: true, // File attachment bisa opsional
    },
    id_kelas: {
      type: DataTypes.INTEGER, // Tipe data harus sama dengan PK Kelas (biasanya INTEGER)
      allowNull: false, // Materi harus selalu terhubung ke sebuah kelas
      references: {
        model: Kelas, // Merujuk ke model Kelas
        key: "id", // Kolom 'id' di tabel Kelas
      },

    },
  },
  {
    freezeTableName: true, // Mencegah Sequelize mengubah nama tabel
    timestamps: true, // Opsional: Aktifkan createdAt dan updatedAt jika dibutuhkan
  }
);


Materi.belongsTo(Kelas, {
  foreignKey: "id_kelas",
  as: "kelas", // Alias untuk akses mudah, contoh: materi.getKelas()
});


(async () => {
  try {
    await dbContext.sync({ alter: true });
    console.log("Tabel Materi berhasil dibuat/diperbarui.");
  } catch (error) {
    console.error("Gagal menyinkronkan tabel Materi:", error);
  }
})();

export default Materi;