function sendSignInToServer(props) {

    ajax({
        url: '../back-end/user/signin.php',
        data: props,
        complete: (e) => {
            userFloatMenu.clear();
        }
    });

}

export default function SignIn() {
    
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
                content: 'Sign-In'
            }),
            createElement({
                class: 'flexBoxAlign columnDirection',
                content: [
                    userEmail,
                    userPassword,
                    createElement({
                        class: 'button hoverGrow',
                        ripple: '#000000',
                        content: 'Check',
                        event: {
                            on: 'click',
                            do: () => {
                                sendSignInToServer({
                                    email: userEmail.value,
                                    pass: userPassword.value,
                                })
                            }
                        }
                    })
                ]
            })
        ]
    });

}