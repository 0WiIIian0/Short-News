export default function Modal() {

    let onOpenListenerList = new Array();
    let onCloseListenerList = new Array();

    const modal = createElement({
        class: 'modal flexBoxAlign',
        event: {
            on: 'click',
            do: (event) => {

                if (event.target == modal) {
                    modal.close();
                }

            }
        }
    });;

    modal.isOpen = false;

    modal.open = () => {
        
        modal.addTo(document.body);
        modal.isOpen = true;
        
        onOpenListenerList.forEach((action) => {
            action();
        });

        modal.setStyle({
            animation: 'fadeIn linear 0.3s'
        });

    }

    modal.close = () => {
        
        modal.isOpen = false;

        modal.setStyle({
            animation: 'fadeOut linear 0.3s'
        });
        
        onCloseListenerList.forEach((action) => {
            action();
        });

        setTimeout(() => {

            if (modal.parentElement != null) {
                document.body.removeChild(modal);
            }

        }, 290);

    }

    modal.addOnOpenListener = (action) => {
        onOpenListenerList.push(action);
    }

    modal.addOnCloseListener = (action) => {
        onCloseListenerList.push(action);
    }

    return modal;

}