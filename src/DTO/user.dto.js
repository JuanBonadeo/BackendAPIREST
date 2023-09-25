export class CurrentUserDTO {
  constructor (user) {
    this.name = user.first_name
    this.email = user.email
    this.cart = user.cart
    this.role = user.role
  }
}
