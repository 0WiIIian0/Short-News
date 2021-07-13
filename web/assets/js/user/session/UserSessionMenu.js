import SignIn from "./SignIn.js"; 
import SignUp from "./SignUp.js"; 

export default function UserSessionMenu(onLogin) {

    const signIn = SignIn(onLogin);
    const signUp = SignUp(onLogin);

    const signInButton = createElement({
        class: 'fragmentOption flexBoxAlign selected',
        ripple: '#555555',
        content: 'Sign-In'
    });

    const signUpButton = createElement({
        class: 'fragmentOption flexBoxAlign',
        ripple: '#555555',
        content: 'Sign-Up'
    });

    signInButton.on({
        on: 'click',
        do: () => {
            
            signIn.setStyle({
                opacity: 1,
                marginLeft: '0px'
            });

            signUp.setStyle({
                opacity: 0
            });

            signInButton.addClass('selected');
            signUpButton.removeClass('selected');

        }
    });

    signUpButton.on({
        on: 'click',
        do: () => {

            signIn.setStyle({
                opacity: 0,
                marginLeft: '-100%'
            });

            signUp.setStyle({
                opacity: 1
            });

            signUpButton.addClass('selected');
            signInButton.removeClass('selected');

        }
    });

    return [
        createElement({
            class: 'fragmentSliderMenu flexBox rowDirection',
            content: [
                signInButton,
                signUpButton
            ]
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