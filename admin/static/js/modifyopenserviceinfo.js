/**
 * Created by User on 2018/4/8.
 */
var $back = $(".back"),  //返回
    $openServiceTime = $("#openServiceTime"),  //开服时间
    $starttime = $("#starttime"), //有效期开始时间
    $endtime = $("#endtime");  //有效期结束时间

/*返回*/
$back.on("click",function(){
    window.history.back();
})

/*日期选择*/
$openServiceTime.datetimepicker({
    format: "yyyy-mm-dd hh:ii:ss",
    autoclose: true,
    todayBtn: true,
    todayHighlight: true,
    showMeridian: true,
    pickerPosition: "bottom-left",
    language: 'zh-CN',//中文，需要引用zh-CN.js包
    startView: 4,//0、1、2、3、4，对应分、时、日、月、年
    minView: 0,//日期时间选择器所能够提供的最精确的时间选择视图 0~4 分别对应分、时、日、月、年
    minuteStep:1
});
setTime($starttime);
setTime($endtime);
function setTime(dom){
    dom.datetimepicker({
        format: "yyyy-mm-dd",
        autoclose: true,
        todayBtn: true,
        todayHighlight: true,
        showMeridian: true,
        pickerPosition: "bottom-left",
        language: 'zh-CN',//中文，需要引用zh-CN.js包
        startView: 4,//0、1、2、3、4，对应分、时、日、月、年
        minView: 2//日期时间选择器所能够提供的最精确的时间选择视图 0~4 分别对应分、时、日、月、年
    });
}