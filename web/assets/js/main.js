import UserSessionMenu from "./user/session/UserSessionMenu.js";

const userFloatMenu = document.getElementById('userFloatMenu');

elementManager.setDefaultMethods(userFloatMenu);

userFloatMenu.addContent(UserSessionMenu());
