/**
 * Расширения библиотеки jquery
 * 2 колоночная система подачи информации.
 * w
 */
var counter_select=1;
var test_PPP;
var control_button;
jQuery.fn.callback='';
var computer,
    ellement_click;
/**
 * Инициализация инпутов
 * @param obj
 * obj.callback
 * obj.div_1 не обязательное поле содержит
 *  класс инпута в который нужно отправлять левый столбик
 * obj.text текст отображаемы 1 пунктом
 */
jQuery.fn.initMenu=function(obj,functions){
    if (functions==1){
        control_button=1;
    }
    var userDeviceArray = [
        {device: 'Android', platform: /Android/},
        {device: 'iPhone', platform: /iPhone/},
        {device: 'iPad', platform: /iPad/},
        {device: 'Symbian', platform: /Symbian/},
        {device: 'Windows Phone', platform: /Windows Phone/},
        {device: 'Tablet OS', platform: /Tablet OS/},
        {device: 'Linux', platform: /Linux/},
        {device: 'Windows', platform: /Windows NT/},
        {device: 'Macintosh', platform: /Macintosh/}
    ];
    var platform = navigator.userAgent;
    function getPlatform() {
        for (var i in userDeviceArray) {
            if (userDeviceArray[i].platform.test(platform)) {
                return userDeviceArray[i].device;
            }
        }
        return 'Неизвестная платформа!' + platform;
    }
    if((getPlatform()=='Windows')||(getPlatform()=='Linux')||(getPlatform()=='Macintosh')){
        computer=1;
    }

    /* добавление data_id элементам */
    $(this).attr("data_id",counter_select);
    this.obj[counter_select]=obj;
    this.callback[counter_select]=obj.callback;
    $(this).click(function(){
        $(this).renderMenu();

    });
    

    /* в форме создаем инпуты где будут лежать файлы*/
    if($(this).attr('val')!=""){
        $('#conteiner_input_select').append('<input type="hidden" name="'+$(this)[0].id+'" value="'+$(this).attr('val')+'">');
        this.active_element_left[counter_select] =$(this).attr('val');
        this.active_element_right[counter_select] =$(this).attr('val');
        if(obj.div_1){
            $('#conteiner_input_select').append('<input type="hidden" name="'+obj.div_1+'" value="">');
        }
    }else{

        this.active_element_left[counter_select] ='';
        this.active_element_right[counter_select] ='';
        $('#conteiner_input_select').append('<input type="hidden" name="'+$(this)[0].id+'" value="">');
        if(obj.div_1){
            $('#conteiner_input_select').append('<input type="hidden" name="'+obj.div_1+'" value="">');
        }
    }
    counter_select++;
    /*удаляет одинаковые  инпуты*/
    var supervise = {};
    $('#conteiner_input_select input').each(function() {
        var txt = $(this).attr('name');
        if (supervise[txt])
            $(this).remove();
        else
            supervise[txt] = true;
    });
    /*конец создания инпутов*/
    $(this).click(function(){
       // set_default_values(this);
    });
};

jQuery.fn.setData=function(obj){
    data_id=this.attr("data_id");
    this.set_arr[''+data_id]=obj;
};

jQuery.fn.set_arr = {};
jQuery.fn.callback= {1:{},2:{},3:{},4:{}};
jQuery.fn.values = {1:{},2:{},3:{},4:{}};
jQuery.fn.colInput = {1:{},2:{},3:{},4:{}};
jQuery.fn.nameInput = {1:{},2:{},3:{},4:{}};
jQuery.fn.textInput = {1:{},2:{},3:{},4:{}};
jQuery.fn.statusInput = {1:{},2:{},3:{},4:{}};

jQuery.fn.obj = {};
jQuery.fn.set_arr = {};
jQuery.fn.active_element_left = {};
jQuery.fn.active_element_right = {};


/**
 * Метод рендеринга выпадающего списка
 * 				
 */
