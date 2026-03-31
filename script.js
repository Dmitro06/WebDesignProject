
const mainImage = document.getElementById("mainImage")
const thumbs = document.querySelectorAll(".thumb")
const prev = document.querySelector(".prev")
const next = document.querySelector(".next")

let index = 0

function showImage(i){
  index = i
  mainImage.src = thumbs[i].src

  thumbs.forEach(t => t.classList.remove("active"))
  thumbs[i].classList.add("active")
}

thumbs.forEach((thumb,i)=>{
  thumb.addEventListener("click",()=>showImage(i))
})

next.addEventListener("click",()=>{
  index++
  if(index >= thumbs.length) index = 0
  showImage(index)
})

prev.addEventListener("click",()=>{
  index--
  if(index < 0) index = thumbs.length - 1
  showImage(index)
})

