document
    .querySelectorAll('.delete-link')
    .forEach((link) => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const filename =
                this.getAttribute('data-filename');
            fetch(`/delete/${filename}`, {
                method: 'DELETE',
            })
                .then((response) => {
                    if (response.ok) {
                        window.location.reload();
                        window.alert('File deleted successfully');
                    } else {
                        window.alert('Error deleting file');
                    }
                })
                .catch((error) => {
                    window.alert('Error deleting file');
                });
        });
    });