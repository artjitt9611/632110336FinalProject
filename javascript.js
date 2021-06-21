var searchByNameClick = document.getElementById('searchByName')
var output = document.getElementById('outputForsearch')
var output2 = document.getElementById('outputForMyfavorite')
var id = 632110336
var myFavorite = document.getElementById('MyMovie')
var mySearch = document.getElementById('SearchBox')
var DetailMovie = document.getElementById('DetailMovie')


document.getElementById('2').addEventListener('click',() => {
    myFavorite.style.display = 'none'
    mySearch.style.display = 'none'
    DetailMovie.style.display = 'none'
})

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
    CardName.innerHTML = `${movies.title} ${movies.id}`
    let button = document.createElement('button')
    button.setAttribute('type','button')
    button.setAttribute('id','DetailMovie')
    button.innerText = 'Detail'
    button.classList.add('btn')
    button.classList.add('btn-success')
    button.addEventListener('click', function(){
        let id = movies.id
        console.log(id)
            fetch(`https://se104-project-backend.du.r.appspot.com/movie/632110336/${id}`)
            .then(response => {
                return response.json()
            }).then(movie =>{
                addMovieDetail(movie)
                myFavorite.style.display = 'none'
                
            })
    })

    let buttondelete = document.createElement('button')
    buttondelete.setAttribute('type','button')
    buttondelete.setAttribute('id','Delete')
    buttondelete.innerText = 'Delete'
    buttondelete.classList.add('btn')
    buttondelete.classList.add('btn-danger')
    buttondelete.classList.add('mx-5')
    buttondelete.addEventListener('click',function(){
        let con = confirm(`ท่านต้องการลบ  ${movies.title} จริงๆหรือไม่`)
        if(con == true){
            DeleteMovie(movies.id)
        }else{

        }
       
    })

    

    cardfeild.appendChild(img)
    cardfeild.appendChild(CardBody)
    CardBody.appendChild(CardName)
    CardBody.appendChild(button)
    CardBody.appendChild(buttondelete)

    output2.appendChild(col)


}


function DeleteMovie(id){
    fetch(`https://se104-project-backend.du.r.appspot.com/movie?id=632110336&&movieId=${id}`,{
        method: 'DELETE'
    }).then((response) => {
        if(response.status === 200){
            return response.json()
        }else{
            throw Error(response.statusText)
        }
    }).then(data => {
        alert(`Movie name ${data.title} is delete now`)
        ShowMyList()
    
    }).catch( () => {
        alert('erorr ไอ้ควาย')

    })
}

    
    function addMovieDetail(movie){
        let image = document.getElementById('image')
        image.setAttribute('src',movie.image_url)
        let title = document.getElementById('title')
        title.innerText = movie.title
        let sysnopis = document.getElementById('sysnopis')
        sysnopis.innerText = movie.synopsis
        let Type = document.getElementById('Type')
        Type.innerText = movie.type
        let EP = document.getElementById('EP')
        EP.innerText = movie.episodes
        let Rate = document.getElementById('Rate')
        Rate.innerText = movie.rated

        
      
    
    }
    