import UserLoggedSession from "./user/session/UserLoggedSession.js";
import UserSessionMenu from "./user/session/UserSessionMenu.js";

(() => {
        
    const userFloatMenu = document.getElementById('userFloatMenu');

    elementManager.setDefaultMethods(userFloatMenu);

    function onLogout() {

        userFloatMenu.setContent(
            UserSessionMenu(onLogin)
        );

        userFloatMenu.setStyle({
            overflow: 'hidden'
        });

    }

    function onLogin(sessionInfo) {

        console.log(sessionInfo);

        if (sessionInfo.result != 200) {
            return;
        }

        userFloatMenu.setContent(UserLoggedSession(sessionInfo, onLogout));

        userFloatMenu.setStyle({
            overflow: 'auto'
        });
    }

    ajax({
        url: '../back-end/user/getSession.php',
        complete: (response) => {
            
            if (response.result == 200) {
                onLogin(response);
            } else {
                onLogout();
            }

        }
    });


})();
