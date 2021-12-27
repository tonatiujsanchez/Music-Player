// Song data
const songList = [
    {
        id: 1,
        title: "Acoustic Breeze",
        file: "acousticbreeze.mp3",
        cover: "cat-1.jpg"

    },
    {
        id: 2,
        title: "A New Beginning",
        file: "anewbeginning.mp3",
        cover: "cat-2.jpg"
    },
    {
        id: 3,
        title: "Creative Minds",
        file: "creativeminds.mp3",
        cover: "cat-3.jpg"
    },
];


// Capturar elementos de DOM
const songs = document.getElementById('sogs');
const cover = document.getElementById('cover');
const audio = document.getElementById('audio');
const title = document.getElementById('title');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');

const btnPlay = document.getElementById('btn-play');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');

// Eventos de los controles
btnPlay.addEventListener( 'click', playOrPause );
btnPrev.addEventListener( 'click', prevSong );
btnNext.addEventListener( 'click', nextSong );

audio.addEventListener('timeupdate', updateProgress);
// Reproducir siguente canción cuando termine una.
audio.addEventListener('ended', nextSong);
progressContainer.addEventListener( 'click', setProgress);


let actualSongId = null;
let actualSongIndex = null;
let isPlaying = false;

// Mostrar el listado de canciones
function loadSogs() {
    songList.forEach( song =>{
        // Crear li
        const li = document.createElement('li');
              li.classList.add('sogs__item');

        // Crear a
        const link = document.createElement('a');
              link.classList.add('sogs__link');
              link.href = '#';
              link.id = song.id;

        // Hidrater a
        link.textContent = song.title;

        // Escuchar clicks del link
        link.addEventListener( 'click', () => loadSong( song ) )

        // añadir link a li
        li.appendChild(link);

        // añadir li a ul
        songs.appendChild(li);
    });

    
}

// Cargar canción selecionada
function loadSong( song ) {
    if( actualSongId !== song.id ){

        // Estableser el song actual
        actualSongId = song.id;
    
        // Cambiar título
        title.innerText = song.title;
    
        // Agregar imagen
        cover.src = `./img/${ song.cover }`;
    
        // Agregar path y reproducir audio
        audio.src = `./audio/${ song.file }`;
        audio.play();
    
        // Add clas active
        changeActiveClass(song);

        isPlaying = true;
        togglePlay();
    }
}

// Agregar la clase 'active' a la canción selecionada
function changeActiveClass(song) {
    const links = document.querySelectorAll('.sogs__link');

    links.forEach( (link, idx) =>{
        link.classList.remove('active');
        if( Number(link.id) === song.id ){
            link.classList.add('active');
            actualSongIndex = idx;
        }
    });

}

// Pausar o Reproducir canción
function playOrPause() {
    if( actualSongId !== null ){
        isPlaying = !isPlaying;
        togglePlay();
    }else{
        loadSong( songList[0] );
    }
}
// Actualizar Icono del control de Play
function togglePlay() {
    if( isPlaying ){
        btnPlay.classList.remove('fa-play');
        btnPlay.classList.add('fa-pause');
        audio.play();
    }else{
        btnPlay.classList.remove('fa-pause');
        btnPlay.classList.add('fa-play');
        audio.pause();
    }
}

// Canción Siguiente
function nextSong() {
    if( (actualSongIndex < songList.length -1 ) && actualSongIndex !== null){
        loadSong( songList[actualSongIndex + 1] );
    }else{
        loadSong( songList[0]  );
    }
}
// Canción Anterior
function prevSong() {
    if( (actualSongIndex > 0) && actualSongIndex !== null ){
        loadSong( songList[actualSongIndex - 1] );
    }else{
        loadSong( songList[ songList.length - 1 ] );
    }
}

// Actualizar barra de progreso de la canción
function updateProgress( $event ) {
    let { currentTime, duration  } = $event.srcElement;
    let porcentProgress = (currentTime / duration) * 100;
    
    progress.style.width = `${ porcentProgress }%`;

}

// Hecer clicleable la barra de progreso
function setProgress($event) {
    if( actualSongId !== null ){
        const progressWidthTotal = this.offsetWidth; 
        const progressWidth = $event.offsetX;
    
        const porcentProgress = (progressWidth / progressWidthTotal ) * audio.duration;
        audio.currentTime = porcentProgress;
    }
}


// GO
loadSogs();
