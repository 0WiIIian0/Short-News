(() => {

    function ajax(props) {

        let request = new XMLHttpRequest();
        let data = new FormData();
        
        request.open(
            props.method ? props.method : 'POST',
            props.url
        );

        request.onloadend = (loadEnd) => {

            if (loadEnd.currentTarget.status == 200) {

                createNoteElement({
                    title: newNoteTitle.value,
                    content: {
                        preview: newNoteText.value
                    }
                }).addTo(noteList);
                
                newNoteTitle.value = '';
                newNoteText.value = '';

            }

        }

        if (typeof props.data != "undefined") {

            for (let item in props.data) {
                data.append(item, props.data[item]);
            }

        }

        request.onloadend = (loadEnd) => {

            if (loadEnd.currentTarget.status == 200) {

                if (typeof props.complete != "undefined") {
                    props.complete(loadEnd.currentTarget.response);
                }

            }

        }

        request.send(data);

    }

    window.ajax = ajax;

})();