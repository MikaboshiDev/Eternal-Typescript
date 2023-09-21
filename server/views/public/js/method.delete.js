/* The code is selecting all elements with the class "delete-link" using the `querySelectorAll` method.
It then iterates over each selected element using the `forEach` method. For each element, it adds a
click event listener that prevents the default behavior of the click event using
`e.preventDefault()`. */
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