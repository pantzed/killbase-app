(function() {
  let contractsJson;

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

  function createNodesForContracts(contractsJson) {
    contractsJson.forEach((e) => {
      let id = e.id
      let targetName = e.target_name;
      let location = e.location;
      let clientName = e.client_name;
      let budget = e.budget;
      let security = e.security;
      let targetImage = e.photo;
      let contractInfoObj = {client: clientName, location: location, budget: budget, security: security};
      let contractExtraObj = {target: targetName, image: targetImage, id: id};
      buildNodes(contractInfoObj, contractExtraObj);
    });
  }

  function buildNodes(infoObj, extraObj) {
    let outerRow = document.createElement('div');
    outerRow.classList.add('row', 'margin-top-50');
    document.getElementById('contracts-card-list').appendChild(outerRow);
    let colImg = createDiv(outerRow, ['col-2']);
    let colInfo = createDiv(outerRow, ['col-7']);
    let colEdit = createDiv(outerRow, ['col-3']);
    let targetImg = createImgElement(colImg, ['img-fluid'], extraObj.image, 'contract image');
    let contractHeader = createHeaderElement(colInfo, 'h4', extraObj.target);
    let infoList = createListElement(colInfo, infoObj);
    let editBtn = createButtonElement(colEdit, 'button', ['btn', 'btn-success'], 'Edit', extraObj.id, callEditPage);
    let deleteBtn = createButtonElement(colEdit, 'button', ['btn', 'btn-danger'], 'Delete', extraObj.id, deleteContract);
    let completeBtn = createButtonElement(colEdit, 'button', ['btn', 'btn-primary'], 'Complete', extraObj.id);
  }

  function fillEditPageWithData(contractData){
    let c = contractData;
    c.forEach((e) => {
      let locationField = document.getElementById('c-location-edit');
      let imgField = document.getElementById('c-img-edit');
      let securityField = document.getElementById('c-security-edit');
      let priceField = document.getElementById('c-price-edit');
      locationField.setAttribute('value', e.location);
      imgField.setAttribute('value', e.photo);
      securityField.setAttribute('value', e.security);
      priceField.setAttribute('value', e.budget);
    });
    fetchClients().then((clientNames) => {
      clientNames.forEach((e) => {
        let selectOpt = document.createElement('option');
        selectOpt.setAttribute('value', e.id);
        selectOpt.innerHTML = e.name;
        document.getElementById('contract-edit-select').appendChild(selectOpt);
      });
    });

    fetchTargets().then((targets) => {
      targets.forEach((e) => {
        let selectOpt = document.createElement('option');
        selectOpt.setAttribute('value', e.id);
        selectOpt.innerHTML = e.name;
        document.getElementById('contract-target-select').appendChild(selectOpt);
      });
    });
  }

  function getContracts() {
    fetch(`/contracts`, {
      method: "GET"
      })
      .then((data) => data.text())
      .then((text) => {
        contractsJson = JSON.parse(text);
        createNodesForContracts(contractsJson);
      })
    }

  getContracts();

  function callEditPage() {
    event.preventDefault();
    let contractId = event.target.getAttribute('contract-id');
    fetch(`/_contract_edit.html`, {
      method: "GET"
      })
      .then((data => data.text()))
      .then((text) => {
        document.getElementById('modal-body').innerHTML = text;
        document.getElementById('edit-contract-form').setAttribute('action', `assassins/${contractId}`);
      })
      .then(() => {
        fetch(`/contracts/${contractId}`, {
        method: "GET"
        })
        .then((data) => data.text())
        .then((text) => {
          contractData = JSON.parse(text);
          fillEditPageWithData(contractData);
      });
    })
  }

  function fetchClients() {
    return fetch(`/clients`, {
      method: "GET"
      })
      .then((data) => data.text())
      .then((text) => {
        let clientNamesObj = JSON.parse(text);
        return clientNamesObj;
      })
  }

  function fetchTargets() {
    return fetch(`/targets`, {
      method: "GET"
      })
      .then((data) => data.text())
      .then((text) => {
        let targetsObj = JSON.parse(text);
        return targetsObj;
      })
  }

  function deleteContract() {
    event.preventDefault();
    let contractId = event.target.getAttribute('contract-id');
    fetch(`/contracts/${contractId}`, {
      method: "DELETE"
      })
      .then(() => {
        getContracts()
      })
  }

})();