
let boxList=document.querySelector('.list');
function cloneFirstItem(){
  //克隆最后一个元素
const firstItem=boxList.children[boxList.children.length-1]
const newItem=firstItem.cloneNode(true);
boxList.appendChild(newItem)

}

cloneFirstItem()
//滚动

let duration=1000;
setInterval(moveNext,duration);
let itmeHeigh=40; //每一项的高度
let current=0; //当前运行的第几项

function moveNext(){
    let from=itmeHeigh*current //开始的滚动高度；
      current++;
    let to=current*itmeHeigh; //下一项的滚动高度

    let totalDuration=300 //变化的总时间
    let duration=20;//变化的间隔时间
    let times=totalDuration/duration;// 变化的次数
  let dis=(to-from)/times; // 每次变化的偏移量
   let timesId= setInterval(()=>{
     from+=dis;
    if(from>=to){
      clearInterval(timesId);
      if(current>=boxList.children.length-1){
        from=0;
        current=0;
      }
    }
   
    boxList.scrollTop=from;
  },duration)

   
}