import api from 'services/api';

export const sendToken = async (email, userType) => {
    try {
        const response = await api.post(`/${userType}/email_reset_password`,
            {
                email: email
            },
            {
                headers: {
                    'Accept': 'application/vnd.api+json',
                    'Content-Type': 'application/json'
                }
            }
        )
        if (response.status == 200)
            return response
    } catch(e) {
        alert('Algo deu errado, tente novamente!');
        console.log(e);
        return {errors: e}
    }
}

export const confirmToken = async (code, userType) => {
    try {
        const response = await api.post(`/${userType}/show_reset_token`,
            {
                code: code
            },
            {
                headers: {
                    'Accept': 'application/vnd.api+json',
                    'Content-Type': 'application/json'
                }
            }
        )
        if (response.status == 200)
            return response
    } catch(e) {
        alert('Algo deu errado, tente novamente!');
        console.log(e);
        return {errors: e}
    }
}

export const resetPassword = async (token, password, confirmPassword, userType) => {
    try {
        const response = await api.post(`/${userType}/reset_password`,
            {
                reset_password_token: token,
                password: password,
                password_confirmation: confirmPassword
            },
            {
                headers: {
                    'Accept': 'application/vnd.api+json',
                    'Content-Type': 'application/json'
                }
            }
        )
        if (response.status == 200)
            return response
    } catch(e) {
        alert('Algo deu errado, tente novamente!');
        console.log(e);
        return {errors: e}
    }
}