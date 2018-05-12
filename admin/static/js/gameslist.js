/**
 * Created by User on 2018/4/4.
 */
    /*$('#dataTables-example').dataTable();*/

    /*选择器*/
    var $deleteButton = $(".deleteButton"), //删除按钮
        $deleteSureBtn = $(".deleteSureBtn");  //确定删除

    /*删除游戏*/
    $deleteButton.on("click",function () {
         var gameid = $(this).attr("data-gameId");
         console.log("游戏id")
         console.log(gameid)
        $deleteSureBtn.attr("data-gameId",gameid);
     })
    $deleteSureBtn.on("click",function(){
         var gameid = $deleteSureBtn.attr("data-gameId");
         $.ajax({
         url: "",
         type: "get",
         data: {},
         dataType: "json",
         success: function(ret){},
         error: function(){}
         })
        //关闭模态框
         $('#deleteButtonModal').modal('hide');
     })

    /*分页*/



