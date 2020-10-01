'use strict'
const root = document.getElementById('root');

function createMovieOptions() {
    let container = document.createElement('div');
    container.className = 'select_container';
    root.appendChild(container);

    let selectTitle = document.createElement('p');
    selectTitle.innerText = 'Select your movie ...';
    container.appendChild(selectTitle);

    let select = document.createElement('select');
    container.appendChild(select);
    
    select.addEventListener('change', (event) => {
        if(event.target.value !== 'default') {
            getMovieByTitle(event.target.value)
            .then(res => {
                displayMoviePoster(res);
            })
        }
    } )

    let defaultOption = document.createElement('option');
    defaultOption.value = 'default';
    select.appendChild(defaultOption);

    let firstMovieOption = document.createElement('option');
    firstMovieOption.innerText = 'Fight Club';
    firstMovieOption.value = 'Fight Club';
    select.appendChild(firstMovieOption);

    let secondMovieOption = document.createElement('option');
    secondMovieOption.innerText = 'The Prestige';
    secondMovieOption.value = 'The Prestige';
    select.appendChild(secondMovieOption);

    let thirdMovieOption = document.createElement('option');
    thirdMovieOption.innerText = 'Forrest Gump';
    thirdMovieOption.innerText = 'Forrest Gump';
    select.appendChild(thirdMovieOption);   
}

function displayMoviePoster(movie) {
    const oldMovieInformation = document.getElementById('movie_content');
    if(oldMovieInformation){
        oldMovieInformation.remove();
    }

    let movieContainer = document.createElement('div');
    movieContainer.id = 'movie_content';
    movieContainer.className = 'movie_container';
    root.appendChild(movieContainer);

    let poster = document.createElement('img');
    poster.src = movie.Poster;
    movieContainer.appendChild(poster);

    let title = document.createElement('h2');
    title.innerText = movie.Title;
    movieContainer.appendChild(title);

    let movieInformation = document.createElement('p');
    movieInformation.innerText = movie.Plot;
    movieContainer.appendChild(movieInformation);
}

async function getMovieByTitle(title) {
    const url = `http://www.omdbapi.com/?apikey=93c04b85&t=${title}`;
    try {
        const data = await fetch(url);
        const result = data.json();
        return result;
        
    } catch (err) {
        const error = new Error(err);
        return error;
    }
}

window.onload = createMovieOptions;
