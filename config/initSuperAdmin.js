import bcrypt from "bcryptjs";
import User from "../models/User.js";

const initSuperAdmin = async () => {
  try {
    const existing = await User.findOne({ role: "superadmin" });
    if (existing) return;

    const hashedPassword = await bcrypt.hash(process.env.SUPERADMIN_PASSWORD, 10);

    await User.create({
      name: process.env.SUPERADMIN_NAME,
      email: process.env.SUPERADMIN_EMAIL,
      password: hashedPassword,
      role: "superadmin",
    });

    console.log("🚀 SuperAdmin created successfully");
  } catch (err) {
    console.error("SuperAdmin init error:", err.message);
  }
};

export default initSuperAdmin;
