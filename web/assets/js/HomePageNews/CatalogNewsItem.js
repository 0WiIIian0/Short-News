export default function CatalogNewsItem(newsInfo) {

    return createElement({
        class: 'flexBox columnDirection newsItem',
        content: [
            createElement({
                class: 'title',
                content: newsInfo.title
            }),
            createElement({
                class: 'bottomInfo',
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
        ]
    });

}