jQuery.fn.renderMenu= function(options){
    var number=$(this).attr("data_id"),
        obj=this.obj[number],  // объект с настройками 
        arr=this.set_arr,
        name=(this)[0].id,
        pole_one='',
        pole_two='',
        coll;
    
    var callbackEndRender;
    
    if(typeof options !='undefined'){
    	if(typeof options['callback'] =='function'){
    		callbackEndRender = options['callback'];
    	}
    	
    }
    /* Установка начального значения */
    var id_element = obj.div_val;
    var val_input = $('#conteiner_input_select input[name='+id_element+']').val();
    var selectParent = '';
    var selectChildren = '';
    var valSetDiv_1 = val_input;
    if(typeof (obj.div_1)!=undefined  && obj.div_1!=''){
    	valSetDiv_1 = $('#conteiner_input_select input[name='+obj.div_1+']').val();
    }
  
    /*    первый пункт меню     */
    text_top='<div class="top_pole">' +
             '<input type="radio" position_block="top" id="any_'+name+'" name_element="'+name+'" name="'+name+'" value="">'+
             '<span>'+obj.text+'</span></div>';

    
    /*   заполнение левой и правой панели в переменный pole_one-левая панель pole_two-правая панель     */
    for(num in arr[number]){
        coll=num
        pole_one+='<div class="element_left_bottom_fon_mc e_'+num+'" position_block="left" name_parent="'+name+'" num="'+num+'">';
        if(obj.theme_div1 == 'radio'){
        	 pole_one+='<input type="radio" class="clc" name="'+name+'" value="'+arr[number][num]['val']+'">';
        	 theme = 'radiotheme';
        }else if (obj.theme_div1 == 'text') {
        	 pole_one+='<div class="spaceradio"></div><input type="hidden" class="clc" name="'+name+'" value="'+arr[number][num]['val']+'">';
        	 theme = 'texttheme';
        }  
        
        pole_one+='<div class="'+theme+'">'+arr[number][num]['name']+'</div></div>';
        pole_two+='<div class="right_element right_'+num+'">';
        if(valSetDiv_1 == arr[number][num]['val']){
        	selectParent = num;
        }  
        for(n in arr[number][num]['children']){
        	if(arr[number][num]['children'][n]['val'] == val_input){
        		selectChildren = n;
        		selectParent = num;
        	}
            pole_two+='<div class="element_right_bottom_fon_mc" position_block="right" name_parent="'+arr[number][num]['val']+'" num="'+num+'"  data-id="'+n+'">'+
                      '<input type="radio" name="'+name+'" value="'+arr[number][num]['children'][n]['val']+'">' +
                      '<div>'+arr[number][num]['children'][n]['name']+'</div>' +
                      '</div>';
        }
        pole_two+='</div>';
    }
    
    
    if(name=='region'){
        if(specialsCruises){
            pole_one+='<div class="separator_menu_items"></div>';
            for(num in specialsCruises){
                pole_one+='<div class="element_left_bottom_fon_mc e_'+(Number(coll)+Number(num))+' spec" position_block="left" name_parent="'+name+'" num="'+(Number(coll)+Number(num))+'" >';
                pole_one+='<div>'+specialsCruises[num]['name']+'</div></div>';
                pole_two+='<div class="right_element right_'+(Number(coll)+Number(num))+'"  data-blockparent="'+num+'">';
                for(n in specialsCruises[num]['children']){
                    if((specialsCruises[num]['children'][n]['val']!="/search/search/cruises?tem=2")&&(specialsCruises[num]['children'][n]['val']!="/search/search/cruises?tem=217")&&(specialsCruises[num]['children'][n]['val']!="/search/search/cruises?tem=1")){
                         pole_two+='<div class="element_right_bottom_fon_mc spec" position_block="right" name_parent="'+specialsCruises[num]['val']+'" num="'+(Number(coll)+Number(num))+'"  data-id="'+n+'">';
						 pole_two+='<input type="radio" name="region" >';
                         pole_two+='<a href="'+specialsCruises[num]['children'][n]['val']+'">';
                         pole_two+='<div>'+specialsCruises[num]['children'][n]['name']+'</div></a>';
                         pole_two+='</div>';
                    }
                }
                pole_two+='</div>';
            }
        }
    }

    /*   отправка даннных в шаблон     */
   var  resulttpl = tmpl('tmp_select')({
        div_pole_one:pole_one,
        div_pole_two:pole_two,
        text_top:text_top
    });
    $("#div_a_select").html(resulttpl); 
    that=this;


    
    
    /*######################### Обработка событий ################################*/
    if(computer==1){
    	/**
         * По элементу из левого столбца Parent
         * Если это компьютер стационарный
         */
	    $('.element_left_bottom_fon_mc').on({
	        'mouseenter':function(){
	            sortingMenuRight(this);
	        },
	        'click':function(){
	        	
	        	if (obj.theme_div1=='radio'){
	        		clickInput($(this));
	                that.active_element_left[number] = $(this).children('input').val();
	                that.active_element_right[number] = '';
	                push_data_left_col($(this).children('input').val(), $(this).children('input').attr('name'), $(this).children('div').text(), that,this,number);
	                send_data_to_sort(obj);
	        	}else if (obj.theme_div1=='text'){
	            	sortingMenuRight(this);
	    		}  
	        	
	            
	        }
	    });
    
    }else{

    	/**
         * По элементу из левого столбца Parent
         * Если это мобильное устройство
         */
        $('.element_left_bottom_fon_mc').on({
            'click':function(){
                sortingMenuRight(this);
                tha=this;
                console.log('1');
                console.log(ellement_click, tha);
                if(ellement_click==this){
                	if (obj.theme_div1=='radio'){
                		 clickInput($(this));
                         that.active_element_left[number] = $(this).children('input').val();
                         that.active_element_right[number] = '';
                         push_data_left_col($(this).children('input').val(), $(this).children('input').attr('name'), $(this).children('div').text(), that,this,number);
                         send_data_to_sort(obj);
                	}else if (obj.theme_div1=='text'){
                		
                	}
                   
                }else{
                    console.log(ellement_click+'='+tha);
                    ellement_click=tha;
                }
            }
        });
    }

    /**
     * По элементу из правого столбца Children
     */
    $('.element_right_bottom_fon_mc').click(function(){
        clickInput($(this));
        that.active_element_left[number] = $('.e_'+$(this).attr('num')).children('input').val();
        that.active_element_right[number] = $(this).children('input').val();
        push_data_right_col($(this).children('input').val(), $(this).children('input').attr('name'), $(this).children('div').text(), that,this,number);
        send_data_to_sort(obj);
    });

    /**
     * По верхней надписи например: Все круизные компании
     */
    $('.top_pole').click(function(){
        for(names in that.obj[number].clear_div){
            name_clear=that.obj[number].clear_div[names];
            if(name_clear!='clc'){
                $('#conteiner_input_select input[name='+name_clear+']').val('');
                $('#'+name_clear).html('<p>'+$('#'+name_clear).obj[$('#'+name_clear).attr('data_id')].text+'</p>');
            }else{
                $('#conteiner_input_select input[name='+name_clear+']').val('');
            }
        }
        that.active_element_right[number]='';
        that.active_element_left[number]='';
        $(that).attr('val','');
        if(obj.topclick=='close'){
        	send_data_to_sort(obj);
        }else{
        	openMediumPreloader('.bottom_top_fon_mc',function(){
        		reloadData(obj,function(){
        			var callbackfunc = function(){ closeMediumPreloader('.bottom_top_fon_mc'); };
        			that.renderMenu({callback:callbackfunc});
            	});

        	});

        }

    });
    
    /**
     * По крестику
     */
    $('#close_right_top_fon_mc').click(function(){
        closeSelect();
    });

    /*######################### END Обработка событий ################################*/



    openSelect();
    width_window=$(window).width();
    polo=$(this).offset();
    polo_left=polo.left;
    if(Number(polo_left)<Number(width_window/2)){
        $('.opacity_fon_mc').removeClass('right_menu'); 
        $('.opacity_fon_mc').addClass('left_menu'); 
    }else{
    	$('.opacity_fon_mc').removeClass('left_menu'); 
        $('.opacity_fon_mc').addClass('right_menu'); 
    }

    
    
    /* корректировка позиции*/
    var input_position = $(this).position().top;
    var offset_position_iput = $(this).offset().top;
    var offset_position_form =  $('.opacity_fon_mc').offset().top;

    var delta = offset_position_iput - offset_position_form;
    $('.opacity_fon_mc').css('top',delta+'px');


    
    
    /*Запуск выбора*/
    var optionSelectItem = {selectParent:selectParent,selectChildren:selectChildren,obj:obj,callback:callbackEndRender}
    selectItem(optionSelectItem);
    

};
/**
 *
 * Проталкивание данных в инпут из правого столбца
 *
 * @param val значение из инпута
 * @param name значение из инпута
 * @param text значение из инпута
 * @param obj оснавной инпут
 * @param obj_parent инпут по которому нажали
 */
