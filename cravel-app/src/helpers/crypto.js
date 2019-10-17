import crypto from 'crypto'
import secretKey from '../configs/secretKey'

let encrypt = (password) => {
    return crypto.createHmac('sha256', secretKey).update(password).digest('hex')
}

export default encrypt