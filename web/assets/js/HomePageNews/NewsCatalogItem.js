import NewsModal from "../NewsModal/NewsModal.js";


function openNews(newsInfo) {

    NewsModal.initialize();

    NewsModal.getInstance().open(newsInfo);

}

export default function NewsCatalogItem(newsInfo) {

    console.log(newsInfo);

    return createElement({
        class: 'flexBox columnDirection newsItem hoverGrow',
        style: {
            backgroundImage: `url("../back-end/files/${newsInfo.cover}")`
        },
        content: [
            createElement({
                class: 'title',
                content: newsInfo.title
            }),
            createElement({
                class: 'bottomInfo flexBox columnDirection',
                content: [
                    createElement({
                        class: 'subTitle',
                        content: newsInfo.subtitle
                    }),
                    createElement({
                        class: 'post_date',
                        content: newsInfo.post_date
                    })
                ]
            })
        ],
        event: {
            on: 'click',
            do: () => {
                openNews(newsInfo);
            }
        }
    });

}