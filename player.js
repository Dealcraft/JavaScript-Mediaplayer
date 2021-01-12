//INITIATION
    //References
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
        const navBurger = document.getElementById('nav-burger');
        const HTMLtitle = document.querySelector('title');
        let timer = null;
    //EventListener
        btnPlay.addEventListener('click',playVideo);
        btnPause.addEventListener('click',pauseVideo);
        btnStop.addEventListener('click',stopVideo);
        btnNext.addEventListener('click',nextVideo);
        btnPrev.addEventListener('click',prevVideo);
        myVideo.addEventListener('ended',vidEnded);
        navBurger.addEventListener('click',toggleNav);
    //Vids
        const vids = [""];//Put the filename and filetype(mp3 or mp4) in the quotation marks
        const title = [""];//Put the title in the quotation marks
        let vidPlaying = 0;
        vidNumOut.innerHTML = (vidPlaying+1) + "/" + vids.length;
    //UrlParams
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        if(urlParams.has('v')){
            var v = urlParams.get('v')
            playVideo(parseInt(v))
        }
        if(urlParams.has('list')){
            var list = urlParams.get('list')
            console.log(list);
        }
    //Other
        init()
        var toggle = false;

//VIDFunctions
    //replayControl
        function playVideo(v){
            if(typeof v == "number"){
                vidPlaying = v
                if(v >= vids.length){
                    v = 0
                    console.log(v)
                }
                vidPlaying = v
                console.log(v)
                vidNumOut.innerHTML = (vidPlaying+1) + "/" + vids.length;
                myVideo.src = "vid/" + vids[v];
            }
            Header.innerHTML = title[vidPlaying];
            myVideo.play();
            timer = setInterval(update, 100);
            console.log("Playing Video...");
            HTMLtitle.innerHTML = '"' + title[vidPlaying] + '" spielt auf JS Mediaplayer'
        }

        function pauseVideo(){
            myVideo.pause();
            console.log("Pausing Video...")
            HTMLtitle.innerHTML = '"' + title[vidPlaying] + '" angehalten auf JS Mediaplayer'
        }

        function stopVideo(){
            myVideo.pause();
            myVideo.currentTime = 0;
            console.log("Stopped Video...")
            HTMLtitle.innerHTML = 'JS Mediaplayer'
        }

        function update(){
            timeOut.innerHTML = "Zeit: " + myTime(myVideo.currentTime) + "/" + myTime(myVideo.duration);
            if(document.getElementById(vidPlaying).classList.contains('highlight')){}
            else {
                $('p').removeClass('highlight')
                console.log("remove highlight")
                $('#' + vidPlaying.toString()).addClass("highlight")
            }
        }

        function vidEnded(){
            clearInterval(timer);
            timeOut.innerHTML = "NaN";
            nextVideo();
            playVideo();
        }
    //skipControl
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
    //fullscreenControl
        function openFullscreen() {
            btnExp.style.display = "none";
            btnCmp.style.display = "unset";
            navBurger.style.display = "none";
            container.classList.add("fullscreen");
        }

        function closeFullscreen() {
            btnExp.style.display = "unset";
            btnCmp.style.display = "none";
            navBurger.style.display = "unset"; 
            container.classList.remove("fullscreen");
        }
    //functionallyDependentFunctions
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
        function toggleNav(){
            $('#nav').toggle(300)
            if(toggle == false){
                container.style.borderTopRightRadius = "0"
                container.style.borderBottomRightRadius = "0"
                toggle = true;
            } else {
                container.style.borderTopRightRadius = "25px"
                container.style.borderBottomRightRadius = "25px"
                toggle = false;
            }            
        }
        function init(){
            //Start init
            console.info("Start initiation...")
            //Hide Nav
            $('#nav').hide()
            //Prepare Nav
            for(var i = 0; i < title.length; i++){
                $('#nav').append('<p onclick="playVideo('+ i +')" style="cursor: pointer;" id="'+ i +'">' + title[i] + '</p><hr>')
            }
            //Prepare Videosource
            vidNumOut.innerHTML = (vidPlaying+1) + "/" + vids.length;
            myVideo.src = "vid/" + vids[vidPlaying];//change "vid/" with the path to the folder where your vids and audios are 
            Header.innerHTML = title[vidPlaying];
            timeOut.innerHTML = "Zeit: " + myTime(myVideo.currentTime) + "/" + myTime(myVideo.duration)
            //End init
            console.info("Ended initiation...")
        }