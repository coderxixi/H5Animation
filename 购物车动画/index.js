const car=document.querySelector('.gouwuche');
const btn=document.querySelector('.btn');

btn.onclick=function(){
  const div=document.createElement('div');
  div.className='jiahao';
  div.innerHTML=`
       <i class="iconfont icon-jiahao1" ></i>
  `;
  const btnRect=btn.getBoundingClientRect();
  const carReaact=car.getBoundingClientRect();
  const left=btnRect.left+btnRect.width/2-30/2;
  const top=btnRect.top-30;
  const x=carReaact.left+carReaact.width/2-15-left;
  const y=carReaact.top-30-top;
  div.style.setProperty('--left',`${left}px`);
  div.style.setProperty('--top',`${top}px`);
  div.style.setProperty('--x',`${x}px`);
  div.style.setProperty('--y',`${y}px`);
  div.addEventListener('animationend',()=>{
    div.remove()
  })
  document.body.appendChild(div)
}