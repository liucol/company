/**
 * Created by User on 2018/4/4.
 */
var $back = $(".back"),  //返回
    $addGameSubmit = $(".addGameSubmit span"),
    $addGameInputIcon = $(".addGameInputIcon input");

/*返回*/
$back.on("click",function(){
    window.history.back();
})

/*图片上传*/
$addGameSubmit.on("click",function(){
    var val = $addGameInputIcon.val();
    console.log(val)
})
$("#picture").change(function(){
     var current_pic = this.files[0];
     preview_picture(current_pic);
})
function preview_picture(pic){
   var r = new FileReader();
   r.readAsDataURL(pic);
   r.onload =function(e){
       $(".fileimg").attr("src",this.result).show();
   }
}