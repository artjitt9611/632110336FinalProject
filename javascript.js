var searchByNameClick = document.getElementById('searchByName')
var output = document.getElementById('outputForsearch')
var output2 = document.getElementById('outputForMyfavorite')
var id = 632110336
var myFavorite = document.getElementById('MyMovie')
var mySearch = document.getElementById('SearchBox')


document.getElementById('1').addEventListener('click',() => {
    myFavorite.style.display = 'block'
mySearch.style.display = 'none'
ShowMyList()
})


function addMovieList(MovieList){
    document.getElementById('outputForsearch').innerHTML = ''
    for(movie of MovieList){
        AddToTable(movie)

    }
}


function ShowMyList(MovieList){
    fetch(`https://se104-project-backend.du.r.appspot.com/movies/632110336`)
        .then((response) => {
            return response.json()
        }).then(data => {
            console.log(data)
             addMovieMyList(data)
        })
    }

   
function addMovieMyList(MovieList){
    document.getElementById('outputForMyfavorite').innerHTML = ''
    for(movie of MovieList){
       AddToTableMyList(movie)

    }
}

searchByNameClick.addEventListener('click',()=>{
    mySearch.style.display = 'block'
    myFavorite.style.display = 'none'
    let name = document.getElementById('InputNameMovie').value
    console.log(name)
        fetch(`https://api.jikan.moe/v3/search/anime?q=${name}`)
        .then(response => {
            return response.json()
        }).then(movie =>{
           addMovieList(movie.results)
         
        })
    
    })


    function addMovieToMyDB(movie)
{
    fetch('https://se104-project-backend.du.r.appspot.com/movies',{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(movie)
    }).then((response) => {
        if(response.status === 200){
            return response.json()
        }else{
            throw Error(response.statusText)
        }
    }).then(data => {
        console.log(data)
        ShowMyList(data)
    })
}



function AddToTable(movie){
    let col = document.createElement('div')
    col.setAttribute("class","col") 
    let cardfeild = document.createElement('div')
    cardfeild.setAttribute("style","width: 20rem;")
    cardfeild.classList.add('card')
    col.appendChild(cardfeild)
    let img = document.createElement('img')
    img.setAttribute('src',movie.image_url)
    img.setAttribute('alt','Card image cap')
    img.classList.add('card-img-top')
    let CardBody = document.createElement('div')
    CardBody.classList.add('card-body')
    let CardName = document.createElement('h5')
    CardName.classList.add('card-title')
    CardName.innerHTML = `${movie.title} ${movie.mal_id}`
    let button = document.createElement('button')
    button.setAttribute('type','button')
    button.setAttribute('id','addmovie')
    button.innerText = 'ADD'
    button.classList.add('btn')
    button.classList.add('btn-success')
    button.addEventListener('click',function(){

        let con = confirm(`ท่านต้องการเพิ่ม  ${movie.title} ไปในรายการหนังที่ชื่นชอบหรือไม่ `)
        if(con == true){
        
           console.log(id,movie)
           movies ={id,movie}

           console.log(movies)

           addMovieToMyDB(movies)
        
           
        }else{

        }
    })
    cardfeild.appendChild(img)
    cardfeild.appendChild(CardBody)
    CardBody.appendChild(CardName)
    CardBody.appendChild(button)

    output.appendChild(col)


}

function AddToTableMyList(movies){
    let col = document.createElement('div')
    col.setAttribute("class","col") 
    let cardfeild = document.createElement('div')
    cardfeild.setAttribute("style","width: 20rem;")
    cardfeild.classList.add('card')
    col.appendChild(cardfeild)
    let img = document.createElement('img')
    img.setAttribute('src',movies.image_url)
    img.setAttribute('alt','Card image cap')
    img.classList.add('card-img-top')
    let CardBody = document.createElement('div')
    CardBody.classList.add('card-body')
    let CardName = document.createElement('h5')
    CardName.classList.add('card-title')
    CardName.innerHTML = `${movies.title} ${movies.mal_id}`
    let button = document.createElement('button')
    button.setAttribute('type','button')
    button.setAttribute('id','addmovie')
    button.innerText = 'Detail'
    button.classList.add('btn')
    button.classList.add('btn-success')

    let buttondelete = document.createElement('button')
    buttondelete.setAttribute('type','button')
    buttondelete.setAttribute('id','Delete')
    buttondelete.innerText = 'Delete'
    buttondelete.classList.add('btn')
    buttondelete.classList.add('btn-danger')
    buttondelete.classList.add('mx-5')


    cardfeild.appendChild(img)
    cardfeild.appendChild(CardBody)
    CardBody.appendChild(CardName)
    CardBody.appendChild(button)
    CardBody.appendChild(buttondelete)

    output2.appendChild(col)


}