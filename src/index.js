/*
Vytvoř seznam, do kterého si budeš moci přidávat věci, které si máš sbalit na cestu.
Věci v seznamu by měly zůstat i po obnovení stránky (refresh, zavření prohlížeče, apod.)
*/


const formElement = document.querySelector('#formular'); // formulář
const itemElement = document.querySelector('#polozka'); // pole pro zadávání
const listElement = document.querySelector('#seznam'); // <ul>, kam vypisujeme seznam

/* pole pro seznam položek */

//logický výraz nebo || - pokud je první část "true", druhá část se vůbec nevyhodnocuje

const travelList = JSON.parse(localStorage.getItem("travelList")) || [];

ukazSeznam();

formElement.addEventListener("submit", pridejPolozku);

listElement.addEventListener("click", priKliknuti);

function priKliknuti(e) {
    if (e.target.matches("input[type=checkbox]")) {
        let index = e.target.dataset.index;
        
        travelList[index].checked = !travelList[index].checked;
    
        localStorage.setItem("travelList", JSON.stringify(travelList));
    }
}

function pridejPolozku(e) {
    e.preventDefault();

    console.log("pridavam");

    let item = {
        text: itemElement.value,
        checked: false
    };

    travelList.push(item);

    ukazSeznam();

    formElement.reset();

    localStorage.setItem("travelList", JSON.stringify(travelList));
}

function ukazSeznam() {
    // pomocí forEach 

    let html = "";
    travelList.forEach((item, index) => {
        html +=`
        <li>
        <input type="checkbox" data-index="${index}" name="item${index}" id="item${index}" ${item.checked ? "checked" : ""}>
        <label for="item${index}">${item.text}</label>
      </li>
      `;
    }) 
    
    listElement.innerHTML = html;

    //pomocí map - transformace z jednoho pole na druhé pole - například můžu vybat z pole jen ty části, které mě zajímá

    /*

    let html = travelList.map((item, index) => {
        return `
        <li>
        <input type="checkbox" name="item${index}" id="item${index}" ${item.checked ? "checked" : ""}>
        <label for="item${index}">${item.text}</label>
      </li>
        `
    }).join("")

    listElement.innerHTML = html;

    */

    //pomocí reduce 
    /*

    let html = travelList.reduce((suma, item, index) => {
        return suma + `
        <li>
        <input type="checkbox" name="item${index}" id="item${index}" ${item.checked ? "checked" : ""}>
        <label for="item${index}">${item.text}</label>
      </li>
        `;
    }, "" );

    listElement.innerHTML = html; */
}