function push_data_right_col(val,name,text,that,obj_parent,number){
	var obj = that.obj[number];
    if(obj.div_1){
        if(obj.div_val==name){
            $('#'+obj.div_1).html('<p>'+$('.e_'+$(obj_parent).attr('num')).text()+'</p>');
            $('#conteiner_input_select input[name='+obj.div_1+']').val($(obj_parent).attr('name_parent'));

        }
        $('#conteiner_input_select input[name='+obj.div_1+']').val(that.active_element_left[number] );

        
        /*else{
            $('#'+obj.div_1).html('<p>'+$('.e_'+$(obj_parent).attr('num')).text()+'</p>');
            $('#conteiner_input_select input[name='+obj.div_1+']').val($(obj_parent).attr('name_parent'));
        }*/
        $('#'+name).html('<p>'+text+'</p>');
        $('#conteiner_input_select input[name='+name+']').val(val);

    }else{
        $('#'+name).html('<p>'+text+'</p>');
        $('#conteiner_input_select input[name='+name+']').val(val);
    }
}
/**
 * Проталкивание данных в input  из левого столбца
 * 
 * @param val значение из инпута
 * @param name значение из инпута
 * @param text значение из инпута
 * @param obj оснавной инпут
 * @param obj_parent инпут по которому нажали
 */
