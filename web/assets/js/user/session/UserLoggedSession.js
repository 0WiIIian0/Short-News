export default function UserLoggedSession(sessionInfo, onLogout) {

    console.log(sessionInfo);

    return createElement({
        class: 'flexBox columnDirection',
        content: [
            createElement({
                class: 'option flexBox alignCenter justifyBetween',
                ripple: '#555555',
                content: [
                    createElement({
                        content: 'Name: '
                    }),
                    createElement({
                        content: sessionInfo.username
                    })
                ]
            }),
            createElement({
                class: 'option flexBox alignCenter',
                ripple: '#555555',
                content: 'Logoff',
                event: {
                    on: 'click',
                    do: () => {

                        ajax({
                            url: '../back-end/user/logout.php',
                            complete: (respose) => {

                                if (respose.result == 200) {
                                    onLogout();
                                }

                            }
                        })

                    }
                }
            })
        ]
    });

}