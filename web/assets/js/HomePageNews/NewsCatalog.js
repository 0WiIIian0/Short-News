import NewsCatalogItem from "./NewsCatalogItem.js";

function loadNews() {
    
    return new Promise((resolve, reject) => {

        ajax({
            url: '../back-end/news/getNewsCatalogPreview.php',
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

function createNewsCatalogItem(newsInfo) {
    return NewsCatalogItem(newsInfo);
}

export default function CatalogNews() {

    const catalogNews = createElement({
        class: 'catalogNews flexBox rowDirection justifyCenter flexWrap'
    });

    loadNews().then((newsList) => {

        newsList.forEach((news) => {
            createNewsCatalogItem(news).addTo(catalogNews);
        });

    });

    return catalogNews;

}
