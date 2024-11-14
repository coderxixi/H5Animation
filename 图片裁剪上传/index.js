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
let cutInfo={
  x:500,
  y:500,
  cutWidth:300,
  cutHeight:300,
  width:100,
  height:100
 }
new cropImg({
  target: 'box',
  callback({left,top,width,height,container_height,container_width,}) {

 cutInfo={
  x:left,
  y:top,
  cutWidth:container_width,
  cutHeight:container_height,
  width:width,
  height:height
}
   console.log(left,top,width,height,container_height,container_width);
  },
});

btn.onclick=function(){
  //拿到裁剪后的file对象
 
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



uplod.onclick=function(){
  inpFile.click()
}









