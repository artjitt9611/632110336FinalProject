var searchByNameClick = document.getElementById('searchByName')
var output = document.getElementById('outputForsearch')
var output2 = document.getElementById('outputForMyfavorite')
var B = document.getElementById('carouselExampleIndicators')
var id = 632110336
var myFavorite = document.getElementById('MyMovie')
var mySearch = document.getElementById('SearchBox')
var DetailMovie = document.getElementById('DetailMovie')
var DetailBox = document.getElementById('DetailBox')
var tab = document.getElementById('tab')
var banner = document.getElementById('mylistBanner')
var about = document.getElementById('aboutbox')

function Onload() {
    DetailBox.style.display = 'none'
    myFavorite.style.display = 'none'
    mySearch.style.display = 'none'
    banner.style.display = 'none'
    about.style.display = 'none'
  
  
  
   
}

function HidAll(){
    DetailBox.style.display = 'none'
    myFavorite.style.display = 'none'
    mySearch.style.display = 'none'
    banner.style.display = 'none'
}


document.getElementById('2').addEventListener('click', () => {
    myFavorite.style.display = 'block'
    myFavorite.style.display = 'none'
    mySearch.style.display = 'none'
    tab.style.display ='block'
    B.style.display = 'block'
    banner.style.display = 'none'
    about.style.display = 'none'
    
})


document.getElementById('about').addEventListener('click', () => {
    myFavorite.style.display = 'none'
    mySearch.style.display = 'none'
    tab.style.display ='none'
    B.style.display = 'none'
    banner.style.display = 'none'
    about.style.display = 'block'
    DetailBox.style.display = 'none'
})

document.getElementById('1').addEventListener('click', () => {
    ShowMyList()
    myFavorite.style.display = 'block'
    banner.style.display = 'block'
    B.style.display = 'block'
    mySearch.style.display = 'none'
    DetailBox.style.display = 'none'
    tab.style.display ='none'
    about.style.display = 'none'
})



function addMovieList(MovieList) {
    document.getElementById('outputForsearch').innerHTML = ''
    for (movie of MovieList) {
        AddToTable(movie)

    }
}


function ShowMyList(MovieList) {
    fetch(`https://se104-project-backend.du.r.appspot.com/movies/632110336`)
        .then((response) => {
            return response.json()
        }).then(data => {
            console.log(data)
            addMovieMyList(data)
        })
}


function addMovieMyList(MovieList) {
    document.getElementById('outputForMyfavorite').innerHTML = ''
    for (movie of MovieList) {
        AddToTableMyList(movie)

    }
}

searchByNameClick.addEventListener('click', () => {
    mySearch.style.display = 'block'
    myFavorite.style.display = 'none'
    tab.style.display ='block'
    B.style.display = 'block'
    banner.style.display = 'none'
    about.style.display = 'none'
    let name = document.getElementById('InputNameMovie').value
    console.log(name)
    fetch(`https://api.jikan.moe/v3/search/anime?q=${name}`)
        .then(response => {
            return response.json()
        }).then(movie => {
            addMovieList(movie.results)

        })

})


function addMovieToMyDB(movie) {
    fetch('https://se104-project-backend.du.r.appspot.com/movies', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movie)
    }).then((response) => {
        if (response.status === 200) {
            return response.json()
        } else {
            throw Error(response.statusText)
        }
    }).then(data => {
        alert(`ทำรายการสำเร็จ `)
        console.log(data)
        ShowMyList(data)
    })
}



