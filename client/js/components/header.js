// This function will be immediately called
function renderHeader() {
    const header = document.getElementById("header-nav");

    const linksObject = {
        "Home": 'renderChallengeList()',
        "Rules": 'renderRulesPage()',
        "New Challenge": 'renderForm()'
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

    header.append(headerTitle,headerUl);

}