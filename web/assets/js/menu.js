(() => {

    let mobileMenu = document.getElementById('mobileMenu');
    let leftMenu = document.getElementById('leftMenu');

    let userBox = document.getElementById('userBox');
    let userFloatMenu = document.getElementById('userFloatMenu');

    elementManager.setDefaultMethods(userBox);

    mobileMenu.onclick = () => {

        if (leftMenu.style.left != '0px') {
            leftMenu.style.left = '0px';
        } else {
            leftMenu.style.left = 'calc(-90% + 20px)';
        }

        if (userFloatMenu.style.display == 'flex') {

            userFloatMenu.style.animation = 'fadeOutSlideTop linear 0.3s';
            userFloatMenu.style.zIndex = 8;

            setTimeout(() => {
                userFloatMenu.style.display = 'none';
            }, 290);
            
        }

    }

    userBox.onclick = () => {

        if (userFloatMenu.style.display != 'flex') {
            userFloatMenu.style.display = 'flex';
            userFloatMenu.style.animation = 'fadeInSlideBottom linear 0.3s';

            setTimeout(() => {
                userFloatMenu.style.zIndex = 11;
            }, 310);

        } else {

            userFloatMenu.style.animation = 'fadeOutSlideTop linear 0.3s';
            userFloatMenu.style.zIndex = 8;

            setTimeout(() => {
                userFloatMenu.style.display = 'none';
            }, 290);

        }

        if (leftMenu.style.left == '0px') {
            leftMenu.style.left = 'calc(-90% + 20px)';
        }

    }

    /*const uploadFile = document.getElementById('uploadFile');

    uploadFile.onchange = (e) => {

        ajax({
            url: '../back-end/fileManager/uploadFile.php',
            files: {
                file: uploadFile.files[0]
            },
            complete: (e) => {
                console.log(JSON.parse(e));
            }
        });

    }*/

})();