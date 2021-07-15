import NewsCatalog from "./HomePageNews/NewsCatalog.js";
import PostNews from "./PostNews/PostNews.js";
import PostNewsFloatinButton from "./PostNews/PostNewsFloatingButton.js";
import UserLoggedSession from "./user/session/UserLoggedSession.js";
import UserSessionMenu from "./user/session/UserSessionMenu.js";

(() => {

    const root = document.getElementById('root');

    const userFloatMenu = document.getElementById('userFloatMenu');
    const postNews = PostNews();
    const postNewsFloatinButton = PostNewsFloatinButton();

    NewsCatalog().addTo(root);

    elementManager.setDefaultMethods(userFloatMenu);

    postNewsFloatinButton.on({
        on: 'click',
        do: () => {

            if (postNews.isOpen) {
                postNews.close();
            } else {
                postNews.open();
            }

        }
    })

    function onLogout() {

        userFloatMenu.setContent(
            UserSessionMenu(onLogin)
        );

        userFloatMenu.setStyle({
            overflow: 'hidden'
        });

        if (postNewsFloatinButton.parentElement != null) {
            document.body.removeChild(postNewsFloatinButton);
        }

    }

    function onLogin(sessionInfo) {

        if (sessionInfo.result != 200) {
            return;
        }

        userFloatMenu.setContent(UserLoggedSession(sessionInfo, onLogout));

        userFloatMenu.setStyle({
            overflow: 'auto'
        });

        if (sessionInfo.canPostNews == '1') {
            postNewsFloatinButton.addTo(document.body);
        }

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
