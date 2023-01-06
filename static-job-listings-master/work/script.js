const wrapper = document.querySelector('.card-wrapper');


fetch('./data.json')
.then((response) => response.json())
.then(function (json) {
for (let index = 0; index < json.length; index++) {

    console.log(json[index]);
    const card = document.createElement('div');
    const centerlized = document.createElement('div');
    const LeftCardContainer = document.createElement('div');
    const RightCardContainer = document.createElement('div');
    const logo = document.createElement('img');
    const companyContent = document.createElement('div');
    const topCardContainer = document.createElement('div');
    const tagContainer = document.createElement('div');
    const company = document.createElement('span');
    const roundedTag = document.createElement('div');
    if (json[index].new == true) {
            const New = document.createElement('span');
    }
    if (json[index.featured == true]) {
        const featured = document.createElement('span');
    }

    
}


});