const renderForm = () => {
  
    // Get the page 
    const page = document.getElementById("page");

    // Create a form document... have replace children at the end
    const form = document.createElement("form");

    const formInputs = ["name","challenge","address"];

    // Go through each of the inputs, create elements for them
    for (let inputName of formInputs) {
        let newFieldSet = document.createElement("fieldset");

        let newLabel = document.createElement("label");
        newLabel.htmlFor = inputName;
        newLabel.textContent = inputName + ":";

        let newInput = document.createElement("input");
        newInput.type = 'text';
        newInput.name = inputName;

        newFieldSet.appendChild(newLabel);
        let newBr = document.createElement("br");
        newFieldSet.appendChild(newBr);
        newFieldSet.appendChild(newInput);
        form.appendChild(newFieldSet);
    }

    const newSubmit = document.createElement("input");
    newSubmit.type = "submit";
    newSubmit.value = "Add Challenge";
    form.appendChild(newSubmit);

    const newP = document.createElement("p");
    newP.id = "confirmInsert";

    // Add event listener that deals with the submit
    form.addEventListener("submit", (event) => {
      
        // Prevents the browsers default actions. In this case, refreshing on a submit
        event.preventDefault()
        // Create a new form data object
        const formData = new FormData(form)

        // Create a set of entries from the form data
        const data = Object.fromEntries(formData.entries())

        // Send the challenges 
        axios.post('/api/challenges', data)
            .then((res) => {
                console.log(res)
                renderChallengeList();
            })
            .catch(err => {
                const confirmMessage = document.getElementById("confirmInsert");
                confirmMessage.textContent = (err.response.data.message);
                console.log(err.response.data.message);
            })            
    })

    page.replaceChildren(form, newP);

};