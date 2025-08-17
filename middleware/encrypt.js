//SIGN JWT
 const signJWT = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY , {
    expiresIn: "24h",
  });
};

//VERIFY JWT
 const verifyJWT = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY );
};

//DECODE JWT
 const decodeJWT = (token) => {
  return jwt.decode(token);
};

module.exports={signJWT,verifyJWT,decodeJWT}