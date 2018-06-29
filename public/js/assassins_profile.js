(function () {
  // Assassin Profile Page Data Fetch and Fill
  (function goToProfile() {
    let asnId = localStorage.getItem('id');
    // let stateObj = { page: "profile" };
    // history.pushState(stateObj, "Assassin Profile", `assassins/${asnId}/profile`);
      fetch(`http://localhost:8000/assassins/${asnId}`, {
      method: "GET"
      })
      .then((data) => data.text())
      .then((text) => {
        let assassinObj = JSON.parse(text);
        fillAssassinProfile(assassinObj);
      })
      .then(
        fetch(`http://localhost:8000/assassins/${asnId}/contracts`, {
      method: "GET"
      })
      .then((data) => data.text())
      .then((text => {
        let assassinsContracts = JSON.parse(text);
        console.log(assassinsContracts);
        fillActiveContracts(assassinsContracts);
      }))
    )
  })();

  function callEditAssassins() {
    console.log('event triggered')
    event.preventDefault();
    let asnId = event.target.getAttribute('asn-id');
    fetch(`http://localhost:8000/_assassins_edit.html`, {
      method: "GET"
      })
      .then((data) => data.text())
      .then((text) => {
        document.getElementById('modal-body').innerHTML = text;
        document.getElementById('edit-assassin-form').setAttribute('action', `assassins/${asnId}`);
      })
      .then(()=> {
        fetch(`http://localhost:8000/assassins/${asnId}`)
        .then((data) => data.text())
        .then((text) => {
          assassinData = JSON.parse(text);
          fillAsnEditPage(assassinData);
        });
      });
    }

    function fillAsnEditPage(assassinData){
      let a = assassinData;
      a.forEach((e) => {
        let name= document.getElementById('assassin-name');
        let codeName = document.getElementById('assassin-code-name');
        let photo = document.getElementById('assassin-photo');
        let weapon = document.getElementById('assassin-weapon');
        let contact = document.getElementById('assassin-contact');
        let age = document.getElementById('assassin-age');
        let price = document.getElementById('assassin-price');
        let rating = document.getElementById('assassin-rating');
        let kills = document.getElementById('assassin-kills');
        name.setAttribute('value', e.name);
        codeName.setAttribute('value', e.code_name);
        photo.setAttribute('value', e.photo);
        weapon.setAttribute('value', e.weapon);
        contact.setAttribute('value', e.contact);
        age.setAttribute('value', e.age);
        price.setAttribute('value', e.min_price);
        rating.setAttribute('value', e.rating);
        kills.setAttribute('value', e.kills);
      });
    }

  function fillAssassinProfile(obj) {
    let info = obj[0];
    let outer = document.getElementById('assassin-profile');
    let infoRow = createDiv(outer, ['row', 'margin-top-50']);
    let imgCol = createDiv(infoRow, ['col-3']);
    let infoCol = createDiv(infoRow, ['col-7']);
    let btnCol = createDiv(infoRow, ['col-2']);
    let photo = createImgElement(imgCol, ['img-fluid'], info.photo, info.name);
    let name = createHeaderElement(infoCol, 'h3', info.name);
    let codeName = createHeaderElement(name, 'h5', `(${info.code_name})`);
    let topRow = createDiv(infoCol, ['row']);
    let colPR = createDiv(topRow, ['col-6']);
    let ulPR = createListElement(colPR, {Rating: info.rating, Price: info.min_price});
    let colKA= createDiv(topRow, ['col-6']);
    let ulKA = createListElement(colKA, {Kills: info.kills, Age: info.age});
    let bottomRow = createDiv(infoCol, ['row']);
    let colWC = createDiv(bottomRow, ['col-12']);
    let ulWC = createListElement(colWC, {Weapon: info.weapon, Contact: info.contact});
    let editBtn = createButtonElement(btnCol, 'button', ['btn', 'btn-success'], 'Edit', info.id, callEditAssassins);
    let deleteBtn = createButtonElement(btnCol, 'button', ['btn', 'btn-danger'], 'Delete', info.id);
  }

  function fillActiveContracts(arr){
    let outer = document.getElementById('assassin-profile');
    let contractsRow = createDiv(outer, ['row','margin-top-25']);
    let outerCol = createDiv(contractsRow, ['col-10', 'ml-auto', 'mr-auto']);
    outerCol.setAttribute('id', 'active-contracts-row');
    let header = createHeaderElement(outerCol, 'h4', 'Active Contracts');
    header.classList.add('border-bottom');
    arr.forEach((contract) => {
      buildContractDomElements(contract);
    });
    console.log("Fuck, yeah")
  }

  function buildContractDomElements(contractObj){
    let info = contractObj;
    let infoRow = createDiv(document.getElementById('active-contracts-row'), ['row', 'margin-top-25']);
    let imgCol = createDiv(infoRow, ['col-2']);
    let infoCol = createDiv(infoRow, ['col-8']);
    let btnCol = createDiv(infoRow, ['col-2']);
    let photo = createImgElement(imgCol, ['img-fluid'], info.photo, info.name);
    let name = createHeaderElement(infoCol, 'h6', info.target_name);
    let listRow = createDiv(infoCol, ['row']);
    let colNL = createDiv(listRow, ['col-6']);
    let ulNL = createListElement(colNL, {Name: info.target_name, Location: info.location});
    let colSC = createDiv(listRow, ['col-6']);
    let ulSC = createListElement(colSC, {Security: info.security, Client: info.client_name});
    let btnComplete = createButtonElement(btnCol, 'button', ['btn', 'btn-warning'], 'Complete', info.id);
    btnComplete.setAttribute('asn-id', localStorage.getItem('id'));
  }

  function createDiv(appendTo, classes) {
    let newDiv = document.createElement('div');
    newDiv.classList.add(...classes);
    appendTo.appendChild(newDiv);
    return newDiv;
  }

  function createImgElement(appendTo, classes, src, alt){
    let newImgElement = document.createElement('img');
    newImgElement.classList.add(...classes);
    newImgElement.setAttribute('src', src);
    newImgElement.setAttribute('alt', alt);
    appendTo.appendChild(newImgElement);
    return newImgElement;
  }

  function createHeaderElement(appendTo, size, text){
    let newH = document.createElement(size);
    newH.innerHTML = text;
    appendTo.appendChild(newH);
    return newH;
  }

  function createListElement(appendTo, liElements){
    let newUl = document.createElement('ul');
    for (let key in liElements) {
      let li = document.createElement('li');
      li.innerHTML = `${key}: ${liElements[key]}`;
      newUl.appendChild(li);
    }
    appendTo.appendChild(newUl);
    return newUl;
  }

  function createLinkElement(appendTo, href, contractId){
    let newLinkElement = document.createElement('a');
    newLinkElement.setAttribute('href', href);
    newLinkElement.setAttribute('contract-id', contractId);
    appendTo.appendChild(newLinkElement);
    return newLinkElement;
  }

  function createButtonElement(appendTo, type, classes, text, id, action){
    let newButtonElement = document.createElement('button');
    newButtonElement.classList.add(...classes);
    newButtonElement.setAttribute('type', type);
    newButtonElement.setAttribute('contract-id', id);
    if (text === "Edit"){
      newButtonElement.setAttribute('data-toggle', 'modal');
      newButtonElement.setAttribute('data-target', '#contracts-modal');
    }
    newButtonElement.innerHTML = text;
    if (action !== undefined) {
      newButtonElement.addEventListener('click', action);
    }
    appendTo.appendChild(newButtonElement);
    return newButtonElement;
  }

})();