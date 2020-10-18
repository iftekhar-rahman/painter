
function processImage(options,callback) {
  afterProcessImage('','');
}

function actualElement(){
    return $('#design_html .tpl_img_3').length?$('#design_html .tpl_img_3'):$('#tpl_html .tpl_img_3');
}

function localImage(tp,val,isThumb){
  isThumb = typeof isThumb == 'undefined'?true:false;
  var imgDB = isThumb?"_imgs":"_imgb";
    try{
        var images = JSON.parse(localStorage.getItem(imgDB)) || [];
        if(tp=='get'){

        }else if(tp=='delete'){
            images.splice(val, 1)
            localStorage.setItem(imgDB, JSON.stringify(images));
        }else if(tp=='set'){
          if(images.indexOf(val) === -1){
            images.push(val);
            localStorage.setItem(imgDB, JSON.stringify(images));
          }
        }
        return images;
    }catch(im){
        console.log(im);
        return [];
    }
}

function readFile(file,callback){
  var reader = new FileReader();
  reader.onload = function(){
      callback(reader.result);
  };
  reader.readAsDataURL(file);
}

function setLocalVar(name,val){
  try{
    localStorage.setItem(name, val);
  }catch(er){
    console.log("error: setLocalVar")
  }
}

function getLocalVar(name){
  try{
    return localStorage.getItem(name);
  }catch(er){
    console.log("error: setLocalVar")
  }
  return false;
}