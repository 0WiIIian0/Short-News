import FileIcon from "../FileHandler/FileIcon.js";
import UploadFile from "../FileHandler/UploadFile.js";
import Modal from "../modal/Modal.js";

function postNews(props) {

    return new Promise((resolve, reject) => {

        ajax({
            url: '../back-end/news/postNews.php',
            data: {
                title: props.title,
                subtitle: props.subtitle,
                cover: props.cover,
                content: props.content,
                category: 1
            },
            complete: (response) => {
                resolve(response);
            }
        });

    });

}

export default function PostNews() {

    const modal = Modal();

    let loadedCover = null;
    let coverIcon = null;

    const postData = createElement({
        class: 'flexBox columnDirection alignCenter',
        style: {
            width: '100%',
            overflow: 'auto',
            maxHeight: 'calc(100% - 74px)'
        }
    });

    const title = createElement({
        tag: 'input',
        class: 'newsTitle',
        attributes: {
            type: 'text',
            placeholder: 'Title'
        },
        event: {
            on: 'keydown',
            do: () => {
                title.style.border = 'none';
            }
        }
    });

    const subTitle = createElement({
        tag: 'input',
        attributes: {
            type: 'text',
            placeholder: 'Sub-title'
        },
        event: {
            on: 'keydown',
            do: () => {
                subTitle.style.border = 'none';
            }
        }
    });

    const content = createElement({
        tag: 'textarea',
        attributes: {
            placeholder: 'Content'
        },
        event: {
            on: 'keydown',
            do: () => {
                content.style.border = 'none';
            }
        }
    });

    const fileList = createElement({
        class: 'flexBox rowDirection flexWrap justifyCenter'
    });

    const file = createElement({
        tag: 'input',
        style: {
            display: 'none'
        },
        attributes: {
            type: 'file',
            accept: 'image/png, image/jpeg'
        },
        event: {
            on: 'change',
            do: (event) => {
                
                coverIcon = FileIcon({
                    icon: './assets/icon/news.svg',
                    name: file.files[0].name,
                    onDelete: () => {
                        loadedCover = null;
                        file.parentElement.style.display = 'flex';
                    }
                }).addTo(fileList);

                UploadFile(file.files[0]).then((response) => {

                    if (response.result == 201) {
                        coverIcon.onLoad(`../back-end/files/${response.fileName}`);

                        loadedCover = response.fileName;

                        file.parentElement.style.display = 'none';

                        file.value = '';
                        file.files = null;

                    }

                }, (error) => {

                });

            }
        }
    });
    
    const fileButton = createElement({
        tag: 'label',
        class: 'flexBox rowDirection alignCenter fileInput hoverGrow',
        ripple: '#555555',
        content: [
            file,
            createElement({
                class: 'fileInputContainer',
                content: createElement({
                    tag: 'img',
                    attributes: {
                        src: './assets/icon/add-document.svg'
                    }
                })
            }),
            'Add News Cover'
        ]
    });
    
    function showError() {

        postData.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

    }

    const postNewsButton = createElement({
        class: 'flexBoxAlign button hoverGrow',
        ripple: '#555555',
        content: [
            createElement({
                tag: 'img',
                attributes: {
                    src: './assets/icon/news.svg'
                }
            }),
            createElement({
                content: 'Post'
            })
        ],
        event: {
            on: 'click',
            do: () => {

                let hasTooShortValue = false;

                if (title.value.length == 0) {
                    title.style.border = '1px solid #ff0027d9';
                    hasTooShortValue = true;
                }

                if (subTitle.value.length == 0) {
                    subTitle.style.border = '1px solid #ff0027d9';
                    hasTooShortValue = true;
                }

                if (content.value.length == 0) {
                    content.style.border = '1px solid #ff0027d9';
                    hasTooShortValue = true;
                }

                if (hasTooShortValue) {
                    showError();
                    return;
                }

                if (loadedCover == null) {
                    fileButton.style.border = '1px solid #ff0027d9';
                    return;
                }

                postNews({
                    title: title.value,
                    subtitle: subTitle.value,
                    cover: loadedCover,
                    content: JSON.stringify({
                        content: content.value
                    })
                }).then((response) => {
                    
                    console.log(response);

                    /* TODO: handler possible error when posting news */

                    if (response.result == 200) {

                        title.value = '';
                        subTitle.value = '';
                        content.value = '';
                        coverIcon.style.display = 'none';

                        modal.close();

                    }

                });

            }
        }
    });

    postData.setContent([
        title,
        subTitle,
        content,
        fileList,
        fileButton,
        postNewsButton
    ]);

    const postNewsContainer = createElement({
        id: 'postNews',
        class: 'flexBox alignCenter columnDirection',
        content: [
            createElement({
                class: 'title flexBoxAlign',
                content: 'Post News'
            }),
            postData
        ]
    }).addTo(modal);

    modal.addOnOpenListener(() => {
        postNewsContainer.style.animation = 'zoomInFadeIn linear 0.3s';
    });

    modal.addOnCloseListener(() => {
        postNewsContainer.style.animation = 'zoomOutFadeOut linear 0.3s';
    });

    return modal;

}