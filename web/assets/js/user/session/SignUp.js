function sendSignUpToServer(props) {

    return new Promise((resolve, reject) => {

        ajax({
            url: '../back-end/user/signup.php',
            data: props,
            complete: (response) => {
                resolve(response);
            }
        });

    });

}

export default function SignIn(onLogin) {
    
    const userName = createElement({
        tag: 'input',
        attributes: {
            type: 'text',
            placeholder: 'Username'
        }
    });

    const userEmail = createElement({
        tag: 'input',
        attributes: {
            type: 'email',
            placeholder: 'Email'
        }
    });

    const userPassword = createElement({
        tag: 'input',
        attributes: {
            type: 'password',
            placeholder: 'Password'
        }
    });

    return createElement({
        tag: 'form',
        class: 'fragment flexBoxAlign columnDirection',
        content: [
            createElement({
                class: 'title',
                content: 'Sign-Up'
            }),
            createElement({
                class: 'flexBoxAlign columnDirection',
                content: [
                    userName,
                    userEmail,
                    userPassword,
                    createElement({
                        class: 'button hoverGrow',
                        ripple: '#000000',
                        content: 'Enter',
                        event: {
                            on: 'click',
                            do: () => {

                                sendSignUpToServer({
                                    name: userName.value,
                                    email: userEmail.value,
                                    pass: userPassword.value,
                                }).then((response) => {
                                    onLogin(response);
                                }, (error) => {

                                });

                            }
                        }
                    })
                ]
            })
        ]
    });

}