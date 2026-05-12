


function validatePassword(pass, confirm){
            const Errors = []
            if (pass !== confirm){
                Errors.push("Passwords don't match!")
            }
            if (pass.length < 8){
                Errors.push("Passwords too short, needs to be 8 characters!")
            }
            if(!/[a-z]/.test(pass)){
                Errors.push("Passwords must contain at least one lowercase letter!")
            }
            if(!/[A-Z]/.test(pass)){
                Errors.push("Passwords must contain at least one uppercase letter!")
            }
            if(!/\d/.test(pass)){
                Errors.push("Passwords must contain at least one number!")
            }
            return Errors
        }


export default validatePassword