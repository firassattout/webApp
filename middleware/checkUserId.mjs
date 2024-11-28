import jwt from "jsonwebtoken";
export const checkUserId = (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(500).json({
      success: false,
      message: "Error!Token was not provided.",
    });
  }
  const token = req.headers.authorization.split(" ")[1];

  //Authorization: 'Bearer TOKEN'
  if (!token) {
    res.status(200).json({
      success: false,
      message: "Error!Token was not provided.",
    });
  }
  //Decoding the token
  const decodedToken = jwt.verify(token, process.env.SECRTKEY);
  const id = decodedToken.id;
  const role_id = decodedToken.role_id;

  req.role_id = role_id;
  req.user_id = id;
  // if (role_id !== process.env.ROL_3) {
  //   res.status(200).json({
  //     success: false,
  //     message: "Error!Token was not provided.",
  //   });
  // }
  next();
};
