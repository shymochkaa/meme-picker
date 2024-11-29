import { catsData } from '/data.js'

const emotionOptions = document.getElementById('emotion-options')

const getImageBtn = document.getElementById('get-image-btn')
const gifsOnlyOption = document.getElementById('gifs-only-option')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')


// event listeners
getImageBtn.addEventListener('click', renderCat)
memeModalCloseBtn.addEventListener('click', closeModal)

// close when clicking outside the modal)
window.addEventListener("click", function(e){
    if (memeModal.style.display === 'flex' && !memeModal.contains(e.target) && !getImageBtn.contains(e.target)) {
        closeModal()
    }
})


// close the modal, same as in the original 
function closeModal() {
    memeModal.style.display = 'none'
   
}

// render the cat meme (same as in the original)

function renderCat(){
  
    const selectedCats = getUpToThreeCatObjects()

    let html = ``

    for(let i = 0; i < selectedCats.length; i ++) {
        html += 
        
        `<div class="thumbnail thumbnail-${selectedCats.length} ">
            <img 
            class="cat-img" 
            src="./images/${selectedCats[i].image}"
            alt="${selectedCats[i].alt}"
            >
        </div>`
    }


    memeModalInner.innerHTML =  html
    memeModal.style.display = 'flex'
   

}

// get one object that matches the users criteria from the MatchingCatsArray (same as in the original)

function getUpToThreeCatObjects() {
    const catsArray = getMatchingCatsArray()
    
    let threeCats = []

    if (catsArray.length <= 3) {
        return catsArray
    } else {
        
        while (threeCats.length < 3) {

            let randomPic = catsArray[Math.floor(Math.random() * catsArray.length)]
            
            if (!threeCats.includes(randomPic)) {
                threeCats.push(randomPic)
            }
        }
        
        return threeCats
    }
}


// return an array that matches the users criteria (a little bit different from the original version)

function getMatchingCatsArray(){     
            
        const isGif = gifsOnlyOption.checked
        
        const matchingCatsArray = catsData.filter(function(cat){
            
            if(isGif){
                return cat.emotionTags.includes(emotionOptions.value) && cat.isGif
            }
            else{
                return cat.emotionTags.includes(emotionOptions.value)
            }            
        })
        return matchingCatsArray 
    
}



// get an array with emotions (same as in original version)

function getEmotionsArray(cats){
    const emotionsArray = []    
    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            if (!emotionsArray.includes(emotion)){
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}


//render the options (dropdown menu)

function renderEmotionsOptions(cats){
        
    let optionItems = ``
    const emotions = getEmotionsArray(cats)
    for (let emotion of emotions){
        optionItems += `<option value="${emotion}">${emotion}</option>`
    
    }
    emotionOptions.innerHTML += optionItems
}

renderEmotionsOptions(catsData)



