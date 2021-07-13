export default function Modal() {

    const modal = createElement({
        class: 'modal'
    });;

    modal.open = () => {
        
        modal.setStyle({
            display: 'flex'
        });

    }

    modal.open = () => {
        
        modal.setStyle({
            display: 'none'
        });

    }

    return modal;

}