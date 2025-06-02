import jwt from 'jsonwebtoken'
export const generateToken = ( res,userId)=>{
    try {
        const token = jwt.sign({ id:userId},process.env.JWT_SECRETKEY, {
        expiresIn: '30d',
        });
         res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // true in production (HTTPS)
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });


      
    } catch (error) {
    console.error("Error generating token:", error.message);
    throw new Error("Token generation failed");
        
    }
}