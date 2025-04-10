import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    
    const token = req.headers.token || req.query.token ;

    if (!token) {
        return res.json({ success: false, message: 'Not Authorized. Login Again' });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if (tokenDecode.id) {
            req.body.userId = tokenDecode.id;
            next();
        } else {
            return res.json({ success: false, message: 'Not Authorized. Login Again' });
        }
    } catch (error) {
        console.error('JWT Verification Error:', error.message);
        res.json({ success: false, message: 'Invalid Token. Login Again' });
    }
};

export default userAuth;
