/**
 * Created by User on 2018/5/7.
 */
if (!Function.prototype.bind) {
    Function.prototype.bind = function (obj) {
        var _self  = this
            , args = arguments;
        return function () {
            _self.apply(obj, Array.prototype.slice.call(args, 1));
        }
    }
}

!function () {
    this.width = 640;//设置默认最大宽度
    this.fontSize = 100;//默认字体大小
    this.widthProportion = function () {
        var p = (document.body && document.body.clientWidth || document.getElementsByTagName("html")[0].offsetWidth) / this.width;
        return p > 1 ? 1 : p < 0.5 ? 0.5 : p;
    };
    this.changePage      = function () {
        document.getElementsByTagName("html")[0].setAttribute("style", "font-size:" + this.widthProportion() * this.fontSize + "px !important");
    }.bind(this);
    this.changePage();
    window.addEventListener('resize', function () {
        this.changePage();
    }, false);
}();

require.config({
    paths: {
        "jquery": ["jquery-1.8.3.min"]
    }
})

require(['jquery', 'jquery.mobile.touch.min'], function ($) {

    // 判断终端类型
    function isM() {
        return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) || $(window).width() < 1200;
    }

    // 判断浏览器语言
    function isZh() {
        return navigator.language.toLowerCase() === 'zh-cn';
    }
    function isNlr() {
        return location.href.indexOf('nlr') > -1;
    }
    if (!isZh() && !isNlr()) location.href = './en/';

    $('._close').bind('click', function () {
        $(this).parents('._parent').hide();
    })

    $('._open').click(function () {
        $('#' + $(this).attr('pid')).show();
    })

    //下拉菜单

    $('.mo_nav_btn').click(function () {
        var $list = $('.nav_list');
        $(this).addClass('mo_nav_btn_on');
        if ($list.is(':hidden')) {
            if (!$('.pop_nav_warp').is(':hidden')) {
                $('.nav_btn').click();
            }
            $list.slideDown('fast');
        } else {
            $(this).removeClass('mo_nav_btn_on');
            $list.slideUp('fast')
        }
    })




    //下拉游戏
    if(isM()){
        $('.nav_btn').click(function () {
            if ($('.pop_nav_warp').is(':hidden')) {
                if (!$('.nav_list').is(':hidden') && isM()) {
                    $('.mo_nav_btn').click();
                }
                //显示
                $(this).css('background-image', 'url(../abroadSite/static/img/nav_btn_c.jpg)');
                $('.pop_nav_warp').slideDown('fast');
            } else {
                $(this).css('background-image', 'url(../abroadSite/static/img/nav_btn.jpg)');
                $('.pop_nav_warp').slideUp('fast');
            }
        });
    }else{
        $('.nav_btn').hover(function () {
            if (!$('.nav_list').is(':hidden') && isM()) {
                $('.mo_nav_btn').click();
            }
            //显示
            $(this).css('background-image', 'url(../abroadSite/static/img/nav_btn_c.jpg)');
            $('.pop_nav_warp').stop().slideDown('fast');
        },function(){
            $('.nav_main, .pop_nav_warp').hover(function () {}, function () {
                $('.nav_btn').css('background-image', 'url(../abroadSite/static/img/nav_btn.jpg)');
                $('.pop_nav_warp').stop().slideUp('fast');
            });
        });
    }


    (function () {

        // 语言切换hover
        $('.lang').find('.zh').on('mouseover', function () {
            $('.lang').removeClass('lang-default').removeClass('lang-en').addClass('lang-zh');
        });
        $('.lang').find('.en').on('mouseover', function () {
            $('.lang').removeClass('lang-default').removeClass('lang-zh').addClass('lang-en');
        });
        $('.lang').on('mouseout', function () {
            $('.lang').removeClass('lang-zh').removeClass('lang-en').addClass('lang-default');
        });

        var obj = {
            $ads       : $(".cont_ad > .cont_ad_2, .cont_ad > .cont_ad_1")
            , index    : 0
            , timeoutID: null
            , go       : function (index) {
                index = index % this.$ads.length;
                if (index === this.index)
                    return;
                this.$ads.stop();
                if (this.timeoutID) {
                    clearTimeout(this.timeoutID);
                    this.timeoutID = null;
                }
                //
                $('.ad_list a').removeClass('a_on');
                var $a = $('.ad_list a').eq(index);
                $a.addClass('a_on');
                //
                var $t = this.$ads.eq(index);
                $t.css({opacity: 0, 'z-index': 13});
                this.$ads.not($t).css({opacity: 1, 'z-index': 11});
                var $last = this.$ads.eq(this.index);
                $last.css({'z-index': 12});
                $t.animate({opacity: 1}, 800, function () {
                    obj.auto();
                });
                this.index = index;
            }
            , auto     : function () {
                obj.timeoutID = setTimeout(function () {
                    obj.go(obj.index + 1);
                }, 3000);
            }
        };
        obj.auto();
        $('.ad_list a').mouseover(function (evt) {
            var list  = $('.ad_list a');
            var index = list.index(this);
            obj.go(index);
        });

        var swipe_start = $.event.special.swipe.start;

        $.event.special.swipe.start = function (event) {
            event.preventDefault();
            return swipe_start(event);
        }

        $(".cont_ad").bind("swipeleft", function () {
            obj.go(obj.index + 1);
        });
        $(".cont_ad").bind("swiperight", function () {
            obj.go(obj.index - 1);
        });

        var _scroll = {
            startT:0,startX:0,startY:0,
            dom : $(".cont_ad").get(0),
            init:function(){
                if(1>0){return;}
                this.dom.addEventListener("touchstart",function(e){
                    var touch = e.touches[0];
                    this.startX = touch.pageX;
                    this.startY = touch.pageY;
                    this.startT = new Date().getTime(); //记录手指按下的开始时间
                });
                this.dom.addEventListener("touchmove",function(e){
                    var touch = e.touches[0];
                    var y = $(document).scrollTop()+this.startY-touch.pageY;
                    if(y >= 0){
                        $(document).scrollTop(y);
                    }
                });

            }
        }
        _scroll.init();
    })();
    /*
     //切换图片
     $('.ad_list a').click(function(){
     //opacity: 1  animate({				opacity: 0.5			},1000)
     $(this).addClass('a_on').siblings().removeClass('a_on');
     var list = $('.ad_list a');
     var index = list.index($(this).get(0));
     var length = list.length;
     var dom = $('.cont_ad > div').eq(index);
     dom.siblings(':not(.ad_list)').css({opacity:1,'z-index':12});

     if($('.ad_list').data('index')){
     $('.cont_ad > div').eq($('.ad_list').data('index')).css({opacity:1,'z-index':12});
     }
     //上级为13
     $('.ad_list').data('index',index);

     dom.css({
     opacity: "0",
     'z-index':14
     }).stop().animate({opacity: 1},800);

     })

     //定时

     function turn(len){
     return function(){
     //获取当前
     var curr_index = $('.ad_list a').index($('.ad_list a.a_on').get(0));
     if((curr_index+1) == len){
     curr_index = 0;
     }else{
     curr_index ++;
     }
     $('.ad_list a').eq(curr_index).click();
     };
     }
     var timer = setInterval(turn($('.ad_list a').length),8000);
     */
    //app



    $('.game_pic').hover(function () {

        var word = $(this).find('.game_word');
        $(this).data('top', word.css('top'));
        //下拉
        word.stop().animate({top: '170px'}, {
            duration: "fast", complete: function () {
                $(this).find('span').css({'color': '#fff', 'line-height': '20px'})
            }
        })
        //上拉
        $(this).find('.game_over_word_box').stop().animate({height: 130}, {duration: "normal"});
        //笼罩层
        $(this).find('.game_cover').stop().animate({opacity: 0}, {duration: "normal"});
        //边框
        $(this).find('.game_over_cover').show();
    }, function () {
        var word = $(this).find('.game_word');
        word.stop().animate({top: $(this).data('top')}, {
            duration: "fast", complete: function () {
                $(this).find('span').css({'color': '#f6d191', 'line-height': '24px'})
            }
        });
        $(this).find('.game_over_word_box').stop().animate({height: 0}, {duration: "normal"});
        $(this).find('.game_cover').stop().animate({opacity: 0.65}, {duration: "normal"});
        $(this).find('.game_over_cover').hide();
    });


    //news
    if ($('.inner_cont_right').length > 0) {
        //
        $(window).scroll(_scroll);

        function _scroll() {
            //判断浏览器版本

            if (isM() == false) {
                if ($(window).scrollTop() > 356) {
                    $('.inner_cont_right').css({'position': 'fixed', 'top': '112px'});
                } else {
                    $('.inner_cont_right').css({'position': 'absolute', 'top': '468px'});
                }
            }
        }

        _scroll();


        $('.btn_warp > a').click(function () {
            $('.inner_cont_box').show();
        });


    }

    //dt_detail
    if ($('.dt_detail_right_contbox').length > 0) {
        $('.dt_detail_right_contbox > p > a').hover(function () {
            $(this).find('strong,em').each(function () {
                $(this).data('color', $(this).css('color'));
                $(this).css('color', '#fff');
            });
        }, function () {
            $(this).find('strong,em').each(function () {
                $(this).css('color', $(this).data('color'));
            });
        })
    }

    ///cn/joinus
    if ($('.inner_zp_subnav').length > 0) {
        //
        $('.inner_zp_subnav a').click(function () {
            //inner_zp_box
            $('.inner_zp_subnav a').removeClass('a_on')
            $(this).addClass('a_on');
            var index = $('.inner_zp_subnav a').index($(this).get(0));
            $('div.inner_zp_box').eq(index).show().siblings('div.inner_zp_box').hide();
        })


        //
        $('.inner_zo_dd_title').click(function () {
            var cont = $(this).parent().find('.inner_zo_dd_cont');
            if (cont.is(':hidden')) {
                cont.show();
            } else {
                cont.hide();
            }
        })
        $('.up_arr').click(function () {
            $(this).parents('.inner_zo_dd_cont').hide();
        })
    }

    //games
    if ($('.games_box').length > 0) {
        $('.games_a_box').hover(function () {
            $(this).find('.games_a_box_pop').stop().animate({left: 0}, {duration: "normal"})
        }, function () {
            $(this).find('.games_a_box_pop').stop().animate({left: -380}, {duration: "normal"})
        })
    }


})