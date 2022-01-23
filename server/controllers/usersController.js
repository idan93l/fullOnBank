const User = require("../schemas/User.js");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (e) {
    res.status(400).send({ Error: e.message });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send({ Error: e.message });
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(200).send(newUser);
  } catch (e) {
    res.status(400).send({ Error: e.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).res.send({ Error: e.message });
  }
};

const updateDeposit = async (req, res) => {
  const { id } = req.params;
  const { deposit } = req.body;
  try {
    const user = await User.findById(id);
    const currentCash = +user.cash;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { cash: deposit + currentCash },
      { new: true }
    );
    if (!updatedUser || user) {
      return res.status(400).send();
    }
    res.send(updatedUser);
  } catch (e) {
    res.status(500).send({ Error: e.message });
  }
};

const updateCredit = async (req, res) => {
  const { id } = req.params;
  const { credit } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) res.status(400).send();
    const currentCredit = +user.credit;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { credit: currentCredit + credit },
      { new: true }
    );
    res.send(updatedUser);
  } catch (e) {
    res.status(500).send({ Error: e.message });
  }
};

const withdrawFromUser = async (req, res) => {
  const { id } = req.params;
  const { withdrawal } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) res.status(400).send();
    const currentCash = +user.cash;
    const currentCredit = +user.credit;
    if (
      currentCash === 0 &&
      (currentCredit === 0 || currentCredit < withdrawal)
    ) {
      res.status(400).send();
    }
    if (currentCash < withdrawal) {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { cash: 0, credit: currentCredit - (withdrawal - currentCash) },
        { new: true }
      );
      res.send(updatedUser);
    } else {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { cash: currentCash - withdrawal },
        { new: true }
      );
      res.send(updatedUser);
    }
  } catch (e) {
    res.status(500).send({ Error: e.message });
  }
};

const transitionUsers = async (req, res) => {
  const { id } = req.params;
  const { to, credit } = req.body;
  try {
    const user = await User.findById(id);
    const forUser = await User.findById(to);
    if (!user || !forUser) res.status(400).send();
    const userCurrentCredit = +user.credit;
    const forUserCurrentCredit = +forUser.credit;
    if (userCurrentCredit < credit) {
      res.status(400).send();
    } else {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { credit: userCurrentCredit - credit },
        { new: true }
      );
      const updatedForUser = await User.findByIdAndUpdate(
        to,
        { credit: forUserCurrentCredit + credit },
        { new: true }
      );
      res.status(200).send(updatedForUser)
    }
  } catch (e) {
    res.status(500).send({ Error: e.message });
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateDeposit,
  updateCredit,
  withdrawFromUser,
  transitionUsers,
};
