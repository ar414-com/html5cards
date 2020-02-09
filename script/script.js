CUR_PAGE = 1;
flag = 0;
maxPage = 3;
var startX, startY, moveEndX, moveEndY, X, Y;
window.onload = function(){
    var music = document.getElementById("music");
    var music_play = document.getElementById("music_play");
    music.onclick = function(){
        var classs = music_play.getAttribute('class');
        if(classs === "first_play")
        {
            music_play.setAttribute('class','first_no_play');
            setTimeout(function(){
                music.style.animationPlayState = "paused";
                document.getElementById("audio1").pause();
            },1000);
        }
        else
        {
            music_play.setAttribute('class','first_play');
            music.setAttribute('class',"play");
            setTimeout(function(){
                document.getElementById("audio1").play();
                music.style.animationPlayState = "running";
            },1000);
        }
    };
    document.getElementById("page1").onclick = function(){
        music.click();
        goAfterPage(1,setCountDown);
    };
};

function moveTouchstart(e) {
    e.preventDefault();
    startX = e.touches[0].pageX;
    startY = e.touches[0].pageY;
}
function moveTouchmove(e){
    if(flag==1){
        return;
    }
    flag = 1;
    e.preventDefault();
    moveEndX = e.changedTouches[0].pageX;
    moveEndY = e.changedTouches[0].pageY;
    X = moveEndX - startX;
    Y = moveEndY - startY;
}
function moveTouchend(e){
    console.log(Y)
    if ( Math.abs(Y) > Math.abs(X) && Y > 0) {
        goBeforePage();
    }

    else if ( Math.abs(Y) > Math.abs(X) && Y < 0 ) {
        goAfterPage(CUR_PAGE);
    }
    setTimeout(function(){
        flag = 0;
    },500);
}

function setTouchMove(page){
    document.getElementById(page).addEventListener('touchstart', moveTouchstart, false);
    document.getElementById(page).addEventListener('touchmove', moveTouchmove,false);
    document.getElementById(page).addEventListener('touchend', moveTouchend,false);
}
function unsetTouchMove(page){
    document.getElementById(page).removeEventListener('touchstart', moveTouchstart, false);
    document.getElementById(page).removeEventListener('touchmove', moveTouchmove,false);
    document.getElementById(page).removeEventListener('touchend', moveTouchend,false);
}

function goToPage3(){
    goAfterPage(2);
}

function countdown(){
    var time = document.getElementById("countdown").innerText;
    time --;
    document.getElementById("countdown").innerText = time;
    if(time <= 0){
        document.getElementById("countdown").onclick = goToPage3;
        document.getElementById("countdown").innerText='Go';
        goAfterPage(2);
        clearInterval(timer);
        return;
    }
}

function setCountDown(){
    unsetTouchMove("page2");
    var tops = document.getElementsByClassName('top');
    tops[0].style.display = "none";
    document.getElementById("countdown").innerText='5';
    timer = setInterval("countdown()",1000);
}

function goAfterPage(pageNum,callback) {
    if(CUR_PAGE == maxPage){
        return;
    }
    var afterPage = document.getElementById("page"+(pageNum+1));
    var curPage   = document.getElementById("page"+pageNum);
    if(pageNum === 1){
        afterPage.style.top = "100%";
        afterPage.style.display = "block";
        curPage.style.top = "0%";
        curPage.setAttribute("class","page"+pageNum+" fadeOut");
        setTimeout(function(){
            callback && callback();
            afterPage.setAttribute("class","page"+(pageNum+1)+" fadeOut");
        },1);
    }else {
        afterPage.style.top = "100%";
        afterPage.style.display = "block";
        curPage.style.top = "0%";
        curPage.setAttribute("class","page"+pageNum+" fadeOut");
        setTimeout(function(){
            page3.setAttribute("class","page"+(pageNum+1)+" fadeOut");
        },100);
    }
    CUR_PAGE = pageNum+1;
    if(CUR_PAGE == maxPage){
        var tops = document.getElementsByClassName('top');
        for(var i = 0;i<tops.length;++i){
            tops[i].style.display = "block";
            tops[i].onclick = goBeforePage;
        }
        unsetTouchMove('page2');
        unsetTouchMove('page3');
        setTouchMove('page2');
        setTouchMove('page3');
    }
}

function goBeforePage(){
    if(CUR_PAGE === 1){return;}
    var curPage   = CUR_PAGE;
    var afterPage = CUR_PAGE-1;
    var afterPage = document.getElementById("page"+(afterPage));
    var curPage   = document.getElementById("page"+curPage);
    curPage.style.top = "200%";
    afterPage.style.top = "100%";
    CUR_PAGE = CUR_PAGE-1;
}
