console.log('hi');

function renderHomePage() {
    const section = document.getElementById("page");
    section.innerHTML = `
    <p>WELCOME HOME</p>
    `
}

function renderRulesPage() {
    const section = document.getElementById("page");
    section.innerHTML = `
    <ol>
        <li>There are no rules</li>
        <li>The first rule is not a rule</li>
    </ol>
    `
}


// This function will be immediately called
function renderHeader() {
    const header = document.getElementById("header-nav");
    header.innerHTML = `
        <h1>Scavenger Hunt</h1>
        <ul>
            <li onClick="renderHomePage()">Home</li>
            <li onClick="renderRulesPage()">Rules</li>
        </ul>
    `
}

renderHeader();