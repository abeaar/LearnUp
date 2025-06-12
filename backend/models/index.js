import User from './UserModel.js';
import Kelas from './KelasModel.js';
import Materi from './MateriModel.js';
import Tugas from './TugasModel.js';
import Submission from './SubmissionModel.js';
import UserKelas from './User_kelasModel.js';

// Definisikan relasi di sini
Kelas.belongsTo(User, {
  foreignKey: 'id_pembuat',
  as: 'pembuat',
});

// Tambahkan relasi lain jika ada

export { User, Kelas, Materi, Tugas, Submission, UserKelas }; 