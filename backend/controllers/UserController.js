import User from "../models/UserModel.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (err) {
        console.log({error: err.message});
    }
}

export const getUsersById = async (req, res) => {
    try {
        const users = await User.findOne({
          where:{
            id: req.params.id
          }
        });
        res.status(200).json(users);
    } catch (err) {
        console.log({error: err.message});
    }
  }
  
export const getUserByName = async (req, res) => {
    try {
        const users = await User.findOne({
          where: {
            name: req.params.name,
          },
        });
        res.status(200).json(users);
    } catch (err) {
        console.log({ error: err.message });
    }
  };
export const createUsers = async (req, res) => {
  try {
    await User.create(req.body);
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log({ error: err.message });
  }
};


export const updateUser = async (req, res) => {
  try {
    const { id } = req.params; 
    const user = await User.findByPk(id); 

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.update(req.body); 
    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    console.log({ error: err.message });
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params; 
    const user = await User.findByPk(id); 

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.destroy(); 
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.log({ error: err.message });
    res.status(500).json({ error: "Internal Server Error" });
  }
};
