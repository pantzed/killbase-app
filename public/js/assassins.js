(function() {
  let assassinsJson;

  function createNodesForAssassins(assassinsJson) {
    assassinsJson.forEach((element) => {
      let aName = element.name;
      let aCodeName = element.code_name;
      let aAge = element.age;
      let aWeapon = element.weapon;
      let aPrice = element.min_price;
      let aKills = element.kills;
      let aRating = element.rating;
      let aContact = `assassin@gmail.com`;
      let aImg = element.photo;
      let aId = element.id;

      if (aName === 'NULL') {
        aName = `Unknown`;
      }

      if (aCodeName === undefined) {
        aCodeName = `Unknown`;
      }

      let assassinOuterRow = document.createElement('div');
      assassinOuterRow.classList.add('row', 'border-bottom', 'margin-top-25', 'padding-bottom-20');

      let assassinImgDiv = document.createElement('div');
      assassinImgDiv.classList.add('col-2');
      assassinOuterRow.appendChild(assassinImgDiv);

      let assassinImg = document.createElement('img');
      assassinImg.classList.add('img-fluid');
      assassinImg.setAttribute('src', aImg);
      assassinImgDiv.appendChild(assassinImg);

      let assassinInfoDiv = document.createElement('div');
      assassinInfoDiv.classList.add('col-8');
      assassinOuterRow.appendChild(assassinInfoDiv);

      let assassinName = document.createElement('h4');
      assassinName.innerHTML = aName;
      assassinInfoDiv.appendChild(assassinName);

      let codeName = document.createElement('h6');
      codeName.classList.add('font-italic');
      codeName.innerHTML = `Code Name: ${aCodeName}`;
      assassinInfoDiv.appendChild(codeName);

      let assassinInfoRowOne = document.createElement('div');
      assassinInfoRowOne.classList.add('row');
      assassinInfoDiv.appendChild(assassinInfoRowOne);

      let assassinInfoColOne = document.createElement('div');
      assassinInfoColOne.classList.add('col-6');
      assassinInfoRowOne.appendChild(assassinInfoColOne);

      let ratingAndPriceList = document.createElement('ul');
      assassinInfoColOne.appendChild(ratingAndPriceList);
      let rating = document.createElement('li');
      rating.innerHTML = `Rating: ${aRating}`;
      let price = document.createElement('li');
      price.innerHTML = `Price: ${aPrice}`;
      ratingAndPriceList.appendChild(rating);
      ratingAndPriceList.appendChild(price);

      let assassinInfoColTwo = document.createElement('div');
      assassinInfoColTwo.classList.add('col-6');
      assassinInfoRowOne.appendChild(assassinInfoColTwo);

      let killsAndAgeList = document.createElement('ul');
      assassinInfoColTwo.appendChild(killsAndAgeList);
      let kills = document.createElement('li');
      kills.innerHTML = `Kills: ${aKills}`;
      let age = document.createElement('li');
      age.innerHTML = `Age: ${aAge}`;
      killsAndAgeList.appendChild(kills);
      killsAndAgeList.appendChild(age);

      let assassinInfoRowTwo = document.createElement('div');
      assassinInfoRowTwo.classList.add('row');
      assassinInfoDiv.appendChild(assassinInfoRowTwo);


      let col12 = document.createElement('div');
      col12.classList.add('col-12');
      assassinInfoRowTwo.appendChild(col12);

      let ul = document.createElement('ul');
      col12.appendChild(ul);
      let weapon = document.createElement('li');
      weapon.innerHTML = `Weapon: ${aWeapon}`;
      let contact = document.createElement('li');
      contact.innerHTML = `Contact: ${aContact}`;
      ul.appendChild(weapon);
      ul.appendChild(contact);

      let editColumn = document.createElement('div');
      editColumn.classList.add('col-2');
      assassinOuterRow.appendChild(editColumn);

      let editLink = document.createElement('a');
      editLink.setAttribute('href', '#');
      editLink.setAttribute('asn-id', aId);
      editColumn.appendChild(editLink);
      
      let editBtn = document.createElement('button');
      editBtn.classList.add('btn', 'btn-success');
      editBtn.setAttribute('asn-id', aId);
      editBtn.setAttribute('data-toggle', 'modal');
      editBtn.setAttribute('data-target', '#contracts-modal');
      editBtn.textContent = `Edit`;
      editBtn.addEventListener('click', callEditAssassins);
      editLink.appendChild(editBtn);

      let deleteLink = document.createElement('a');
      deleteLink.setAttribute('href', '/edit.html');
      deleteLink.setAttribute('asn-id', aId);
      editColumn.appendChild(deleteLink);

      let deleteBtn = document.createElement('button');
      deleteBtn.classList.add('btn', 'btn-danger');
      deleteBtn.textContent = `Delete`;
      editColumn.appendChild(deleteBtn);

      let profileLink = document.createElement('a');
      profileLink.setAttribute('href', `/assassins/${aId}/assassin_profile.html`);
      profileLink.setAttribute('asn-id', aId);
      profileLink.addEventListener('click', storeId);
      editColumn.appendChild(profileLink);

      let profileBtn = document.createElement('button');
      profileBtn.classList.add('btn', 'btn-primary');
      profileBtn.innerHTML = `Profile`;
      profileLink.appendChild(profileBtn);

      let assassinCardList = document.getElementById('assassin-card-list');
      assassinCardList.appendChild(assassinOuterRow);
    });
  }

  function storeId(){
    event.preventDefault();
    let id = event.currentTarget.getAttribute('asn-id');
    localStorage.setItem('id', id);
    window.location.href = event.currentTarget.getAttribute('href');
  }

  function getAssassins() {
    fetch(`/assassins`, {
      method: "GET"
      })
      .then((data) => data.text())
      .then((text) => {
        assassinsJson = JSON.parse(text);
        createNodesForAssassins(assassinsJson);
      })
    }

  getAssassins();

  // function getAssassinInfo() {
  //   event.preventDefault();
  //   let asnId = event.target.getAttribute('asn-id');
  //   fetch(`/assassins/${asnId}`, {
  //     method: "GET"
  //     })
  //     .then((data) => data.text())
  //     .then((text) => {
  //     })
  // }

  function callEditAssassins() {
    event.preventDefault();
    let asnId = event.target.getAttribute('asn-id');
    fetch(`/_assassins_edit.html`, {
      method: "GET"
      })
      .then((data) => data.text())
      .then((text) => {
        document.getElementById('modal-body').innerHTML = text;
        document.getElementById('edit-assassin-form').setAttribute('action', `assassins/${asnId}/edit`);
        document.getElementById('edit-assassin-form').setAttribute('method', `POST`);
      })
      .then(()=> {
        fetch(`/assassins/${asnId}`)
        .then((data) => data.text())
        .then((text) => {
          assassinData = JSON.parse(text);
          fillAsnEditPage(assassinData);
        });
      });
    }

  function fillAsnEditPage(contractData){
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

})();