function push_data_left_col(val,name,text,that,obj_parent,number){
	var obj = that.obj[number];
    if(obj.div_1){
        $('#'+obj.div_val).html('<p>'+text+'</p>');
        $('#conteiner_input_select input[name='+obj.div_1+']').val(val);
        if(obj.div_val!=obj.div_1){
            $('#conteiner_input_select input[name='+obj.div_val+']').val('');
        }
        if(obj.del_div!=''){
            $('#conteiner_input_select input[name='+obj.del_div+']').val('');
        }
        //$('#conteiner_input_select input[name='+name+']').val('');
    }else{
        $('#'+name).html('<p>'+text+'</p>');
        $('#conteiner_input_select input[name='+name+']').val(val);
    }
}


/**
 * Выставление значений по столбцам 
 * 
 * @param options 
 * {selectParent:порядковый номер родителя ,
 * selectChildren: порядковый номер ребенка ,
 * obj :объект над которым работается,
 * callback: Вызываемый callback}
 * 
 */
function selectItem(options){
	if(typeof options['obj']=='undefined'){
		console.assert(1 === 2, "Нет объекта с которым работаем");
		return;
	}
	
	
	var selParent = '';
	if(typeof options['selectParent']!='undefined'){
		selParent = options['selectParent'];
	}
	
	var selChildren = '';
	if(typeof options['selectChildren']!='undefined'){
		selChildren = options['selectChildren'];
	}


	var lElement = '';
    if(selParent == ''){
    	/*$(".top_fon_mc input[position_block=top]").attr("checked","checked");*/
       /* $('.right_element').hide();*/
        lElement = $('.element_left_bottom_fon_mc[num="'+1+'"]'); 
        $('.element_left_bottom_fon_mc').not('.element_left_bottom_fon_mc[num="'+1+'"]').removeClass('active');
    	lElement.addClass('active');
        sortingMenuRight(lElement);
    }else{
    	//установка leftElement;
    	lElement = $('.element_left_bottom_fon_mc[num="'+selParent+'"]'); 
    	
    	$('.element_left_bottom_fon_mc').not('.element_left_bottom_fon_mc[num="'+selParent+'"]').removeClass('active');
    	lElement.addClass('active');
    	/*$('.right_bottom_fon_mc .right_element').not('.right_bottom_fon_mc .right_element[data-blockparent="'+selectParent+'"]').hide();
    	$('.right_bottom_fon_mc .right_element[data-blockparent="'+selectParent+'"]').show();*/
    	sortingMenuRight(lElement);
    }
    
    if(selChildren == ''){
    	//$('.right_element').hide();
    	$('.right_element .element_right_bottom_fon_mc.active').removeClass('active');
    }else{
    	$('.element_right_bottom_fon_mc[num="'+selParent+'"]').not('.element_right_bottom_fon_mc[num="'+selParent+'"][data-id="'+selChildren+'"]').removeClass('active');
    	$('.element_right_bottom_fon_mc[num="'+selParent+'"][data-id="'+selChildren+'"]').addClass('active');
    }
    
    
    if(typeof options['callback'] == 'function'){
    	var callbackFunc = options['callback'];
    	callbackFunc();
    }

}

/**
 * Начальное выставление 
 * @param obj
 * 
 * @deprecated  !!!!!!!!!!!!  TODO Удалить чуть попозже
 */
function set_default_values(obj){
    number=$(obj).attr('data_id');
    that=$(obj);
    if((that.active_element_right[number]!='')||(that.active_element_left[number]!='')){
        test_PPP=obj;
        if($('.element_left_bottom_fon_mc ').children('input[value='+that.active_element_left[number]+']')){
            $('.element_left_bottom_fon_mc ').children('input[value='+that.active_element_left[number]+']').parent('div').addClass('active');
        }
        if($('.element_right_bottom_fon_mc ').children('input[value='+that.active_element_right[number]+']')){
            $('.element_right_bottom_fon_mc ').children('input[value='+that.active_element_right[number]+']').parent('div').addClass('active');

            $('.element_right_bottom_fon_mc ').children('input[value='+that.active_element_right[number]+']').parent('div').parent('div').show();

            mouseenterDiv=function(){
                $('.element_left_bottom_fon_mc ').children('input[value='+that.active_element_left[number]+']').parent('div').mouseenter();
            };
            setTimeout(mouseenterDiv, 10);

        }
    }
}




