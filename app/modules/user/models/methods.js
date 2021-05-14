import bcrypt from 'bcrypt'

export default {
  comparePasswords: function(password) {
    return bcrypt.compareSync(password, this.password)
  }
}
