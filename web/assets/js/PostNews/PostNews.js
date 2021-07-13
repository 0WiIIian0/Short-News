import Modal from "../modal/Modal";

export default function PostNews() {

    const modal = Modal();

    createElement({
        id: 'postNews'
    }).addTo(modal);

    return modal;

}