
const {verifyJWT,decodeJWT}=require("./encrypt")
const auth = (req, res, next) => {
  const token = req.cookies.access_token || req.headers["access_token"];
  
  if (!token) return res.status(401).json({ error: "Unauthorized" });
console.log("token>>>>",token)
  try {
   
  const decoded = decodeJWT(token) ;
    const verified = verifyJWT(token);
    if (decoded && verified) {
      req.user = decoded?.user;
      next();
    } else {
      res.clearCookie("access_token");
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = {auth};
