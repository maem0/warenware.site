
const songs = [
  {
    name: 'OkayMikeg',
    artist: 'Mike G',
    src: 'songs/okmikeg.mp3',
    albumArt: 'songs/ali.jpg'
  },
    {
      name: 'Ah Beng Techno Rap',
      artist: 'Singapore',
      src: 'songs/ah beng.mp3',
      albumArt: 'songs/salakau.jpeg'
    },

  ];
  
  
  let currentSongIndex = 0;
  let isPlaying = false;
  
  const songDiv1 = document.getElementById('songDiv1');
  const playPauseButton1 = document.getElementById('playPauseButton1');
  
  const expandedPlayer = document.getElementById('expandedPlayer');
  const albumArtLarge = document.getElementById('albumArtLarge');
  const songNameLarge = document.getElementById('songNameLarge');
  const artistNameLarge = document.getElementById('artistNameLarge');
  const playPauseButtonLarge = document.getElementById('playPauseButtonLarge');
  const closeButton = document.getElementById('closeButton');
  const prevButton = document.getElementById('prevButton');
  const nextButton = document.getElementById('nextButton');
  const seekBar = document.getElementById('seekBar');
  
  const audio = new Audio();
  
  function updateSongDetails(index) {
    const song = songs[index];
    document.getElementById('songName1').textContent = song.name;
    document.getElementById('artistName1').textContent = song.artist;
    document.getElementById('albumArt1').style.backgroundImage = `url(${song.albumArt})`;
  
    albumArtLarge.style.backgroundImage = `url(${song.albumArt})`;
    songNameLarge.textContent = song.name;
    artistNameLarge.textContent = song.artist;
  
    audio.src = song.src;
  }
  
  function togglePlayPause() {
    if (isPlaying) {
      audio.pause();
      setPlayButton(); 
    } else {
      audio.play();
      setPauseButton();
    }
    isPlaying = !isPlaying;
  }
  
  function setPlayButton() {
    playPauseButton1.style.backgroundImage = "url('img/play.svg')";
    playPauseButtonLarge.style.backgroundImage = "url('img/play.svg')";
  }
  
  function setPauseButton() {
    playPauseButton1.style.backgroundImage = "url('img/pause.svg')";
    playPauseButtonLarge.style.backgroundImage = "url('img/pause.svg')";
  }

  audio.addEventListener('timeupdate', () => {
    seekBar.value = (audio.currentTime / audio.duration) * 100;
  });
  
  seekBar.addEventListener('input', () => {
    audio.currentTime = (seekBar.value / 100) * audio.duration;
  });

  function playPrevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    updateSongDetails(currentSongIndex);
    if (isPlaying) audio.play();
  }
  
  function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    updateSongDetails(currentSongIndex);
    if (isPlaying) audio.play();
  }
  
  function openSidebarPlayer() {
    updateSongDetails(currentSongIndex);
    expandedPlayer.classList.add('show');
  }

  function closeSidebarPlayer() {
    expandedPlayer.classList.remove('show');
  }

  window.addEventListener('load', () => {
    updateSongDetails(currentSongIndex);
  });
  
  songDiv1.addEventListener('click', openSidebarPlayer);
  playPauseButton1.addEventListener('click', (e) => {
    e.stopPropagation();
    togglePlayPause();
  });
  playPauseButtonLarge.addEventListener('click', togglePlayPause);
  closeButton.addEventListener('click', closeSidebarPlayer);
  prevButton.addEventListener('click', playPrevSong);
  nextButton.addEventListener('click', playNextSong);