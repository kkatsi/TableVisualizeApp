(function() {
    var items=""; 
    var windowH = $(window).height(),
    genArray=[];
    documElem = $(document),
    slideDownPage = $('.slide-down-page'),
    slideUpPage = $('.slide-up-page'),
    content = $('.maincontent'),
    btns = $('.btn'),
    animSpeed = 600;

    var ajaxTitles = function (data) {
        $.ajax({
            url: 'AjaxScriptGet.php',
            type: 'GET',
            dataType: 'json',
            data: data
        }).done(function (data) {
            if( !data['col1'] ){
                items = data;
                console.log(items);
                $('ul').empty();
                $.each(items, function (index, item) {
                    $('.content').append('<a href="#" class="litem"><li class="flex-item"><p class="title">'+item['title']+'</p></li></a>');
                }); 
            }
            else{
                console.log(data);
                genArray = [];
                genArray.push(data['col1']);
                genArray.push(data['col2']);
                genArray.push(data['col3']);
                genArray.push(data['col4']);
                $('tbody').empty();

                for(var i=0; i<genArray.length; i++){
                    var temp = genArray[i]
                    for(var j=0; j<temp.length; j++){
                        var txt = document.createElement("tr");;
                        $('.tbody').append(txt);
                    }
                }
                console.log( $('tbody'));
                for(var i=0; i<genArray.length; i++){
                    var temp = genArray[i]
                    for(var j=0; j<temp.length; j++){
                        var txt1 = "<td>"+genArray[j][i]+"</td>";
                        document.getElementsByClassName('UomTable').getElementsByTagName['tbody'][0].getElementsByTagName('tr')[j].append(txt1);
                
                    }
            
                }
                 
            }
            console.log(genArray);
        }).fail(function (jqXHR, textStatus) {
            console.log('Error: '+textStatus);
        });
    };
    
    
    
    ajaxTitles("");
    
    $('.closeDown').on('click', function(){
        
        ajaxTitles("");
        
    });
    
    $('.viewSaved').on('click', function(e){
        
        ajaxTitles({title: e.target.firstChild.innerText});

        if(e.target.tagName == 'LI'){
         
            slideUpPage.animate({'top': windowH + 'px'}, animSpeed);
            content.animate({'margin-top': 0}, animSpeed);
            content.css('display', 'flex' );
            setTimeout(function() {
                slideUpPage.css('display', '');
            },600);
            setTimeout(function() {
                slideDownPage.animate({'top': 0}, animSpeed);
                content.animate({'margin-top': windowH + 'px'}, animSpeed);
                setTimeout(function() {
                content.css('display', 'none' );
                },600);
            },600);
        }
        
        

        
        
        
        
        
        
          
    });
            
})();