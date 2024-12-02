import jwt from "jsonwebtoken";
export const checkUser = (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(500).json({
      success: false,
      message: "Error!Token was not provided.",
    });
  }
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    res.status(200).json({
      success: false,
      message: "Error!Token was not provided.",
    });
  }

  const decodedToken = jwt.verify(token, process.env.SECRET);
  const id = decodedToken.id;
  const role = decodedToken.role;
  req.body.IdFromToken = id;
  req.body.roleFromToken = role;
  next();
};
