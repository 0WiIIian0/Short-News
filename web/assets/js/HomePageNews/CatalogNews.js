import CatalogNewsItem from "./CatalogNewsItem.js";

function loadNews() {
    
    return new Promise((resolve, reject) => {

        ajax({
            url: '../back-end/news/getNews.php',
            data: {
                categories: [1, 2]
            },
            complete: (response) => {
    
                if (response.result != 200) {
                    reject(response);
                }
    
                resolve(response.newsList);
    
            }
        })

    });

}

function createCatalogNewsItem(newsInfo) {
    return CatalogNewsItem(newsInfo);
}

export default function CatalogNews() {

    const catalogNews = createElement({
        class: 'catalogNews flexBox rowDirection justifyCenter flexWrap'
    });

    loadNews().then((newsList) => {

        newsList.forEach((news) => {
            createCatalogNewsItem(news).addTo(catalogNews);
        });

    });

    return catalogNews;

}
