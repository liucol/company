/**
 * Created by User on 2018/3/21.
 */
/*选择器*/
var $protocol = $(".protocol"),  //同意协议
    $usernameinput = $("#username input"),  //用户名输入框
    $passwordinput = $("#password input"),  //密码输入框
    $usernamedelete = $("#username .delete"),  //用户名的叉叉
    $passworddelete = $("#password .delete"),  //密码的叉叉
    $errorinfo = $("#errorinfo"),  //错误提示信息
    $registerbutton = $("#register-button input");   //注册按钮

//正则表达式
var regpwd = /^\d{6,20}$/;

//同意协议
$protocol.on("click",function(){
    $protocol.toggleClass("checked");
})

//清空用户名
$usernamedelete.on("click",function(){
    $usernameinput.val("");
})
//清空密码
$passworddelete.on("click",function(){
    $passwordinput.val("");
})

//注册
$registerbutton.on("click",function(){
    var usernameval = $usernameinput.val(),
        passwordval = $passwordinput.val();

    var pwdrels = regpwd.test(passwordval);

    var chosed = $protocol.hasClass("checked");

    if(!usernameval){
        $errorinfo.html("用户名不能为空");
    }else{
        if(!passwordval){
            $errorinfo.html("密码不能为空");
        }else if(!pwdrels){
            $errorinfo.html("密码长度6到20位");
        }else{
            if(!chosed){
                $errorinfo.html("请同意用户协议");
            }
        }
    }

    if(usernameval&&passwordval&&pwdrels&&chosed){
        $errorinfo.html("");
         console.log("调用注册接口");
    }
})