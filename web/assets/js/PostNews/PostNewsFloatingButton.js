export default function PostNewsFloatinButton() {

    const button = createElement({
        id: 'PostNewsFloatinButton',
        class: 'flexBoxAlign hoverGrow',
        ripple: '#777777',
        content: createElement({
            tag: 'img',
            attributes: {
                src: './assets/icon/news.svg'
            }
        })
    });

    return button;

}