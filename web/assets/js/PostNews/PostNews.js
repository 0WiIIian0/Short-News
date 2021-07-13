import FileIcon from "../FileHandler/FileIcon.js";
import UploadFile from "../FileHandler/UploadFile.js";
import Modal from "../modal/Modal.js";

export default function PostNews() {

    const modal = Modal();

    const title = createElement({
        tag: 'input',
        class: 'newsTitle',
        attributes: {
            type: 'text',
            placeholder: 'Title'
        }
    });

    const subTitle = createElement({
        tag: 'input',
        attributes: {
            type: 'text',
            placeholder: 'Sub-title'
        }
    });

    const content = createElement({
        tag: 'textarea',
        attributes: {
            placeholder: 'Content'
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

                const fileIcon = FileIcon({
                    icon: './assets/icon/news.svg',
                    name: file.files[0].name
                }).addTo(fileList);

                UploadFile(file.files[0]).then((response) => {

                    if (response.result == 201) {
                        fileIcon.onLoad(`../back-end/files/${response.fileName}`);

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
            'Add files'
        ]
    });

    const postNewsContainer = createElement({
        id: 'postNews',
        class: 'flexBox alignCenter columnDirection',
        content: [
            createElement({
                class: 'title flexBoxAlign',
                content: 'Post News'
            }),
            createElement({
                class: 'flexBox columnDirection alignCenter',
                style: {
                    width: '100%',
                    overflow: 'auto',
                    maxHeight: 'calc(100% - 74px)'
                },
                content: [
                    title,
                    subTitle,
                    content,
                    fileList,
                    fileButton
                ]
            })
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