import jwt from "jsonwebtoken";
export const checkStudentId = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      res.status(500).json({
        success: false,
        message: "Error!Token was not provided.",
      });
    }
    const token = req.headers.authorization.split(" ")[1];

    //Authorization: 'Bearer TOKEN'
    if (!token) {
      res.status(500).json({
        success: false,
        message: "Error!Token was not provided.",
      });
    }

    //Decoding the token
    const decodedToken = jwt.verify(token, process.env.SECRTKEY);
    const id = decodedToken.id;

    req.student_id = id;

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
