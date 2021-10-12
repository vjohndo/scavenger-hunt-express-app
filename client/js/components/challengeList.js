// Want to eventually create document elements
function renderChallengeList() {
    console.log('Render Challenge List');
    const page = document.getElementById("page");
    page.replaceChildren("");

    axios.get("http://localhost:3000/api/challenges").then((response) => {
        const challenges = response.data.challenges;
    
        for (challengeObject of challenges) {
            const newChallenge = document.createElement('ul');
            newChallenge.classList.add("challenge")
            const {name, challenge, address} = challengeObject;

            for (listItem of [name, challenge, address]) {
                let newLi = document.createElement('li');
                newLi.textContent = listItem;
                newChallenge.appendChild(newLi);
            }

            page.appendChild(newChallenge);
        }
    });
};

