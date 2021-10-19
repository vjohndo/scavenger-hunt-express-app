// Want to eventually create document elements

function renderChallengeList() {
    console.log('Render Challenge List');
    const page = document.getElementById("page");
    page.replaceChildren("");

    axios.get("http://localhost:3000/api/challenges").then((response) => {
        const challenges = response.data;
    
        for (challengeObject of challenges) {
            const newChallenge = document.createElement('ul');
            const {id, name, challenge, address} = challengeObject;
            newChallenge.classList.add("challenge")
            newChallenge.id = id
            
            for (listItem of [name, challenge, address]) {
                let newLi = document.createElement('li');
                newLi.textContent = listItem;
                newChallenge.appendChild(newLi);
            }

            // Adds the delete
            let deleteButton = document.createElement('button');
            deleteButton.textContent = "DELETE";
            deleteButton.dataset.id = id;
            deleteButton.addEventListener('click', (event) => {
                axios.delete(`http://localhost:3000/api/challenges/${id}`).then((res)=> {
                    if (res.data.message === "Deleted") {
                        let challengeUl = document.getElementById(id);
                        challengeUl.remove();
                    }
                })
            });

            newChallenge.appendChild(deleteButton);

            page.appendChild(newChallenge);
        }
    });
};

