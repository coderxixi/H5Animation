// 要操作的元素
const input=document.querySelector('.ipt-hidden');
const items=document.querySelectorAll('.ipt-item');

// 正则表达式：6位 0-9
const reg=/^[0-9]{0,6}$/;
// 临时存储输入的值
let temp_val='';

// 输入框获得焦点事件
input.addEventListener('focus',()=>{
    // 光标移到最后
    input.setSelectionRange(input.value.length-1,input.value.length);
    const val=input.value;
    if(!val){
        // 未输入时，默认第一格为激活态
        items[0].classList.add('active');
        return;
    }
    // 判断哪一个格子需要设置激活态样式
    if(val.length<items.length){
        items[val.length].classList.add('active');
    }
    // 最后一格
    if(val.length==items.length){
        items[val.length-1].classList.add('active');
    }
});
// 输入框失去焦点事件
input.addEventListener('blur',()=>{
    // 移除激活态样式
    items.forEach(item=>{
        item.classList.remove('active');
    })
});
// 输入框输入事件
input.addEventListener('input',(e)=>{
    // 先清空文本并移除激活态样式
    items.forEach(item=>{
        item.textContent='';
        item.classList.remove('active');
    })
    // 获取输入的值
    const val=e.target.value;
    // 正则验证
    if(reg.test(val)){
        temp_val=val;
    }else{
        input.value=temp_val;
    }
    // 将输入的值拆分为数组
    const arr=input.value.split('');
    if(!arr.length){
        // 没输入，默认第一格为激活态
        items[0].classList.add('active');
    }
    // 循环设置每一格的文本和样式
    arr.forEach((item,index)=>{
        items[index].textContent=item;
        items[index].classList.remove('active');
        if(items[index+1]){
            items[index+1].classList.add('active');
        }
        if(index==items.length-1){
            items[index].classList.add('active');
        }
    })

    console.log('temp_val',temp_val);
});

