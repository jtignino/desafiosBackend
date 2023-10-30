export class UserNotFound extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class IncorrectLoginCredentials extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class UserAlreadyExists extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class ProductAlreadyExists extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class ProductNotFound extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class ProductUpdateError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class CartNotFound extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class DeleteProductError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class ResetPasswordError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}