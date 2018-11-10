

$(function(){

    $('.user').hover(function () {
            $('.userlist').css({display:'block'});
            
        }, function () {
            $('.userlist').css({display:'none'});
        }
    );
    $('.setting').hover(function () {
            $('.settinglist').css({display:'block'});
            
        }, function () {
            $('.settinglist').css({display:'none'});
        }
    );

    $('.mm').hover(function () {
        $('.morelist').css({
            display:'block'
        })
        $('.more').css({
            background:'white',
            color : 'black'
        })  
    }, function () {
        $('.morelist').css({
            display:'none'
        })
        $('.more').css({
            background:'#38f'
            
        })  
    }
);

        
     //键盘弹起事件
     $('[type="text"]').keyup(function(e){
        if(e.keyCode==38||e.keyCode==40||e.keyCode==13) return;
        var  keyword=$(this).val();//获取输入的值
        $.ajax({
            url:'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?',
            type:"get",
            data:{wd:keyword},
            jsonp:"cb",//这个指定传给服务器的jsonp的名称
            dataType:"jsonp",
            success:function(responsedata){
                 var result=responsedata.s;
                 var dropboxel=$('#dropbox');
                 dropboxel.empty();
                 for(var i in result){
                     $('<li/>').text(result[i]).appendTo(dropboxel);
                 }
                 dropboxel.show();
            },
            error:function(xhr,error,exception){
                console.log('xhr==>',xhr);
                console.log('error===>',error);
                console.log('exception==>',exception);
            }
        });
    }).keydown(function(e){
        var active=$('#dropbox li.active');
        // console.log($('#dropbox li'));
        
               //下键
        if(e.keyCode==40){
            if(active.length==0||active.next().length==0){
                $('#dropbox li').first().addClass('active').siblings().removeClass('active');
            }else{
                $(active).next().addClass('active').siblings().removeClass('active');
            }
            $('[type="text"]').val($('li.active').text());
        }else if(e.keyCode==38){
            //上键
            if(active.prev().length==0||active.length==0){
                $('#dropbox li').last().addClass('active').siblings().removeClass('active');
            }else{
                $(active).prev().addClass('active').siblings().removeClass('active');
            }
            $('[type="text"]').val($('li.active').text());
        }else if(e.keyCode==13){
            location.href="https://www.baidu.com/s?wd="+$('[type="text"]').val();
        }
    })

    $('[type="button"]').click(function (e) { 
        e.preventDefault();
        location.href="https://www.baidu.com/s?wd="+$('[type="text"]').val();
    });
    
    $('#dropbox').mouseenter(function () { 
        $('#dropbox li').each( function (indexInArray, valueOfElement) { 
            $(this).mouseenter(function () { 
                $(this).first().addClass('active').siblings().removeClass('active');
            });
            $(this).click(function (e) { 
                e.preventDefault();
                console.log(this.innerHTML)
                location.href="https://www.baidu.com/s?wd="+this.innerHTML;
            });
        });
    });


    $.ajax({
        type: 'GET',
        url: 'https://www.tianqiapi.com/api/',
        data: 'version=v1&city=广州',
        dataType: 'JSON',
        error: function () {
            alert('网络错误');
        },
        success: function (res) {
            $('.city').text(res.city + ' :');
            $('.wea').text(res.data[0].wea);
            $('.tem').text(res.data[0].hours[0].tem);
            $('.air_level').text(res.data[0].air_level);
            $('.air').text(res.data[0].air);
            
        }
    });
    
})