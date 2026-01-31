import app from "../app.js"; // where your express app is created

export default function handler(req, res) {
  return app(req, res);
}
