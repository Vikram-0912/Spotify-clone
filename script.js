 document.addEventListener('DOMContentLoaded', function() {
            // Initialize variables
            let songIndex = 0;
            let isPlaying = false;
            let isShuffle = false;
            let isRepeat = false;
            let audioElement = new Audio();
            let currentSong = null;
            
            // DOM elements
            const masterPlay = document.getElementById('masterPlay');
            const myProgressBar = document.getElementById('myProgressBar');
            const gif = document.getElementById('gif');
            const masterSongName = document.getElementById('masterSongName');
            const songItemContainer = document.getElementById('songItemContainer');
            const currentTimeElement = document.getElementById('currentTime');
            const durationElement = document.getElementById('duration');
            const volumeSlider = document.getElementById('volumeSlider');
            const shuffleBtn = document.getElementById('shuffle');
            const repeatBtn = document.getElementById('repeat');
            
            // Songs data
            const songs = [
                {
                    songName: "Blinding Lights",
                    artist: "The Weeknd",
                    filePath: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                    coverPath: "https://i.scdn.co/image/ab67616d00004851c08d11dfab8eb39db7b6a1a2",
                    duration: "3:20"
                },
                {
                    songName: "Save Your Tears",
                    artist: "The Weeknd",
                    filePath: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
                    coverPath: "https://i.scdn.co/image/ab67616d00004851c08d11dfab8eb39db7b6a1a2",
                    duration: "3:35"
                },
                {
                    songName: "Stay",
                    artist: "The Kid LAROI, Justin Bieber",
                    filePath: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
                    coverPath: "https://i.scdn.co/image/ab67616d00004851c08d11dfab8eb39db7b6a1a2",
                    duration: "2:21"
                },
                {
                    songName: "good 4 u",
                    artist: "Olivia Rodrigo",
                    filePath: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
                    coverPath: "https://i.scdn.co/image/ab67616d00004851c08d11dfab8eb39db7b6a1a2",
                    duration: "2:58"
                },
                {
                    songName: "Levitating",
                    artist: "Dua Lipa",
                    filePath: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
                    coverPath: "https://i.scdn.co/image/ab67616d00004851c08d11dfab8eb39db7b6a1a2",
                    duration: "3:23"
                },
                {
                    songName: "Montero",
                    artist: "Lil Nas X",
                    filePath: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
                    coverPath: "https://i.scdn.co/image/ab67616d00004851c08d11dfab8eb39db7b6a1a2",
                    duration: "2:17"
                },
                {
                    songName: "Peaches",
                    artist: "Justin Bieber",
                    filePath: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
                    coverPath: "https://i.scdn.co/image/ab67616d00004851c08d11dfab8eb39db7b6a1a2",
                    duration: "3:18"
                },
                {
                    songName: "Kiss Me More",
                    artist: "Doja Cat ft. SZA",
                    filePath: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
                    coverPath: "https://i.scdn.co/image/ab67616d00004851c08d11dfab8eb39db7b6a1a2",
                    duration: "3:28"
                }
            ];
            
            // Render songs
            function renderSongs() {
                songItemContainer.innerHTML = '';
                songs.forEach((song, index) => {
                    const songItem = document.createElement('div');
                    songItem.className = 'songItem';
                    songItem.innerHTML = `
                        <img src="${song.coverPath}" alt="${song.songName}">
                        <span class="songName">${song.songName}</span>
                        <span class="songlistplay">
                            <span class="timestamp">${song.duration}
                                <i id="${index}" class="far songItemPlay fa-play-circle"></i>
                            </span>
                        </span>
                    `;
                    songItem.addEventListener('click', () => playSong(index));
                    songItemContainer.appendChild(songItem);
                });
            }
            
            // Format time (seconds to MM:SS)
            function formatTime(seconds) {
                const minutes = Math.floor(seconds / 60);
                const secs = Math.floor(seconds % 60);
                return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
            }
            
            // Play a specific song
            function playSong(index) {
                songIndex = index;
                currentSong = songs[songIndex];
                
                // Update UI
                masterSongName.textContent = currentSong.songName;
                document.querySelector('.artist-name').textContent = currentSong.artist;
                gif.src = currentSong.coverPath;
                
                // Update active song in list
                document.querySelectorAll('.songItem').forEach(item => {
                    item.classList.remove('active');
                });
                document.querySelectorAll('.songItem')[songIndex].classList.add('active');
                
                // Load and play audio
                audioElement.src = currentSong.filePath;
                audioElement.play()
                    .then(() => {
                        isPlaying = true;
                        masterPlay.classList.remove('fa-play-circle');
                        masterPlay.classList.add('fa-pause-circle');
                        masterPlay.classList.add('playing');
                    })
                    .catch(error => {
                        console.error('Playback failed:', error);
                    });
                
                // Update duration
                audioElement.addEventListener('loadedmetadata', () => {
                    durationElement.textContent = formatTime(audioElement.duration);
                });
            }
            
            // Toggle play/pause
            function togglePlay() {
                if (isPlaying) {
                    audioElement.pause();
                    masterPlay.classList.remove('fa-pause-circle');
                    masterPlay.classList.add('fa-play-circle');
                    masterPlay.classList.remove('playing');
                } else {
                    if (!currentSong) {
                        playSong(0);
                    } else {
                        audioElement.play();
                        masterPlay.classList.remove('fa-play-circle');
                        masterPlay.classList.add('fa-pause-circle');
                        masterPlay.classList.add('playing');
                    }
                }
                isPlaying = !isPlaying;
            }
            
            // Update progress bar
            function updateProgress() {
                if (audioElement.duration) {
                    const progress = (audioElement.currentTime / audioElement.duration) * 100;
                    myProgressBar.value = progress;
                    currentTimeElement.textContent = formatTime(audioElement.currentTime);
                }
            }
            
            // Seek in song
            function seekSong() {
                const seekTime = (myProgressBar.value / 100) * audioElement.duration;
                audioElement.currentTime = seekTime;
            }
            
            // Next song
            function nextSong() {
                if (isShuffle) {
                    songIndex = Math.floor(Math.random() * songs.length);
                } else {
                    songIndex = (songIndex + 1) % songs.length;
                }
                playSong(songIndex);
            }
            
            // Previous song
            function prevSong() {
                if (audioElement.currentTime > 3) {
                    // If more than 3 seconds into song, restart it
                    audioElement.currentTime = 0;
                } else {
                    // Otherwise go to previous song
                    songIndex = (songIndex - 1 + songs.length) % songs.length;
                    playSong(songIndex);
                }
            }
            
            // Set volume
            function setVolume() {
                audioElement.volume = volumeSlider.value / 100;
            }
            
            // Toggle shuffle
            function toggleShuffle() {
                isShuffle = !isShuffle;
                shuffleBtn.style.color = isShuffle ? 'var(--primary-color)' : 'var(--text-secondary)';
            }
            
            // Toggle repeat
            function toggleRepeat() {
                isRepeat = !isRepeat;
                repeatBtn.style.color = isRepeat ? 'var(--primary-color)' : 'var(--text-secondary)';
                audioElement.loop = isRepeat;
            }
            
            // Event listeners
            masterPlay.addEventListener('click', togglePlay);
            myProgressBar.addEventListener('input', seekSong);
            document.getElementById('next').addEventListener('click', nextSong);
            document.getElementById('previous').addEventListener('click', prevSong);
            volumeSlider.addEventListener('input', setVolume);
            shuffleBtn.addEventListener('click', toggleShuffle);
            repeatBtn.addEventListener('click', toggleRepeat);
            
            // Audio events
            audioElement.addEventListener('timeupdate', updateProgress);
            audioElement.addEventListener('ended', () => {
                if (!isRepeat) {
                    nextSong();
                }
            });
            
            // Initialize
            renderSongs();
            setVolume(); // Set initial volume
        });
