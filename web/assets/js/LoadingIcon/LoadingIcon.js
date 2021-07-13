/* A special thanks to: https://loading.io/css/ */

export default function LoadingIcon() {

    return createElement({
        class: 'lds-spinner',
        content: createElementList({
            list: 12
        })
    });

}