// models/SubmissionModel.js
import { DataTypes, Sequelize } from "sequelize";
import dbContext from "../config/Database.js";
import Tugas from "./TugasModel.js"; // Pastikan Anda mengimpor model Tugas
import User from "./UserModel.js";   // Pastikan Anda mengimpor model User

const Submission = dbContext.define(
  "submission", // Nama tabel di database
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    file_attachment: {
      type: DataTypes.STRING, // Tipe data untuk menyimpan nama file atau path tugas yang disubmit
      allowNull: false, // Tugas yang disubmit harus memiliki file attachment
    },
    nilai: {
      type: DataTypes.INTEGER, // Tipe data untuk nilai (misal: 0-100)
      allowNull: true, // Nilai bisa null jika tugas belum dinilai
    },
    id_tugas: {
      type: DataTypes.INTEGER, // Tipe data harus sama dengan PK Tugas
      allowNull: false, // Submission harus selalu terhubung ke sebuah tugas
      references: {
        model: Tugas, // Merujuk ke model Tugas
        key: "id", // Kolom 'id' di tabel Tugas
      },
      // Opsional: Tambahkan onDelete/onUpdate
      // onDelete: 'CASCADE', // Jika tugas dihapus, submissionnya juga dihapus
      // onUpdate: 'CASCADE',
    },
    id_user: {
      type: DataTypes.INTEGER, // Tipe data harus sama dengan PK User
      allowNull: false, // Submission harus selalu terhubung ke seorang user (siswa)
      references: {
        model: User, // Merujuk ke model User
        key: "id", // Kolom 'id' di tabel User
      },
      // Opsional: Tambahkan onDelete/onUpdate
      // onDelete: 'CASCADE', // Jika user dihapus, submissionnya juga dihapus
      // onUpdate: 'CASCADE',
    },
  },
  {
    freezeTableName: true, // Mencegah Sequelize mengubah nama tabel
    timestamps: true, // Aktifkan createdAt dan updatedAt (misal: untuk tahu kapan submit)
  }
);

// Mendefinisikan Asosiasi
// Sebuah Submission hanya dimiliki oleh satu Tugas
Submission.belongsTo(Tugas, {
  foreignKey: "id_tugas",
  as: "tugas", // Alias untuk akses mudah: submission.getTugas()
});

// Sebuah Submission hanya dimiliki oleh satu User (siswa)
Submission.belongsTo(User, {
  foreignKey: "id_user",
  as: "siswa", // Alias untuk akses mudah: submission.getSiswa()
});

// Opsional: Asosiasi inversi (biasanya di TugasModel.js dan UserModel.js, atau file asosiasi terpusat)
// Tugas.hasMany(Submission, {
//   foreignKey: 'id_tugas',
//   as: 'submissions',
// });

// User.hasMany(Submission, {
//   foreignKey: 'id_user',
//   as: 'tugasYangDisubmit',
// });

// Sinkronisasi database (hanya untuk pengembangan)
(async () => {
  try {
    await dbContext.sync({ alter: true });
    console.log("Tabel Submission berhasil dibuat/diperbarui.");
  } catch (error) {
    console.error("Gagal menyinkronkan tabel Submission:", error);
  }
})();

export default Submission;