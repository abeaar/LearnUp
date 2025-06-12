import UserKelas from "../models/User_kelasModel.js";

export const getAllUserKelas = async (req, res) => {
  try {
    const userKelas = await UserKelas.findAll();
    res.status(200).json(userKelas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserKelasById = async (req, res) => {
  try {
    const userKelas = await UserKelas.findOne({
      where: {
        id_user: req.params.id_user,
        id_kelas: req.params.id_kelas
      }
    });
    if (!userKelas) return res.status(404).json({ message: "UserKelas not found" });
    res.status(200).json(userKelas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createUserKelas = async (req, res) => {
  try {
    await UserKelas.create(req.body);
    res.status(201).json({ message: "UserKelas created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUserKelas = async (req, res) => {
  try {
    const userKelas = await UserKelas.findOne({
      where: {
        id_user: req.params.id_user,
        id_kelas: req.params.id_kelas
      }
    });
    if (!userKelas) return res.status(404).json({ message: "UserKelas not found" });
    await userKelas.update(req.body);
    res.status(200).json({ message: "UserKelas updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteUserKelas = async (req, res) => {
  try {
    const userKelas = await UserKelas.findOne({
      where: {
        id_user: req.params.id_user,
        id_kelas: req.params.id_kelas
      }
    });
    if (!userKelas) return res.status(404).json({ message: "UserKelas not found" });
    await userKelas.destroy();
    res.status(200).json({ message: "UserKelas deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 