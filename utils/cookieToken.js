const cookieToken = (user) => {
  const token = user.getJwtToken();
  const options = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 1000),
    httpOnly: true,
    secure:true,
    samesite:"none"
  };
  return { token, options };
};

module.exports = cookieToken;
