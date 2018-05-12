function isMobile() {
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
}
var videojsInitialized = false;
var videojsPlayer      = null;
function playM3U8(src) {
    $('#player-tip').hide();
    if (isMobile()) {
        var html = '<video id="player" controls autoplay>';
        html += '<source src="' + src + '" type="application/x-mpegurl">'
        html += '<source src="' + src + '" type="video/mp4">'
        html += '</video>';
        $('#player').replaceWith(html);
        return;
    }
    if (videojsPlayer) {
        videojsPlayer.dispose();
        videojsPlayer = null;
        $('#player-container').append('<div id="player"></div>');
    }
    playM3U8byGrindPlayer(src);
}
function playM3U8byGrindPlayer(src) {
    if (src.indexOf(".3mu8") == -1) {
        src = src + "#.m3u8";
    }
    var flashvars  = {
        autoPlay                : 'true',
        src                     : escape(src),
        streamType              : 'live',
        scaleMode               : 'letterbox',
        plugin_hls              : 'https://www.hlsplayer.net/player/grindplayer/flashlsOSMF.swf',
        hls_debug               : false,
        hls_debug2              : false,
        hls_minbufferlength     : -1,
        hls_lowbufferlength     : 2,
        hls_maxbufferlength     : 60,
        hls_startfromlowestlevel: false,
        hls_seekfromlowestlevel : false,
        hls_live_flushurlcache  : false,
        hls_seekmode            : 'ACCURATE',
        hls_capleveltostage     : false,
        hls_maxlevelcappingmode : 'downscale'
    };
    var params     = {allowFullScreen: 'true', allowScriptAccess: 'always', wmode: 'opaque'};
    var attributes = {id: 'player'};
    swfobject.embedSWF('https://www.hlsplayer.net/player/grindplayer/GrindPlayer.swf', 'player', '100%', '100%', '10.2', null, flashvars, params, attributes);
}
function playM3U8byVideoJS(src) {
    if (!videojsInitialized) {
        videojsInitialized = true;
        var link           = document.createElement('link');
        link.href          = 'video-js.css'/*tpa=https://www.hlsplayer.net/player/videojs/video-js.css*/;
        link.rel           = 'stylesheet';
        document.body.appendChild(link);
        var script    = document.createElement('script');
        script.src    = 'videojs-hls-bundle.js'/*tpa=https://www.hlsplayer.net/player/videojs/videojs-hls-bundle.js*/;
        script.onload = function () {
            playM3U8byVideoJSCallback(src);
        };
        document.body.appendChild(script);
    } else {
        playM3U8byVideoJSCallback(src);
    }
}
function playM3U8byVideoJSCallback(src) {
    var attributes = {'id': 'player', 'class': 'video-js vjs-default-skin', 'width': 'auto', 'height': 'auto', 'controls': ' ', 'autoplay': '', 'preload': 'auto', 'data-setup': '{}'}
    var element    = $('<video><source type="application/x-mpegURL" src="' + src
        + '"></source></video>').attr(attributes)
    $("#player").replaceWith(element);
    videojsPlayer = videojs("#player", {}, function () {
    });
}
function playRTMP(src) {
    $('#player-tip').hide();
    if (isMobile()) {
        $('#player-tip')("RTMP protocol is not supported on your device.");
        return;
    }
    var flashvars  = {autoPlay: 'true', src: escape(src), streamType: 'live', scaleMode: 'letterbox',};
    var params     = {allowFullScreen: 'true', allowScriptAccess: 'always', wmode: 'opaque'};
    var attributes = {id: 'player'};
    swfobject.embedSWF('https://www.hlsplayer.net/player/grindplayer/GrindPlayer.swf', 'player', '100%', '100%', '10.2', null, flashvars, params, attributes);
}
function playMP4(src) {
    $('#player-tip').hide();
    var html = '<video id="player" controls autoplay>';
    html += '<source src="' + src + '" type="video/mp4">'
    html += '</video>';
    $('#player').replaceWith(html);
}



function play(src) {
    if (src) {
        playRTMP(src);
    }
    return false;
}
$(document).ready(function() {
    var src = "rtmp://2016.lilithcdn.com/lilith/fabuhui";
    play(src);
    $('.qbtn').on('click', function () {
        var src = $(this).data('quality');
        $('.qbtn').removeClass('active');
        $(this).addClass('active');
        play(src);
    });
});