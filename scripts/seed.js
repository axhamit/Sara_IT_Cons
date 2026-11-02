/* Usage:
 *   npm run seed            -> creates/updates the admin user from .env.local
 *   npm run seed -- --demo  -> also adds sample clients and testimonials (delete them in the admin panel)
 */
require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

async function main() {
  const { MONGODB_URI, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
  if (!MONGODB_URI || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
    throw new Error("Set MONGODB_URI, ADMIN_EMAIL and ADMIN_PASSWORD in .env.local first.");
  }
  await mongoose.connect(MONGODB_URI);
  const db = mongoose.connection.db;
  const now = new Date();

  await db.collection("admins").updateOne(
    { email: ADMIN_EMAIL.toLowerCase().trim() },
    {
      $set: { passwordHash: await bcrypt.hash(ADMIN_PASSWORD, 12), updatedAt: now },
      $setOnInsert: { createdAt: now },
    },
    { upsert: true }
  );
  console.log("Admin ready:", ADMIN_EMAIL);

  if (process.argv.includes("--demo")) {
    const names = ["Orbit Retail", "Northwind Logistics", "Helix Health", "Vertex Finance", "Kite Mobility", "Lumen Energy"];
    for (const [i, name] of names.entries()) {
      await db.collection("clients").updateOne(
        { name },
        { $setOnInsert: { name, logo: "", website: "", order: i, visible: true, createdAt: now, updatedAt: now } },
        { upsert: true }
      );
    }
    await db.collection("testimonials").updateOne(
      { name: "Demo Person" },
      {
        $setOnInsert: {
          name: "Demo Person", role: "Head of Engineering", company: "Orbit Retail", visible: true, createdAt: now, updatedAt: now,
          quote: "Sample testimonial. Replace it in the admin panel with a real quote from a real client.",
        },
      },
      { upsert: true }
    );
    const jobs = [
      { title: "Senior Java Developer", client: "Confidential", location: "Bengaluru (hybrid)", type: "Full-time", experience: "5-8 years", skills: "Java, Spring Boot, Microservices, AWS", salary: "Competitive", description: "Build and maintain high-traffic backend services.\nWork with product and QA in an agile team.\nMentor junior engineers." },
      { title: "DevOps Engineer", client: "Northwind Logistics", location: "Pune", type: "Contract-to-hire", experience: "3-5 years", skills: "Kubernetes, Terraform, CI/CD, Azure", salary: "", description: "Own CI/CD pipelines and cloud infrastructure for a growing platform team." },
    ];
    for (const j of jobs) {
      await db.collection("jobs").updateOne({ title: j.title }, { $setOnInsert: { ...j, visible: true, createdAt: now, updatedAt: now } }, { upsert: true });
    }
    console.log("Demo clients, testimonial and jobs added.");
  }
  await mongoose.disconnect();
}

main().catch((e) => { console.error(e.message); process.exit(1); });
