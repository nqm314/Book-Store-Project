const { authService } = require('../services');

const login = async (req, res) => {
    try {
        const check = await authService.validUser(req.body.username, req.body.password, req.body.role)
        if(!check) {
            return res.status(401).json({
                message: 'Unathorized!'
            })
        }
        const token = await authService.accessToken(req.body.username, req.body.role)
        res.set('Set-Cookie', `authorization=${token}`)
        return res.status(200).json({
            message: 'Login successfully!',
            data: {
                username: req.body.username,
                role: req.body.role,
            }
        })
    } catch (error) {
        console.error(error);
        return res.status(500)
    }
}

const logout = async (req, res) => {
    try {
        const token = req.headers.cookie?.split('=')[1];
        if(token) {
            authService.delToken(token);
            res.set('Set-Cookie', `authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC`)
        }
        return res.status(200).json({message: "OK!"})
    } catch (error) {
        console.error(error);
        return res.status(500)
    }
}

module.exports = {
    login,
    logout,
}