const booklist = document.getElementById('books')

const formdata = new FormData(form);
const body = new URLSearchParams(formdata);
fetch('', {
    method: 'POST',
    body, 
})
.then(
    res => res.ok //navigate to /login
    res.json()
).then(
    val => populateHTML(val.record)
)

function populateHTML(array){
    //loop over records
    //for each record, create a html element
    //append it to the booklist
}