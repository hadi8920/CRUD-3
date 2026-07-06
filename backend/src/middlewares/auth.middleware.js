import jwt from "jsonwebtoken";

export async function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    throw new Error("Unauthorized")
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      throw new Error("Invalid or Expire Token")
    }
 // attach the decoded payload to req
    next();
  });
}

export default authMiddleware;
