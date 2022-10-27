// Start Setting Box 
let settingBox = document.querySelector (".setting-box"),
settingBoxIcon = document.querySelector (".setting-icon");

settingBoxIcon.addEventListener ("click",()=>{
settingBox.classList.toggle ("opened");
document.querySelector (".setting-icon svg").classList.toggle ("fa-spin")
});

let resetSetting = document.querySelector (".reset-options");
resetSetting.addEventListener ("click",()=>{
    localStorage.removeItem ("color-choosen");
    localStorage.removeItem ("backRandom");
    window.location.reload();
})

// Start Color Switching
let colorsList = document.querySelectorAll (".colors-switch li");

if (window.localStorage.getItem("color-choosen")){
    document.documentElement.style.setProperty ("--main-color", window.localStorage.getItem("color-choosen"));
    colorsList.forEach ((ele)=>{
        ele.classList.remove ("active")
        if (window.localStorage.getItem("color-choosen") === ele.dataset.color){
            ele.classList.add ("active")
        }
    })
}
colorsList.forEach ((ele)=>{
    ele.addEventListener ("click",function(e){
        colorsList.forEach((item)=>{
            item.classList.remove ("active")
        })
        e.currentTarget.classList.add ("active");
        let choosenColor = e.currentTarget.dataset.color;
        window.localStorage.setItem ("color-choosen",choosenColor)
        document.documentElement.style.setProperty ("--main-color", window.localStorage.getItem("color-choosen"))
    })
})

// changing Landing Background
let backOptions = document.querySelectorAll (".random-background span");
let randomBackOption = true;
let backgroundInterval;
let landingPage = document.querySelector (".landing"),
landingImgs = ["../images/carousel-1.jpg","../images/carousel-2.jpg","../images/carousel-3.jpg"];
if (window.localStorage.getItem ("backRandom") !== null){
    backOptions.forEach ((ele)=>{
        ele.classList.remove ("active")
    })
    if (window.localStorage.getItem ("backRandom") === "true"){
        randomBackOption = true;
        backOptions[0].classList.add ("active")
    } else {
        randomBackOption = false
        backOptions[1].classList.add ("active")
    }
    
}
backOptions.forEach((span)=>{
    span.addEventListener ("click",function(e){
        backOptions.forEach((opt)=>{
            opt.classList.remove ("active")
        })
        e.currentTarget.classList.add ("active")
        if (e.target.dataset.backrandom === "yes"){
            randomBackOption = true;
            randomBackground();
            window.localStorage.setItem ("backRandom", true)
        } else {
            randomBackOption = false;
            clearInterval (backgroundInterval);
            randomBackOption = false
            window.localStorage.setItem ("backRandom", false)
        }
    })
})
const randomBackground = ()=>{
    if (randomBackOption === true){
        backgroundInterval = setInterval(() => {
            let randomLanding = Math.floor (Math.random() * landingImgs.length);
            landingPage.style.backgroundImage = `url("${landingImgs[randomLanding]}")`
        }, 3000);
    }
};
randomBackground ();


// Navigatin bar 
let myFilters = document.querySelectorAll (".header-links li a");
let myHeader = document.querySelector (".landing-header");

myFilters.forEach(ele => {
    ele.addEventListener ("click",function(e){
        e.preventDefault()
        myFilters.forEach ((item)=>{
            item.classList.remove ("active")
        })
        e.currentTarget.classList.add ("active")
        let id = e.currentTarget.getAttribute("href").slice(1);
        let myEle = document.getElementById(id);
        myEle.scrollIntoView({behavior:"smooth"})
    })
});


let myToggle = document.querySelector (".toggle-icon"),
myHeaderLinks = document.querySelector (".header-links")
myToggle.addEventListener ("click", (e)=>{
    e.stopPropagation()
    myToggle.classList.toggle ("toggle-dec");
    myHeaderLinks.classList.toggle ("opened-nav")
})
document.addEventListener ("click", (e)=>{
    if (e.currentTarget !== myToggle && e.currentTarget !== myHeaderLinks){
        myToggle.classList.remove ("toggle-dec");
        myHeaderLinks.classList.remove ("opened-nav")
    }
})
myHeaderLinks.onclick = (e)=>{
    e.stopPropagation()
}

// Start Our-Skills
let skillSpans = document.querySelectorAll (".skill-rate"),
skillsSection = document.querySelector (".our-skills")

window.onscroll =  ()=>{
    let skillsHeight = skillsSection.offsetHeight,
    skillsOffset = skillsSection.offsetTop,
    windowHeight = window.innerHeight,
    windowScroll = window.pageYOffset;
    if (windowScroll >= (skillsHeight + skillsOffset - windowHeight)){
        skillSpans.forEach ((ele)=>{
            ele.style.width = ele.dataset.rate
        })
    }
}

// Start Our-Gallery
let myImgs = document.querySelectorAll (".our-gallery .gallery-content img")

myImgs.forEach ((image)=>{
    image.addEventListener ("click",(e)=>{
        let pop_overlay = document.createElement ("div");
        pop_overlay.className = "pop-overlay";
        document.body.appendChild (pop_overlay);
        let pop_box = document.createElement ("div");
        pop_box.className = "pop-box";
        
        let imgTitle = document.createElement ("h3");
        imgTitle.className = "img-title";
        imgTitle.textContent = image.alt
        pop_box.appendChild (imgTitle)

        let pop_image = document.createElement ("img");
        pop_image.src = image.src;
        pop_box.appendChild (pop_image)
        pop_overlay.appendChild (pop_box);

        let pop_close = document.createElement ("button");
        pop_close.textContent = "X";
        pop_overlay.appendChild (pop_close);
        pop_close.onclick = function (){
            pop_overlay.remove()
        }
    })
})