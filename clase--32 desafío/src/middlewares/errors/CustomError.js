export default class CustomError {
    //creo un método static para no tener la necesidad de instanciar la clase CustomError.
    static createError({ name = 'Error', cause, message, code = 1 }) {
        //al error genérico le paso como param el message y cause, luego le agrego los atributos name y code.
        let error = new Error(message, { cause });
        error.name = name;
        error.code = code;
        // console.log(error)
        return error;
    }
}