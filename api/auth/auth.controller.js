import { authService } from "./auth.service.js";

export async function login(req, res) {
    const { username, password } = req.body
    try {
        const user = await authService.login(username, password)
        const loginToken = authService.getLoginToken(user)
        res.cookie('loginToken', loginToken)
        res.json(user)
    } catch (err) {
        console.log('Failed to login')
        res.status(500).send({ err: 'Failed to login' })
    }
}

export async function signup(req, res) {
    try {
        const { username, password, fullname } = req.body

        const account = await authService.signup(username, password, fullname)
        const user = await authService.login(username, password)
        const loginToken = authService.getLoginToken(user)

        res.cookie('loginToken', loginToken)
        res.json(user)
    } catch (err) {
        console.log('Failed to signup')
        res.status(500).send({ err: 'Failed to signup' })
    }
}

export async function logout(req, res) {
    try {
        res.clearCookie('loginToken')
        res.send({ msg: 'Logged out successfully' })
    } catch (err) {
        console.log('Failed to logout')
        res.status(500).send({err: 'Failed to logout'})
    }
}