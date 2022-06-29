//let fetch = require('node-fetch')



let key = 'UnCRmLvkx86ZdzSWs3zT2H3MqIf5eDv3';
let img = document.getElementById('img');
let button = document.getElementById('butt');
let form = document.getElementById('form');
let input = document.getElementById('input');
let row = document.querySelector('.row');
let searchValue;


form.addEventListener('submit', (e) => {

    e.preventDefault();
    console.log('this is the value :' + input.value);

    searchValue = input.value;
    searchForGif();

})

getRandomGif();



function getRandomGif() {

    fetch(' http://api.giphy.com/v1/gifs/random?api_key=UnCRmLvkx86ZdzSWs3zT2H3MqIf5eDv3').then(res => {
        return res.json();
    }).then((json) => {
        console.log(json)
        img.src = json.data.images.original.url;

    })
}


async function searchForGif() {

    //searchValue = form.value
    row.textContent=''
    let response = await fetch(`http://api.giphy.com/v1/gifs/search?q=${searchValue}&api_key=UnCRmLvkx86ZdzSWs3zT2H3MqIf5eDv3&limit=10`);
    let json = await response.json();
    console.log(json.data);

    let num = Math.random() * 9
    num = num.toFixed();
    let dataObject = json.data[num];
    console.log(dataObject.images.original.url);

    img.src = dataObject.images.original.url;

    for(let i=0;i<json.data.length;i++){
        if (i==num) continue
        let newImg= document.createElement('img');
        newImg.className = 'row-image'
        newImg.src = json.data[i].images.original.url
        row.append(newImg);
    }

    input.value = '';
    if (document.querySelector('.row').children.length >9) {
        for (let index = 0; index < 9; index++) {
            document.querySelector('.row').removeChild(document.querySelector('.row').firstChild);
            
        }
        
    }

    //
}