function AddToTable(movie) {
    let col = document.createElement('div')
    col.setAttribute("class", "col-md-4 ")
    let CardFeild = document.createElement('div')
    CardFeild.setAttribute("class", "card flex-md-row mb-4 box-shadow h-md-250")
    let img = document.createElement('img')
    img.setAttribute('class', 'card-img-right flex-auto d-none d-md-block w-auto')
    img.setAttribute('src',movie.image_url)
    img.setAttribute('style','height: auto')
    img.classList.add('card-img-top')
    let CardBody = document.createElement('div')
    CardBody.setAttribute('class', 'card-body d-flex flex-column align-items-start')
    let CardName = document.createElement('h6')
    CardName.classList.add('mb-0')
    CardName.innerHTML = `${movie.title}`
    let date = document.createElement('div')
    date.classList.add('mb-1')
    date.classList.add('text-muted')
    let des = document.createElement('p')
    des.setAttribute('style', 'font-size: 0.5rem')
    des.classList.add('card-text') 
    des.classList.add('mb-auto') 
    des.innerHTML=`${movie.synopsis}`
    let button = document.createElement('button')
    button.setAttribute('type', 'button')
    button.setAttribute('id', 'addmovie')
    button.innerText = 'Add to My FavoriteList'
    button.classList.add('btn')
    button.classList.add('btn-success')
    button.addEventListener('dblclick', function () {

        let con = confirm(`ท่านต้องการเพิ่ม  ${movie.title} ไปในรายการอนิเมะที่ชื่นชอบหรือไม่ `)
        if (con == true) {

            console.log(id, movie)
            movies = { id, movie }

            console.log(movies)

            addMovieToMyDB(movies)


        } else {

        }
    })

    col.appendChild(CardFeild)
    CardFeild.appendChild(img)
    CardFeild.appendChild(CardBody)
    CardBody.appendChild(CardName)
    CardBody.appendChild(date)
    CardBody.appendChild(des)
    CardBody.appendChild(button)

    output.appendChild(col)





}

function AddToTableMyList(movies) {
    let col = document.createElement('div')
    col.setAttribute("class", "col ")
    let cardfeild = document.createElement('div')
    cardfeild.setAttribute("style", "width: 19rem;")
    cardfeild.classList.add('card')
    cardfeild.classList.add('text-center')
    col.appendChild(cardfeild)
    let img = document.createElement('img')
    img.setAttribute('src', movies.image_url)
    img.setAttribute('height',"400px")
    img.setAttribute('alt', 'Card image cap')
    img.classList.add('card-img-top')
    let CardBody = document.createElement('div')
    CardBody.classList.add('card-body')
    let CardName = document.createElement('h6')
    CardName.classList.add('card-title')
    CardName.innerHTML = `${movies.title}`
    let button = document.createElement('button')
    button.setAttribute('type', 'button')
    button.setAttribute('id', 'DetailMovie')
    button.innerText = 'Detail'
    button.classList.add('btn')
    button.classList.add('mx-1')
    button.classList.add('btn-outline-primary')
    button.addEventListener('click', function () {
        let id = movies.id
        console.log(id)
        fetch(`https://se104-project-backend.du.r.appspot.com/movie/632110336/${id}`)
            .then(response => {
                return response.json()
            }).then(movie => {
                addMovieDetail(movie)
                myFavorite.style.display = 'none'
                DetailBox.style.display = 'block'
                tab.style.display ='none'
                B.style.display = 'none'
                 about.style.display = 'none'


            })
    })

    let buttondelete = document.createElement('button')
    buttondelete.setAttribute('type', 'button')
    buttondelete.setAttribute('id', 'Delete')
    buttondelete.innerText = 'Delete'
    buttondelete.classList.add('btn')
    buttondelete.classList.add('btn-outline-danger')
    buttondelete.classList.add('mx-1')
    buttondelete.addEventListener('click', function () {
        let con = confirm(`ท่านต้องการลบ  ${movies.title} ออกจากรายการอนิเมะที่ชื่นชอบ หรือไม่`)
        if (con == true) {
            DeleteMovie(movies.id)
        } else {

        }

    })



    cardfeild.appendChild(img)
    cardfeild.appendChild(CardBody)
    CardBody.appendChild(CardName)
    CardBody.appendChild(button)
    CardBody.appendChild(buttondelete)

    output2.appendChild(col)


}


function DeleteMovie(id) {
    fetch(`https://se104-project-backend.du.r.appspot.com/movie?id=632110336&&movieId=${id}`, {
        method: 'DELETE'
    }).then((response) => {
        if (response.status === 200) {
            return response.json()
        } else {
            throw Error(response.statusText)
        }
    }).then(data => {
        alert(`${data.title} is delete now`)
        ShowMyList()

    }).catch(() => {
        alert('erorr ไอ้ควาย')

    })
}


function addMovieDetail(movie) {
    let image = document.getElementById('image')
    image.setAttribute('src', movie.image_url)
    let title = document.getElementById('title')
    title.innerText = movie.title
    let sysnopis = document.getElementById('sysnopis')
    sysnopis.innerText = movie.synopsis
    let Type = document.getElementById('Type')
    Type.innerText = movie.type
    let EP = document.getElementById('EP')
    EP.innerText = movie.episodes
    let ss = document.getElementById('Score')
    ss.innerText = movie.score
    let Rate = document.getElementById('Rate')
    Rate.innerText = movie.rated




}



