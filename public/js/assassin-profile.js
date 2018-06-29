(function() {

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
    let liClient = document.createElement('li');
    liClient.innerHTML = `Client: ${liElements.client}`;
    newUl.appendChild(liClient);
    let liLocation = document.createElement('li');
    liLocation.innerHTML = `Location: ${liElements.location}`;
    newUl.appendChild(liLocation);
    let liBudget = document.createElement('li');
    liBudget.innerHTML = `Budget: ${liElements.budget}`;
    newUl.appendChild(liBudget);
    let liSecurity = document.createElement('li');
    liSecurity.innerHTML = `Security: ${liElements.security}`;
    newUl.appendChild(liSecurity);
    appendTo.appendChild(newUl);
    return newUl;
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

  function buildNodes(infoObj, extraObj) {
    // let outerRow = document.createElement('div');
    // outerRow.classList.add('row', 'margin-top-50');
    // document.getElementById('contracts-card-list').appendChild(outerRow);
    // let colImg = createDiv(outerRow, ['col-2']);
    // let colInfo = createDiv(outerRow, ['col-7']);
    // let colEdit = createDiv(outerRow, ['col-3']);
    // let targetImg = createImgElement(colImg, ['img-fluid'], extraObj.image, 'contract image');
    // let contractHeader = createHeaderElement(colInfo, 'h4', extraObj.target);
    // let infoList = createListElement(colInfo, infoObj);
    // // let editLink = createLinkElement(colEdit, `/contracts/${extraObj.id}/edit.html`, extraObj.id);
    // // let deleteLink = createLinkElement(colEdit, `/contracts/${extraObj.id}/delete`, extraObj.id);
    // // let completeLink = createLinkElement(colEdit, `/contracts/${extraObj.id}/complete`, extraObj.id);
    // let editBtn = createButtonElement(colEdit, 'button', ['btn', 'btn-success'], 'Edit', extraObj.id, callEditPage);
    // let deleteBtn = createButtonElement(colEdit, 'button', ['btn', 'btn-danger'], 'Delete', extraObj.id, deleteContract);
    // let completeBtn = createButtonElement(colEdit, 'button', ['btn', 'btn-primary'], 'Complete', extraObj.id);
  // }

  // function createNodesForContracts(contractsJson) {
  //   contractsJson.forEach((e) => {
  //     let id = e.id
  //     let targetName = e.target_name;
  //     let location = e.location;
  //     let clientName = e.client_name;
  //     let budget = e.budget;
  //     let security = e.security;
  //     let targetImage = e.photo;
  //     let contractInfoObj = {client: clientName, location: location, budget: budget, security: security};
  //     let contractExtraObj = {target: targetName, image: targetImage, id: id};
  //     buildNodes(contractInfoObj, contractExtraObj);
  //   });
  // }

  

  function getAssassin() {
    
    fetch(`http://localhost:8000/assassin/`, {
      method: "GET"
      })
      .then((data) => data.text())
      .then((text) => {
        contractsJson = JSON.parse(text);
        createNodesForContracts(contractsJson);
      })
    }

  getContracts();

  // function callEditPage() {
  //   event.preventDefault();
  //   let contractId = event.target.getAttribute('contract-id');
  //   fetch(`http://localhost:8000/_contract_edit.html`, {
  //     method: "GET"
  //     })
  //     .then((data => data.text()))
  //     .then((text) => {
  //       document.getElementById('modal-body').innerHTML = text;
  //       document.getElementById('edit-contract-form').setAttribute('action', `assassins/${contractId}`);
  //     })
  //     .then(() => {
  //       fetch(`http://localhost:8000/contracts/${contractId}`, {
  //       method: "GET"
  //       })
  //       .then((data) => data.text())
  //       .then((text) => {
  //         contractData = JSON.parse(text);
  //         fillEditPageWithData(contractData);
  //         // document.getElementById('edit-contract-submit').addEventListener('click', reloadContractsList());
  //     });
  //   })
  // }

})();