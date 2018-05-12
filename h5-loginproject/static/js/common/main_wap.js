$(function(){
    if ($('.slideBox').length) {
        document.getElementById('slideBox').getElementsByTagName('img')[0].onload = function(){
            $('.slideBox').height($('.slideBox img').eq(0).height());
        }
    };

	$('.scroll_a').click(function(){
		var scroll = $(this).attr("scroll");
		$('html,body').animate({scrollTop:scroll+'px'}, 300);
	});
	
	setTimeout(function(){
    	$('.spring_chicken').addClass('spring_chicken_ani');
	}, 300)
	 
	//右上角
	var $app = $('#app-center'), $nav = $('#top-nav');
	$app.click(function(event){
			(event && event.stopPropagation) && event.stopPropagation() || (event.cancelBubble = true);
			if($(this).is('.c')){
				$nav.css({'opacity' : 0 });
                setTimeout(function(){$nav.css({'display' : 'none' }); }, 300)
				$app.removeClass('c');
			}else{
				$nav.css({'display' : 'block' });
                setTimeout(function(){$nav.css({'opacity' : 1 }); }, 0)
				$(this).addClass('c');
			}
	});
	
   /* var session_id = $_GET['session_id'] || '';
	$.getJSON(C9377.app_url+'/api/user_info_jsonp.php?callback=?&session_id='+ session_id, function(json){
		if(!json.LOGIN_ACCOUNT) {
			$('#no-login').show();
			$('#logined').hide();
		}else {
            C9377.Uinfo = json;
            var json_name = !json.openid ? json.LOGIN_ACCOUNT : (json.openid && json.openid.nickname ? json.openid.nickname : json.LOGIN_ACCOUNT);
			$('#logined .username').append('<strong>' + json_name + '</strong>');
            //$('#app-center').html(json_name);
            $('#no-login').hide();
            $('#app-center,#logined').show();
		}
	});*/

	var $app02 = $('#top_gift_ico'), $nav02 = $('#top_gift_nav');
	$app02.click(function(event){
			(event && event.stopPropagation) && event.stopPropagation() || (event.cancelBubble = true);
			if($(this).is('.c')){
				$nav02.css({'opacity' : 0 });
                setTimeout(function(){$nav02.css({'display' : 'none' }); }, 300)
				$app02.removeClass('c');
			}else{
				$nav02.css({'display' : 'block' });
                setTimeout(function(){$nav02.css({'opacity' : 1 }); }, 0)
				$(this).addClass('c');
			}
	});

    //Tab切换
    function initTab(name) {
        var $tab = $(name);
        $tab.find('.tit a').click(function() {
            var index = $(this).index();
            $tab.find('.txt').eq(index).addClass('cur').siblings().removeClass('cur');
            $(this).addClass('cur').siblings().removeClass('cur');
        });
    };

    initTab('.game_tab');
    initTab('.gift_tab');

    $('#btn-tologin').click(function(){
    	$app.trigger('click');
    })
    // 自助服务表单页面
    $('.sche-tab li').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
        $('.sche-bd .sche-box').hide().eq($(this).index()).show();
    });

    // 领取礼包
    $('.get_card').click(function(){
        if( !sign ) {
			alert("请先登录"); 
			window.location.href="../../../www.9377.cn/login.php-ac=login&type=wap.htm"/*tpa=https://www.9377.cn/login.php?ac=login&type=wap*/ 
						
			//$('#app-center').click();
            return false;
        }else {
            $.getJSON(C9377.app_url+'/api/get_new_card.php?card_type='+ncid+'&sign='+sign+'&callback=?', function(json){
                if( json.status != 1 ) {
                    alert(json.msg);
                }else {
                    $('.card_bg').show().html('礼包码：'+json.msg);
                }
            });
        }
    });
    // 切换到pc版本
    $('#btn-pcpf').click(function(){
        C9377.setcookie('skip_wap', 1);
    });
});
    // 首页-根据系统设置下载地址
    var isIOS = navigator.userAgent.toLowerCase().match(/(iphone|ipad|ipod)/i) ? true : false; //变量提供给独立页面使用
    function setDlUrl(){
        // 平台默认地址是安卓
        var obj = $('.blue_down'), objlen = obj.length;
        $.ajax({
            url: C9377.app_url+'/api/app.php',
            type: 'GET',
            dataType: 'jsonp',
            data: {do: 'game-link'},
            success: function(json){
                var jsonlen = json.length;
                for(var i = 0; i < objlen; i++){
                    for(var j = 0; j < jsonlen; j++){
                        var objid = obj.eq(i).attr('gid');
                        if (objid == json[j].ID) {
                            if (json[j].IOS_ZB_LINK) {
                                obj.eq(i).attr('href',json[j].IOS_ZB_LINK);
                            }
                            break;
                        }
                    }
                }
            }
        });
    }
    // 微信无法下载弹窗
    $('.Js_fixwx').click(function(){
        var ua = navigator.userAgent.toLowerCase(),
            isWx = (/MicroMessenger/i).test(ua);
        if (isWx) {
            $('#omg-fixwx').show();
            return false;
        }
    });
    $('#omg-fixwx').click(function(){
        $(this).hide();
    })
    // 微信无法下载弹窗