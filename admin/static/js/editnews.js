/**
 * Created by User on 2018/4/9.
 */
var $back = $(".back"),  //返回
    $public = $(".public");  //发表

$back.on("click",function(){
    window.history.back();
})

/*富文本编辑器*/
var E = window.wangEditor,
    editor = new E('#editor');
// 或者 var editor = new E( document.getElementById('editor') )

/*使用base64保存图片*/
editor.customConfig.uploadImgShowBase64 = true;
/*关闭粘贴样式的过滤*/
editor.customConfig.pasteFilterStyle = false
editor.create();

$public.on("click",function(){
      var newsContent = editor.txt.html();
      console.log("发表的新闻内容")
      console.log(newsContent)
})


