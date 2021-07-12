export default function SignIn() {

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
                    createElement({
                        tag: 'input',
                        attributes: {
                            type: 'text',
                            placeholder: 'Username'
                        }
                    }),
                    createElement({
                        tag: 'input',
                        attributes: {
                            type: 'email',
                            placeholder: 'Email'
                        }
                    }),
                    createElement({
                        tag: 'input',
                        attributes: {
                            type: 'password',
                            placeholder: 'Password'
                        }
                    }),
                    createElement({
                        class: 'button hoverGrow',
                        ripple: '#000000',
                        content: 'Enter'
                    })
                ]
            })
        ]
    });

}