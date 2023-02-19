const calendarGrid = 42;
let date = new Date();
//判断日期是否为润年
function isLeap(year) {
  return (year % 4 == 0 && year % 100 !== 0) || year % 100 === 0
}
//获取月份 有几天
function getDays(year, month) {
  const feb = isLeap(year) ? 29 : 28;
  const daysperMonth = [31, feb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  return daysperMonth[month]
}
//获取下个月。上个月有多少天
function getNextMonthOrLastMonthDays(date, type) {
  const month = date.getMonth();
  const year = date.getYear();
  if (type == "last") {
    const lastMonth = month === 0 ? 11 : month - 1;
    const lastYear = lastMonth === 11 ? year - 1 : year;
    return {
      lastMonth,
      lastYear,
      days: getDays(lastYear, lastMonth)
    }
  }
  const nextMonth=month===11?0:month+1;
  const nextYear=nextMonth==0?year+1:year;

  return{
    year:nextYear,
    month:nextMonth,
    days:getDays(nextYear,nextMonth)
  }
}
//核心函数，生成日历数据

 function generateCalendar(date){
  const currentyear=date.getFullYear();
  const currentMonth=date.getMonth();
  //当月天数
  const days=getDays(currentyear,currentMonth);
  //获取上个月末尾的天数/和下个开头的天数
  const {days:lastMonthDays,year:lastYear,month:lastMonth}=getNextMonthOrLastMonthDays(date,"last");
  const {year:nextMonthYear,month:nextMonth}=getNextMonthOrLastMonthDays(date,"next");
  //1号是星期几
  const weekIndex=new Date(`${currentyear},${currentMonth}+1`,1).getDay();
  //显示在当月末尾下月的天数
  const trailDays=calendarGrid-weekIndex-days;
  let trailVal=0;
  const calendarTable=[];
  for(let i=0;i<calendarGrid;i++){
    //补充上个月的天数
    if(i<weekIndex){
      calendarTable[i]={
        year:lastMonthYear,
        month:lastMonth,
        day:lastMonthDays-weekIndex+i+1,
        isCurrentMonth:false
      }
    }else if(i>=days+weekIndex){
      //补充下个月的天数
      if(trailVal<trailDays){
        trailVal=+1
      }
     calendarTable[i]={
      year:nextMonthYear,
      month:nextMonth,
      day:trailVal,
      isCurrentMonth:false
     }
    }
  
  }
    //填补本月
    for(let d=1;d<=days;d++){
      calendarTable[d]={
       year:currentyear,
       month:currentMonth,
       day:d,
       isCurrentMonth:true
      }
   }
  return calendarTable
 }

 //添加几个工具函数
 function addClassNames(doNode,ClassNames){
  ClassNames.split(' ').forEach(c=>{
    c&&doNode.classList.add(c)
  })
 }
 function removeClassNames(doNode,ClassNames){
  ClassNames.split(' ').forEach(c=>{
    c&&doNode.classList.remove(c)
  })
 }

 //重点 渲染

function renderCalender(date=new Date(),create=false){

  const calendarData=generateCalendar(date);
  const today=new Date();
  const content=document.getElementById('content');
  if(create){
    const fragment=document.createDocumentFragment();
    calendarData.forEach(item=>{
      const li=document.createElement("li");
      const div=document.createElement('div');
      const isActive=[
        item.day===today.getDay(),
        item.month=today.getMonth(),
        item.year=today.getFullYear(),
        item.isCurrentMonth,
      ].every(Boolean);
      const liClass=`date flex-center ${isActive?'active':''} ${item.isCurrentMonth?'':'light'}`;
      addClassNames(li,liClass);
      addClassNames(div,'date-num flex-center');
      div,innerText=item.day;
      li.appendChild(div);
      fragment.appendChild(li)
    });
    content.appendChild(fragment)
  }else{
  
  }
}




 

 window.onload=function(){
  renderCalender(date,true)
   console.log( generateCalendar(new Date));
 }
