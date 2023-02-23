const inpFile=document.querySelector('input[type="file"]');
const img=document.querySelector('.preview');
const btn=document.querySelector('.btn');
const uplod=document.querySelector('.uplod');
inpFile.onchange=(e)=>{
  const file=e.target.files[0];
  const reader=new FileReader();

  reader.onload=function(e){
    img.src=e.target.result
    //实现裁剪
  

  }
  reader.readAsDataURL(file)
}

btn.onclick=function(){
  //拿到裁剪后的file对象
  const cutInfo={
   x:500,
   y:500,
   cutWidth:300,
   cutHeight:300,
   width:100,
   height:100
  }
  const canvas=document.createElement('canvas');
  canvas.width=cutInfo.width;
  canvas.height=cutInfo.height;
  const ctx=canvas.getContext('2d');
  ctx.drawImage(img,cutInfo.x,cutInfo.y,cutInfo.cutWidth,cutInfo.cutHeight,0,0,cutInfo.width,cutInfo.height);
  canvas.toBlob((blob)=>{
   const file= new File([blob],'avatar.jpg',{
      type:'image/jpeg',
    });
    //进行图片上传逻辑
    console.log('file',file);
   
  })
  document.body.appendChild(canvas)

}

//裁切逻辑
function cropImg(options) {
  this.target = document.getElementById(options.target) || document;
  this.width = 0;
  this.height = 0;
  this.container_width = 0;
  this.container_height = 0;
  this.mouse_index = 0;
  this.callback = options.callback || function () {};
  this.fun_list = []; //所有绑定的事件存储起来,插件销毁时解绑
  this.init();
}

uplod.onclick=function(){
  inpFile.click()
}





