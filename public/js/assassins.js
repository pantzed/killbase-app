(function() {
  let assassinsJson;

  function createNodesForAssassins(assassinsJson) {
    assassinsJson.forEach((element) => {
      console.log(element);
      let aName = element.name;
      let aAge = element.age;
      let aWeapon = element.weapon;
      let aPrice = element.min_price;
      let aKills = element.kills;
      let aRating = element.rating;
      let aContact = `assassin@gmail.com`;
      let aImg = `../images/pickle_rick.jpg`;
      let aId = element.id;

      if (aName === 'NULL') {
        aName = `Unknown`;
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
      editLink.setAttribute('href', '/assassins_profile.html');
      editLink.setAttribute('asn-id', aId);
      editColumn.appendChild(editLink);
      
      let editBtn = document.createElement('button');
      editBtn.classList.add('btn', 'btn-success');
      editBtn.textContent = `Edit`;
      editLink.appendChild(editBtn);

      let deleteLink = document.createElement('a');
      deleteLink.setAttribute('href', '/edit.html');
      deleteLink.setAttribute('asn-id', aId);
      editColumn.appendChild(deleteLink);

      let deleteBtn = document.createElement('button');
      deleteBtn.classList.add('btn', 'btn-danger');
      deleteBtn.textContent = `Delete`;
      deleteLink.appendChild(deleteBtn);

      let assassinCardList = document.getElementById('assassin-card-list');
      assassinCardList.appendChild(assassinOuterRow);
    });
  }

  function getAssassins() {
    fetch(`http://localhost:8000/assassins`, {
      method: "GET"
      })
      .then((data) => data.text())
      .then((text) => {
        assassinsJson = JSON.parse(text);
        createNodesForAssassins(assassinsJson);
      })
    }

  getAssassins();

})();