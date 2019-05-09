module.exports = class User {
  constructor(username, password) {
  this.username = username;
  this.password = password;
  }

  get getUsername() {
    return this.username;
  }
  get getPassword() {
    return this.password;
  }
}
