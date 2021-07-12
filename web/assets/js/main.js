import UserSessionMenu from "./user/session/UserSessionMenu.js";

(() => {
        
    const userFloatMenu = document.getElementById('userFloatMenu');

    elementManager.setDefaultMethods(userFloatMenu);

    function onLogin() {
        
        userFloatMenu.clear();

    }

    userFloatMenu.addContent(
        UserSessionMenu(onLogin)
    );

})();
