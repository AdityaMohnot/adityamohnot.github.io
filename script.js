setTimeout(() => {
    document.getElementById('span2').classList.add('animate1')
    document.getElementById('span2').classList.remove('hidden')
}, 1000)

setTimeout(() => {
    document.getElementById('span3').classList.add('animate1')
    document.getElementById('span3').classList.remove('hidden')
}, 2000)

setTimeout(() => {
    document.getElementById('span4').classList.add('animate1')
    document.getElementById('span4').classList.remove('hidden')
}, 3000)

setTimeout(() => {
    document.getElementById('anipara').classList.add('animate1')
    document.getElementById('anipara').classList.remove('hidden')
}, 4000)

const photos = [
    'asa-not-code/d2.png', 
    'asa-not-code/d3.jpg',
    'asa-not-code/d4.jpg',
    'asa-not-code/d5.jpg',
    'asa-not-code/d6.jpg',
    'asa-not-code/d7.jpg',
    'asa-not-code/d1.jpg',
    'asa-not-code/d8.jpg',
    'asa-not-code/d9.jpg',
    'asa-not-code/d10.jpg',
    'asa-not-code/d11.jpg',
]

function shuffler(list){
    let newList = []
    while(!(newList.length==list.length)){
        const randItem = list[Math.floor(Math.random()*list.length)]
        if(!newList.includes(randItem)){
            newList.push(randItem)
        }
    }
    return newList
}

let newPhotos = shuffler(photos)

const imwi = 0

newPhotos.forEach((photo) => {
    const addimg = document.createElement('img')
    addimg.src = photo
    addimg.classList.add('imgs')
    let sec = document.querySelector('.section2')
    sec.appendChild(addimg)
})


const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry)=> {
        if (entry.isIntersecting){
            entry.target.classList.add('show')
        } else {
            entry.target.classList.remove('show')
        }
    })
})

const hiddenElements = document.querySelectorAll('.imgs')
hiddenElements.forEach((el)=> observer.observe(el))

const images = document.querySelectorAll(".imgs");

images.forEach((image) => {
    image.addEventListener("click", () => {
      window.open(image.src, "_blank");
    });
})
