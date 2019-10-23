//init UI

//select and named the button i want the event to happen
const searchGiphy = document.getElementById('submit');
//added an event listener to the button

searchGiphy.addEventListener('click', submit);

// wrote a function to get input when the button is clicked. 
//'click' is the event and 'submit is the function name
function submit(e) {
    const userText = document.querySelector('input').value;
    const xhr = new XMLHttpRequest();
    //console.log(userText)
    // wrote a function to say what should happen on click
    // if (userText.Text !== '') {
    //make http call
    xhr.open('GET',
        // `http://openlibrary.org/search.json?title&q=${userText}?limit&q=10?language=eng`, true);
        `https://www.googleapis.com/books/v1/volumes?q=${userText}&maxresults=10`, true);


    xhr.onload = function() {
        if (this.status === 200) {
            const response = JSON.parse(this.responseText);
            console.log(response)

            var output = '';

            if (response.kind === "books#volumes") {
                response.items.forEach(function(form) {
                    output += `<li style=>Book Title:${form.volumeInfo.title} Book author:${form.volumeInfo.authors}</li>
                    <img src = "${form.volumeInfo.imageLinks.thumbnail}">`

                    //console.log(output)
                });
            } else {
                output += `<li>something went wrong</li>`
            }

            document.querySelector('#profile').innerHTML = output
        }
    }




    xhr.send();

    e.preventDefault();

}