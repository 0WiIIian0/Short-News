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

                if (typeof props.data[item] == 'object') {
                    data.append(item, JSON.stringify(props.data[item]));    
                } else {
                    data.append(item, props.data[item]);
                }

            }

        }

        if (typeof props.files != "undefined") {

            for (let item in props.files) {
                data.append(item, props.files[item]);
            }

        }

        request.onloadend = (loadEnd) => {

            if (loadEnd.currentTarget.status == 200) {

                if (typeof props.complete != "undefined") {

                    let response = '';

                    try {
                        response = JSON.parse(loadEnd.currentTarget.response);
                    } catch {
                        response = loadEnd.currentTarget.response;
                    }

                    props.complete(response);
                    
                }

            }

        }

        request.send(data);

    }

    window.ajax = ajax;

})();