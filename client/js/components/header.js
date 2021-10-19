// This function will be immediately called
function renderHeader() {
    const header = document.getElementById("header-nav");
    header.replaceChildren("")

    const linksObject = {
        "Home": 'renderChallengeList()',
        "Rules": 'renderRulesPage()',
        "New Challenge": 'renderForm()',
    }

    const headerTitle = document.createElement("h1");
    headerTitle.textContent = "Scavenger Hunt";
    
    const headerUl = document.createElement("ul");
    headerUl.classList.add('nav')

    for (let [key, value] of Object.entries(linksObject)) {
        let newLi = document.createElement("li");
        newLi.classList.add('navLink');
        newLi.setAttribute('onclick',value);
        newLi.textContent = key;
        headerUl.append(newLi);
    }

    axios.get('/api/sessions')
        .then( (res) => { 
            let newLi = document.createElement("li");
            newLi.classList.add('navLink');
            newLi.setAttribute('onclick','logout()');
            newLi.textContent = "Logout";
            headerUl.append(newLi);
        })
        .catch( (err) => {
            let newLi = document.createElement("li");
            newLi.classList.add('navLink');
            newLi.setAttribute('onclick','renderLogin()');
            newLi.textContent = "Login";
            headerUl.append(newLi);
        })
        .then( () => {
            header.append(headerTitle,headerUl);
        });
}