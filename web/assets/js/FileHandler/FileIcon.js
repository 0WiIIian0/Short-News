import LoadingIcon from "../LoadingIcon/LoadingIcon.js";

function deleteFile(fileName) {

    return new Promise((resolve, reject) => {

        ajax({
            url: '../back-end/fileManager/deleteFile.php',
            data: {
                fileName
            },
            complete: (response) => {
                resolve(response);
            }
        });

    });

}

export default function FileIcon(props) {

    let imgPermanentName = '';

    if (props.name.length > 10) {
        let ext = props.name.split('.').pop();
        props.name = props.name.substring(0, 10) + '...' + ext;
    }

    const loadingIcon = LoadingIcon();

    const icon = createElement({
        class: 'flexBox rowDirection alignCenter hoverGrow fileIcon',
        ripple: '#555555',
        content: [
            loadingIcon,
            createElement({
                class: 'name',
                content: props.name
            })
        ]
    });
    
    const deleteButton = createElement({
        class: 'deleteButton flexBoxAlign',
        content: createElement({
            class: 'deleteButtonIcon flexBoxAlign',
            ripple: '#CC4567',
            content: createElement({
                tag: 'img',
                attributes: {
                    src: './assets/icon/trash.svg'
                }
            })
        }),
        event: {
            on: 'click',
            do: () => {
                
                deleteFile(imgPermanentName).then((response) => {

                    if (response.result == 200) {
                        icon.parentElement.removeChild(icon);

                        if (props.onDelete) {
                            props.onDelete();
                        }

                    } else {
                        console.log(`failed to delete file "${props.name}"`);
                    }

                }, () => {

                });

            }
        }
    });

    icon.onLoad = (permanentLink) => {

        imgPermanentName = permanentLink.split('/').pop();

        const img = createElement({
            tag: 'img',
            attributes: {
                src: permanentLink
            }
        });

        icon.replaceChild(img, loadingIcon);
        deleteButton.addTo(icon);

    }

    return icon;

}