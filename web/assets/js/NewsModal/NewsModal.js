import LoadingIcon from "../LoadingIcon/LoadingIcon.js";
import Modal from "../modal/Modal.js";

function loadNews(newsID) {

    return new Promise((resolve, reject) => {

        ajax({
            url: '../back-end/news/getNewsContent.php',
            data: {
                id: newsID
            },
            complete: (response) => {
                resolve(response);
            }
        })

    });

}

// TODO: Implement ajax downloading the
// content only when user opens the news
export default class NewsModal {

    static #instance;

    constructor() {
        
        this.modal = new Modal();

        this.newsModal = createElement({
            class: 'newsModal flexBoxAlign',
            content: LoadingIcon()
        }).addTo(this.modal);
        
    }

    open(newsInfo) {
        this.modal.open();

        loadNews(newsInfo.id).then((response) => {

            console.log(response);

        });

    }

    static initialize() {
        
        if (this.#instance == null) {
            this.#instance = new NewsModal();
        }

    }

    static getInstance() {

        if (this.#instance == null) {
            this.#instance = new NewsModal();
        }

        return this.#instance;

    }
    

}