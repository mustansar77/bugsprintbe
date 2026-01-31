import User from "../models/User.js";

const initSuperAdmin = async () => {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  const exists = await User.findOne({ email: adminEmail });
  if (exists) return;

  await User.create({
    fullName: "Super Admin",
    email: adminEmail,
    password: adminPassword,
    phone: "0000000000",
    role: "admin",
    referralCode: "ADMIN",
  });

  console.log("✅ Admin account created");
};

export default initSuperAdmin;
