const myVideo = document.getElementById('vid');
const btnPlay = document.getElementById('btnPlay');
const btnPause = document.getElementById('btnPause');
const btnStop = document.getElementById('btnStop');
const btnNext = document.getElementById('btnNext')
const btnPrev = document.getElementById('btnPrev');
const timeOut = document.getElementById('timeOut');
const vidNumOut = document.getElementById('vidNum');
const container = document.getElementById('container');
const Header = document.getElementById('header');
let timer = null;

btnPlay.addEventListener('click',playVideo);
btnPause.addEventListener('click',pauseVideo);
btnStop.addEventListener('click',stopVideo);
btnNext.addEventListener('click',nextVideo);
btnPrev.addEventListener('click',prevVideo);
myVideo.addEventListener('ended',vidEnded);
window.onload = playVideo;





//Vids
  const vids = [""];//Put the filename and filetype(mp3 or mp4) in the quotation marks
  const title = [""]//Put the tracktitle in the quotation marks
  let vidPlaying = 0;
  vidNumOut.innerHTML = (vidPlaying) + "/" + vids.length;

  function playVideo(){
      myVideo.play();
      Header.innerHTML = title[vidPlaying];
      timer = setInterval(update, 100);
      console.log("Playing Video...");
  }

  function pauseVideo(){
      myVideo.pause();
      console.log("Pausing Video...")
  }

  function stopVideo(){
      myVideo.pause();
      myVideo.currentTime = 0;
      console.log("Stopped Video...")
  }

  function update(){
      timeOut.innerHTML = "Zeit: " + myTime(myVideo.currentTime) + "/" + myTime(myVideo.duration);
  }

  function vidEnded(){
      clearInterval(timer);
      timeOut.innerHTML = "Timer: 0";
      nextVideo();
      playVideo();
  }

  function nextVideo(){
      if(vidPlaying < vids.length-1){
          vidPlaying += 1;
      } else {
          vidPlaying = 0;
      }
      myVideo.src = "vid/" + vids[vidPlaying];//change "vid/" with the path to the folder where your vids and audios are 
      vidNumOut.innerHTML = (vidPlaying+1) + "/" + vids.length;
      Header.innerHTML = title[vidPlaying];
      console.log("Next Video...");
      playVideo();
  }

  function prevVideo(){
      if(vidPlaying > 0){
          vidPlaying -= 1;
      } else {
          vidPlaying = vids.length-1;
      }
      myVideo.src = "vid/" + vids[vidPlaying];//change "vid/" with the path to the folder where your vids and audios are 
      vidNumOut.innerHTML = (vidPlaying+1) + "/" + vids.length;
      Header.innerHTML = title[vidPlaying];
      console.log("Previous Video...")
      playVideo();
  }


  var elem = document.documentElement;
  function openFullscreen() {
    if (btnExp.requestFullscreen) {
      container.requestFullscreen();
    } else if (btnExp.mozRequestFullScreen) { /* Firefox */
      container.mozRequestFullScreen();
    } else if (btnExp.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
      container.webkitRequestFullscreen();
    } else if (btnExp.msRequestFullscreen) { /* IE/Edge */
      container.msRequestFullscreen();
    }
    btnExp.style.display = "none";
    btnCmp.style.display = "unset";
    container.classList.add("fullscreen");
  }

  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    btnExp.style.display = "unset";
    btnCmp.style.display = "none";
    container.classList.remove("fullscreen");
  }

  function myTime(time){
    var hr = ~~(time / 3600);
    var min = ~~((time % 3600) / 60);
    var sec = time % 60;
    var sec_min = "";
    if (hr > 0){
        sec_min += "" + hrs + ":" + (min < 10 ? "0" : "");
    }
    sec_min += "" + min + ":" + (sec < 10 ? "0" : "");
    sec_min += "" + Math.round(sec);
    return sec_min;
}