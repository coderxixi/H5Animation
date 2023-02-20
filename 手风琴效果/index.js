let  items=document.querySelectorAll('.item');
function setActive(){
  console.log('asdfasfsaf');
  items.forEach((item)=>{
    item.classList.remove('active')
  })
  this.classList.add('active')
}

items.forEach((item)=>{
 
 item.addEventListener('click',setActive)
})