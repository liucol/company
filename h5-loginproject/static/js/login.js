/**
 * Created by User on 2018/3/21.
 */
/*选择器*/
var $usernamedelete = $("#username .delete"),  //用户名input里面的叉叉
    $passowrddelete = $("#password .delete"),   //密码input里面的叉叉
    $usernameinput = $("#usernameinput"),  //用户名input
    $passowrdinput = $("#passowrdinput"),   //密码input
    $errorinfo = $("#errorinfo"),  //错误提示信息
    $loginbutton = $("#loginbutton"); //登录按钮

//清空用户名input输入框
$usernamedelete.on("click",function(){
    $usernameinput.val("");
})

//清空密码input输入框
$passowrddelete.on("click",function(){
    $passowrdinput.val("");
})

//点击登录
$loginbutton.on("click",function(){
    var usernameval = $usernameinput.val(),   //用户名
        passwordval = $passowrdinput.val();    //密码

    //匹配6到20位数字
    var regpwd = /^\d{6,20}$/;

    //匹配对错值
    var pwdrels = regpwd.test(passwordval);

    if(!usernameval){
        $errorinfo.html("用户名/邮箱不能为空");
    }else{
        if(!passwordval){
            $errorinfo.html("密码不能为空");
        }else if(!pwdrels){
            $errorinfo.html("密码长度6到20位");
        }
    }

    //全部填写正确
    if(usernameval&&passwordval&&pwdrels){
        //清空错误提示
        $errorinfo.html("");
        console.log("调用登录接口");
    }
})