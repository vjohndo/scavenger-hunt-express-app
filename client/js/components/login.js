function renderLogin() {
    
    // Get the page, create a form
    const page = document.getElementById("page");
    const form = document.createElement("form");

    page.replaceChildren("");

    const formInputs = ["username","password"];

    // Go through each of the inputs, create elements for them
    for (let inputName of formInputs) {
        let newFieldSet = document.createElement("fieldset");

        let newLabel = document.createElement("label");
        newLabel.htmlFor = inputName;
        newLabel.textContent = inputName + ":";

        let newInput = document.createElement("input");
        newInput.type = (inputName === "password") ? "password" : "text";
        newInput.name = inputName;

        newFieldSet.appendChild(newLabel);
        let newBr = document.createElement("br");
        newFieldSet.appendChild(newBr);
        newFieldSet.appendChild(newInput);
        form.appendChild(newFieldSet);
    }

    // Submit button
    const newSubmit = document.createElement("input");
    newSubmit.type = "submit";
    newSubmit.value = "LOGIN";
    form.appendChild(newSubmit);

    // Add event listener to button
    form.addEventListener("submit", (event) => {
      
        // Prevents the browsers default actions. In this case, refreshing on a submit
        event.preventDefault()
        // Create a new form data object
        const formData = new FormData(form)

        // Create a set of entries from the form data
        const data = Object.fromEntries(formData.entries())

        // Send the challenges 
        axios.post('/api/sessions', data)
            .then((res) => {
                console.log(res)
                renderHeader(); // Remove after fixing the login
                renderChallengeList();
            })
            .catch(err => {
                const confirmMessage = document.getElementById("confirmInsert");
                confirmMessage.textContent = (err.response.data.message);
                console.log(err.response.data.message);
            })            
    })

    const newP = document.createElement("p");
    newP.id = "confirmInsert";

    page.replaceChildren(form, newP);
}

function logout() {
    axios.delete('/api/sessions').then((res) => {
        location.href = "/"; // Remove after fixing the login
    })
}