var obj_data_select;
/**
 * Отправка данных в инпуты и submit формы
 * @param obj
 */
function send_data_to_sort(obj){
    if($('input[name=region]').val()==undefined){
        $('input[name=region]').val('');
    }
    if($('input[name=company]').val()==undefined){
        $('input[name=company]').val('');
    }
    if($('input[name=clc]').val()==undefined){
        $('input[name=clc]').val('');
    }
    if($('input[name=ship]').val()==undefined){
        $('input[name=ship]').val('')
    }

    closeSelect();
    reloadData(obj,function(){});
    if(typeof(obj.control_button) == 'undefined'){
    	 $('#search_form_search_button').click();
    }else if ((typeof(obj.control_button) != 'undefined') && obj.control_button != 1) {
    	$('#search_form_search_button').click();
	}
}


/**
 * Обновление данных
 * @param obj
 * @param callback
 */

function reloadData(obj,callback){
	var obj_data_select={
	        'region':$('input[name=region]').val(),
	        'company':$('input[name=company]').val(),
	        'clc':$('input[name=clc]').val(),
	        'ship':$('input[name=ship]').val()
	    };
	    
	    obj.callback(obj_data_select,{callback:callback});
}


/**
 * Открытие всей формы
 */
function openSelect(){
    $('#div_a_select').show();
}




/**
 * Закрытие всей формы
 */
function closeSelect(){
    $('#div_a_select').hide();
}




var we;
/**
 * Позиционирование правого меню относительно левого с хитростями
 * @param obj элемент левой части меню по которому нажали
 */
function sortingMenuRight(obj){
    var we=obj;
    /**
     * indent размер отступа отступ
     * contents размер содержимого
     * container размер содержимого
     */
    if($(obj).length == 0){
    	console.log(obj , "Нет правого элемента, нельзя позиционирование провести");
    }
    

    var num=$(obj).attr('num');
    var element=$('.right_'+num); 							/* правый элемента номер*/
    var content=element.outerHeight();						/* размер правого элемента*/
    var container=$('.right_bottom_fon_mc').outerHeight();  /* DEPRECATE тут попадают размер правого блока наведение на класс */
    var indent=($(obj).position().top); 					/* позиция левого блока*/
    
    
   
    
    var leftheight = $('.left_bottom_fon_mc').outerHeight();
    
    var delta = leftheight - (content+indent);

	
	$('.element_left_bottom_fon_mc').not('.element_left_bottom_fon_mc[num="'+num+'"]').removeClass('active');
    $(obj).addClass('active');
    $('.right_element').not('.right_'+num).hide();    /* не применяем скрытие на наш существующий элемент*/
    element.show();
    if (leftheight < content){
    	element.css("top",0);
    }else if(indent > content  && leftheight >= (content+indent)){   
    	element.css("top",indent);
    }else if (indent > content &&  leftheight < content ) {
    	element.css("top",0);
    }else if (indent > content &&  delta < 0){
    	var resheight = indent+delta;
    	element.css("top",resheight);
    }else if (indent<content ){
    	element.css("top",0);
    }else{
    	
    	/* дальше какое то правило  нерешился воспринимать*/
        if((container>content)&&(content<(indent+$(obj).outerHeight()))){
            if((container-indent)>0){
            	element.css("top",((indent+$(obj).outerHeight())-content));
            }else{
            	element.css("top",0);
            }
        }
    }
}



/**
 * Клик по инпуту
 * @param obj
 */
function clickInput(obj){
    obj.children('input').prop('checked', true);
}

/**
 *  Шаблонизатор 
 */
function tmpl(str){
    var fn = new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +
            // Introduce the data as local variables using with(){}
            "with(obj){p.push('" + document.getElementById(str).innerHTML
            .replace(/[\r\t\n]/g, " ")
            .split("<%").join(    "\t")
            .replace(/((^|%>)[^\t]*)'/g, "$1\r")
            .replace(/\t=(.*?)%>/g, "',$1,'")
            .split("\t").join("');")
            .split("%>").join(" p.push('")
            .split("\r").join("\\'") + "');} return p.join('');");
    return fn
}





