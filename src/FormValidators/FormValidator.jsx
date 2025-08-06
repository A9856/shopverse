import PasswordValidator from "password-validator"
var schema = new PasswordValidator();

// Add properties to it
schema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase(1)                             // Must have at least 1 uppercase letter
    .has().lowercase(1)                             // Must have at least 1  lowercase letter
    .has().digits(1)                                // Must have at least 1 digit
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

export default function FormValidator(e) {
    let { name, value } = e.target
    switch (name) {
        case "name":
        case "username":
            if (value && value.length === 0)
                return name + " Field is Mendatory"
            else if (value.length < 3 || value > 50)
                return name + " Field Length Must Be 3-50 Characters"
            else
                return ""

        case "email":
            if (value && value.length === 0)
                return name + " Field is Mendatory"
            else if (value.length < 13 || value > 100)
                return name + " Field Length Must Be 13-100 Characters"
            else
                return ""

        case "password":
            if (value && value.length === 0)
                return name + " Field is Mendatory"
            else if (!(schema.validate(value)))
                return "Invalid Password, Password Must Contains AT Least 1 Upper case character, 1 lower case character, 1 digit, 1 space and 1 special character and length must be 8-100"
            else
                return ""

        case "phone":
            if (value && value.length === 0)
                return name + " Field is Mendatory"
            else if ((value.length !== 10))
                return "Invalid Phone Number"
            else if (!(value.startsWith("9") || value.startsWith("8") || value.startsWith("7") || value.startsWith("6")))
                return "Invalid Phone Number"
            else
                return ""

        case "subject":
            if (value && value.length === 0)
                return name + " Field is Mendatory"
            else if ((value.length < 10))
                return "Subject Atleast Contains 10 Characters"
            else
                return ""

        case "icon":
            if (value && value.length === 0)
                return name + " Field is Mendatory"
            else
                return ""

        case "message":
        case "description":
            if (value && value.length === 0)
                return name + " Field is Mendatory"
            else if (value.length < 50)
                return name + " Field Length Must Be Upto 50 Characters"
            else
                return ""

        default:
            return ""
    }
}
