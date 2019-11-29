import crypto from 'crypto'
import cryptoSecretKey from '../configs/cryptoSecretKey'

let encrypt = (password) => {
    return crypto.createHmac('sha256', cryptoSecretKey).update(password).digest('hex')
}

export default encrypt