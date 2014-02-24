(function($){    
    $.mediaEventsLogger = function(options){  
        var opt = $.extend({}, $.mediaEventsLogger.defaults, options);
        var _log = function(msg){
            if(opt.consoleLogging){
                console.log(msg);   
            }
            if(opt.popupLogging){
                _writeOnPopup(msg);
            }
        }
        var _writeOnPopup = function(log){
            if(opt.popupLogginDirection == 'up'){
                $('#mediaLoggerPopup').prepend(log);    
            } else{
                $('#mediaLoggerPopup').append(log);    
            }
            
        }
        var _createPopupWindow = function(){
            var popup = '<div id="mediaLoggerContainer">';
            popup += '<div id="mediaLoggerPopupActionBar" style="position:absolute;z-index:1000000;top:56px;'+
            'left:100px;width:600px;height:44px;color:white;background:#40cb90;text-align:center">'+
            '<span> media Logger </span>'+
            '<button style="float:right;width:44px;height:44px;" id="close">X</button>'+
            '<button style="float:right;width:44px;height:44px;" id="maximize">[ ]</button>'+
            '<button style="float:right;width:44px;height:44px;" id="minimize">-</button>'+            
            '</div>';
            popup += '<div id="mediaLoggerPopup" '+
            'style="position:absolute;z-index:1000000;top:100px;'+
            'left:100px;width:600px;height:500px;overflow:scroll;color:red;background:white;">'+
            '</div>';
            popup += '</div>'
            $('body').append(popup);
            $('mediaLoggerPopup').show();
            $('#mediaLoggerPopupActionBar button#close').bind('click',function(){
                $('#mediaLoggerContainer').remove();
            });
            $('#mediaLoggerPopupActionBar button#minimize').bind('click',function(){
                $('#mediaLoggerPopup').animate({
                    height : '0px'                    
                },500,function(){
                    $('#mediaLoggerPopupActionBar').animate({
                        top: '0px',
                        left: '0px',
                        width: '132px'
                    },500,function(){
                        $('#mediaLoggerPopupActionBar').css({
                            height:'auto'
                        })
                    })
                });
            });
            $('#mediaLoggerPopupActionBar button#maximize').bind('click',function(){
                $('#mediaLoggerPopupActionBar').animate({
                    top: '56px',
                    left: '100px',
                    width : '480px',
                    height: '44px'
                },500,function(){
                    $('#mediaLoggerPopup').animate({
                        height : '500px'                        
                    },500)
                });
            });
        }
        var mediaEvents = {
            'abort' : 'Fires when the loading of an audio/video is aborted',
            'canplay' : 'Fires when the browser can start playing the audio/video',
            'canplaythrough' : 'Fires when the browser can play through the audio/video without stopping for buffering',
            'durationchange' : 'Fires when the duration of the audio/video is changed',
            'emptied' : 'Fires when the current playlist is empty',
            'ended' : 'Fires when the current playlist is ended',
            'error' : 'Fires when an error occurred during the loading of an audio/video',
            'loadeddata' : 'Fires when the browser has loaded the current frame of the audio/video',
            'loadedmetadata' : 'Fires when the browser has loaded meta data for the audio/video',
            'loadstart' : 'Fires when the browser starts looking for the audio/video',
            'pause' : 'Fires when the audio/video has been paused',
            'play' : 'Fires when the audio/video has been started or is no longer paused',
            'playing' : 'Fires when the audio/video is ready to play after having been paused or stopped for buffering',
            'progress' : 'Fires when the browser is downloading the audio/video',
            'ratechange' : 'Fires when the playing speed of the audio/video is changed',
            'seeked' : 'Fires when the user is finished moving/skipping to a new position in the audio/video',
            'seeking' : 'Fires when the user starts moving/skipping to a new position in the audio/video',
            'stalled' : 'Fires when the browser is trying to get media data, but data is not available',
            'suspend' : 'Fires when the browser is intentionally not getting media data',
            'timeupdate' : 'Fires when the current playback position has changed',
            'volumechange' : 'Fires when the volume has been changed',
            'waiting' : 'Fires when the video stops because it needs to buffer the next frame'
        };
        var mediaEventStates = {
            network : {
                0 : 'NETWORK_EMPTY',
                1 : 'NETWORK_IDLE',
                2 : 'NETWORK_LOADING',
                3 : 'NETWORK_NO_SOURCE'
            },
            ready : {
                0 : 'HAVE_NOTHING',
                1 : 'HAVE_METADATA',
                2 : 'HAVE_CURRENT_DATA', 
                3 : 'HAVE_FUTURE_DATA',
                4 : 'HAVE_ENOUGH_DATA' 
            }
        };
        
        var media = $('audio, video');
        var numberOfmedia = media.length;
        var mediaId;// id mediaElement have id
        var logMsg;// msg to be logged
        var el;// current element
        if(opt.popupLogging){
            _createPopupWindow();
        }                 
        for(var i=0,lineNumber=0; i<numberOfmedia; i++){
            mediaId = media[i].id;            
            if(opt.popupLogging){
                
            }
            $.each(mediaEvents,function(key, value){   
                $('#'+mediaId).bind(key,function(){
                    el = document.getElementById(this.id); 
                    lineNumber++;
                    logMsg = '<p style="background:white;font-size:12px">'+
                        lineNumber+'<span style="color:green"> '+ this.id +
                    '</span> : <span style="color:blue">' + 
                    key + '</span> - ' + value + '-- networkState =' +
                    el.networkState +' src = '+el.src+
                    ' <br/> Current source = '+ el.currentSrc +' <br/>time= '+new Date().getTime()+'</p><hr/>';
                    setTimeout(_log, 1, logMsg);
                });
            })
        }
    }
    
    $.mediaEventsLogger.defaults = {
        consoleLogging : true,
        popupLogging : true,
        popupLogginDirection : 'up'
    }    
})(jQuery);


