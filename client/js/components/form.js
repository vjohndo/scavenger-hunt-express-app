const renderForm = () => {
  
  // Get the page 
  const page = document.getElementById("page");

    // Create a form document
    const form = document.createElement("form");
    form.innerHTML = `
        <fieldset>
            <label for="name">Name:</label><br>
            <input type="text" name="name">
        </fieldset>
        <fieldset>
            <label for="address">Challenge:</label><br>
            <input type="text" name="challenge">
        </fieldset>
        <fieldset>
            <label for="address">Address:</label><br>
            <input type="text" name="address">
        </fieldset>
        <input type="submit">
        <p id="confirmInsert"></p>
        `;

    // Add event listener that deals with the submit
    form.addEventListener("submit", (event) => {
      
        // Prevents the browsers default actions. In this case, refreshing on a submit
        event.preventDefault()
        // Create a new form data object
        const formData = new FormData(form)

        // Create a set of entries from the form data
        const data = Object.fromEntries(formData.entries())

        // Send the challenges 
        axios.post('/api/challenges', data).then((res) => {

            const confirmMessage = document.getElementById("confirmInsert");
            console.log(res)

            if (res.data.rowCount) {
                renderChallengeList();
            } else {
                confirmMessage.textContent = "Challenge Couldn't Be Added";
            }
        })
    })

    page.replaceChildren(form);

};