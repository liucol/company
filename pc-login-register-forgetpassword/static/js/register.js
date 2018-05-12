var vue = new Vue({
    el: '#vue-box',
    data: {
        msg: {
            username: '',
            pass: '',
            pass2: '',
            email: '',
            phonenumber: '',
            agree: true
        },
        resflag:{
            usernameflag: '',
            passflag: '',
            pass2flag: '',
            phonenumberflag: '',
            emailflag: ''
        },
        success:false
    },
    methods: {
        validator: function (val, name) {
            var flag = '';
            switch (name) {
                case 'username':
                    flag = /^[\da-zA-Z]{4,10}$/.test(val);
                    this.resflag.usernameflag = flag;
                    break;
                case 'pass':
                    flag = /^[\da-zA-Z]{6,16}$/.test(val);
                    this.resflag.passflag = flag;
                    break;
                case 'pass2':
                    flag = (this.msg.pass == val) && val;
                    this.resflag.pass2flag = flag;
                    break;
                case 'phonenumber':
                    flag = /^[1][3|5|7|8|]\d{9}$/.test(val);
                    this.resflag.phonenumberflag = flag;
                    break;
                case 'email':
                    flag = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(val);
                    this.resflag.emailflag = flag;
                    break;
            }
            //!flag && (this.msg[name] = '');
            return flag;
        },

        login: function () {
            var msg = this.msg;

            var resflag = this.resflag,
                usernameflag =  resflag.usernameflag,
                passflag = resflag.passflag,
                pass2flag = resflag.pass2flag,
                phonenumberflag = resflag.phonenumberflag,
                emailflag = resflag.emailflag;

            if (usernameflag && passflag && pass2flag && phonenumberflag && emailflag && msg.agree) {
                console.log("信息填写正确")
                common.ajax('post', common.ip + '/login/register.php', this.msg, function (data) {
                    var json = JSON.parse(data);
                    if(json.code == 0){
                        console.log("注册成功");
                        vue.success = true;
                    } else{
                        alert('该帐号已被注册！');
                    }
                })
            }else{
                if(!msg.agree){
                    console.log("请同意《用户注册服务协议》");
                    var $agreetost = $(".agree-service");
                    $agreetost.fadeIn();
                    setTimeout(function(){
                        $agreetost.fadeOut();
                    },2000);
                }else{
                    console.log("表单信息填写有误");
                }
            }
        },
    },
});
