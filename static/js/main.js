var chosen_img = "https://www.gizbot.com/img/2016/10/1-07-1475823759.jpg";

function queryST(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


function loadLocalImages(){
  var imgs = localImage('get');
  $('.uImgs').html('');
  if(imgs.length){
    $('.starting-text,.site-wrap').removeClass('active');
    $('.uImgs').append('<div class="single-carousel-item flex-item text-center" onclick="$(\'#camera_file\').click();">'+
                            '<div class="upload-wrap">'+
                                '<div class="uploadpreview">+Add photo</div>'+
                            '</div>'+
                        '</div>');
                        $('.uImgs').append('<div class="single-carousel-item flex-item text-center ldr" style="display: none;">'+
                        '<div class="upload-wrap">'+
                            '<div class="uploadpreview" style="background-image: url(static/images/loader.gif);"></div>'+
                        '</div>'+
                    '</div>');
  }else{
    $('.starting-text,.site-wrap').addClass('active');
    $('.uImgs').append('<div class="single-carousel-item flex-item text-center ldr" style="display: none;">'+
    '<div class="upload-wrap">'+
        '<div class="uploadpreview" style="background-image: url(static/images/loader.gif);"></div>'+
    '</div>'+
'</div><div class="single-carousel-item flex-item text-center"></div><div class="single-carousel-item flex-item text-center"></div><div class="single-carousel-item flex-item text-center"></div><div class="single-carousel-item flex-item text-center"></div> <div class="single-carousel-item flex-item text-center"></div><div class="single-carousel-item flex-item text-center"></div><div class="single-carousel-item flex-item text-center"></div>');
  }
  
  //imgs.reverse();
  $.each(imgs, function(i,v){
      $('.uImgs').append('<div class="single-carousel-item flex-item text-center">'+
                      '<div class="upload-wrap">'+
                          '<div class="uploadpreview" style="background-image: url('+v+'?'+ (+new Date())+');background-size:contain;"  onclick="chooseImage(\''+v+'\');"></div>'+
                          '<span class="close-btn" onclick="localImage(\'delete\','+i+');loadLocalImages();"><img src="static/images/clear.png" alt="close"></span>'+
                      '</div>'+
                  '</div>');
  });
  

  var imgb = localImage('get','',false);
  if(imgb.length){
    $('.uImgb').html('');
  }
  //imgb.reverse();
  $.each(imgb, function(i,v){
    $('.uImgb').append('<div class="single-box">'+
                    '<div class="upload-wrap">'+
                        '<div class="uploadpreview" style="background-image: url('+v+'?'+ (+new Date())+');background-size:contain;" onclick="window.open(\''+v+'\')"></div>'+
                        '<span class="close-btn" onclick="localImage(\'delete\','+i+',1);loadLocalImages();"><img src="static/images/clear.png" alt="close"></span>'+
                    '</div>'+
                '</div>');
  });

}

function showLoading(yes){
  yes?$('.loader').show():$('.loader').hide();
}

function removeLoader(){
  loadLocalImages();
  setTimeout(function(){ window.location = base_url +'/templates'; }, 3500);  
}

function afterProcessImage(result,options){
  setLocalVar('chosen_img',chosen_img);
  localImage('set',chosen_img+'?'+(+new Date()));
  removeLoader();
  return;  
}

function chooseImage(img){
  setLocalVar('chosen_img',img);
  location.href = "templates.html";
}

function turnPage(kind){
  $('.pages').hide();
  switch(kind){
      case 'hp':
          $('.hp').show();
          loadLocalImages();
          break;
      case 'tpl':
          $('.tpl').show();
          loadTemplates();
          break;
      case 'newtpl':
          $('.newtpl').show();
          break;
      case 'design':
          $('#design_html').html('');
          $('.design').show();
          break;                
      default:
          break;

  }
}
function loadTemplates(){
  return; 
}

function randomNumber(min, max) {  
  return Math.floor(Math.random() * (max - min) + min); 
}

function chooseTemplate(id, callback){
  turnPage('design');
  $.ajax({url: base_url + "/api/index?type=template&query="+id,type: 'GET',
      success: function(res) {
          $('#design_html,#tpl_html').html(res.result.html);
          $('#newtpl_txt').val(res.result.title);
          $('#newtpl_id').val(res.result.tid);
          if(chosen_img!=''){
              if($(actualElement()).css('background-image') == 'none'){
                $(actualElement()).attr('src',chosen_img);
              }else{
                $(actualElement()).css('background-image','url('+chosen_img+')');
              }
          }
          if(typeof callback!='undefined'){
            callback(res.result);
          }
      }
  });
}

function downloadDesign(){
  var designURL = 'https://c.tadst.com/gfx/750w/independence-day.jpg';
  localImage('set',designURL+'?'+(+new Date()),true);
  window.location = base_url;
}


function createTemplate(setp,val,id){
  id = typeof id === 'undefined'?'':id;
  $('.tpl_steps').addClass('disabledCont');
  switch(setp){
      case 'bg':
          readFile(val,function(imgData){$('#tpl_html .tpl_img_1').attr('src',imgData);})
          $('#newtpl_step2').removeClass('disabledCont');
          break;
      case 'fg':
          readFile(val,function(imgData){$('#tpl_html .tpl_img_2').attr('src',imgData);})
          $('#newtpl_step3').removeClass('disabledCont');
          break;
      case 'txt':
          if(val==''){
              $('#newtpl_step3').removeClass('disabledCont');
              return alert("Enter Template title please!");
          }
          alert("Template saved");
          break;
      default:
          break;
  }
}

var sel_elem = '';
function addText(){
  var $div = $("<div>", {"class": "draggable","placeholder":"edit me","contenteditable":"true","style":"position:absolute;top:2%;left:2%;color:rgb(208 71 146);font-size:34px;text-align: left;font-family: Chalkduster;","text":"edit me"});
  $div.click(function(){ sel_elem = this});
  $("#design_html").append($div);
}

function makeLayoutChange(property, value){
  console.log(sel_elem);
  console.log(property,value);
  $(sel_elem).css(property,value);
}

function searchKeypressed(evt,val){
  if(evt.keyCode === 27){
    $('#searchTxt').val('');
  }
  $('.close-icon').hide();
  if(val!=''){
    $('.close-icon').show();
  }
}