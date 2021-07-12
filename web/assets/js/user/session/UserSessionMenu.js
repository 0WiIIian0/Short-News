import SignIn from "./SignIn.js"; 
import SignUp from "./SignUp.js"; 

export default function UserSessionMenu() {

    const signIn = SignIn();
    const signUp = SignUp();

    return [
        createElement({
            class: 'fragmentSliderMenu flexBox rowDirection',
            content: createElementList({
                class: 'fragmentOption flexBoxAlign',
                ripple: '#555555',
                list: [
                    {
                        content: 'Sign-In',
                        event: {
                            on: 'click',
                            do: () => {
                                
                                signIn.setStyle({
                                    opacity: 1,
                                    marginLeft: '0px'
                                });

                                signUp.setStyle({
                                    opacity: 0
                                });

                            }
                        }
                    },
                    {
                        content: 'Sign-Up',
                        event: {
                            on: 'click',
                            do: () => {

                                signIn.setStyle({
                                    opacity: 0,
                                    marginLeft: '-100%'
                                });

                                signUp.setStyle({
                                    opacity: 1
                                });

                            }
                        }
                    }
                ]
            })
        }),
        createElement({
            class: 'flexBox rowDirection fragmentSlider',
            content: [
                signIn,
                signUp
            ]
        })
    ];

}