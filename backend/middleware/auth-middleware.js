// import jwt from "jsonwebtoken";
// import User from "../models/user.js";

// const authMiddleware = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1]; //Bearer dhghjhdkjfg

//     if (!token) {
//       return res.status(401).json({
//         message: "Unauthorized",
//       });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.userId);

//     if (!user) {
//       return res.status(401).json({
//         message: "Unauthorized",
//       });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       message: "Internal server error",
//     });
//   }
// };

// export default authMiddleware;


import jwt from "jsonwebtoken";
import User from "../models/user.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({
        message: "Unauthorized - No token",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // IMPORTANT: token uses userId, not id
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized - User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

export default authMiddleware;