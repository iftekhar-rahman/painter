// Tab JS
$(".tabs a").click(function () {
  $(".panel").hide();
  $(".tabs a.active").removeClass("active");
  $(this).addClass("active");

  var panel = $(this).attr("href");
  $(panel).fadeIn(1000);

  return false; // prevents link action
}); // end click
$(".tabs li:first a").click();

$(".color-picker-icon #favcolor1").on("change", function () {
  console.log($(".color-picker-icon #favcolor1").val());
});
// js for color selections
$(".single-color-item.addclass").on("click", function () {
  $(".single-color-item.addclass").removeClass("active");
  $(this).addClass("active");
});

$(".single-color-item.color-picker").on("click", function () {
  $(".single-color-item.addclass").removeClass("active");
});

// js for redo-undo-btns
$(".redo-undo-btns").on("click", function () {
  $(".redo-undo-btns").removeClass("active");
  $(this).addClass("active");
});

// js for text-alignment
$(".single-font-alignment").on("click", function () {
  $(".single-font-alignment").removeClass("active");
  $(this).addClass("active");
  changeDesign('text-align',$(this).attr('data-align'))
});

// JS for font selection section
$(".font-change-btn").on("click", function () {
  $(".font-change").toggleClass("active");
});

$(".font-change-btn").on("click", function () {
  $(".overlay").toggleClass("active");
});

$(".overlay").on("click", function () {
  $(".overlay, .font-change").removeClass("active");
});

$(".fonts-box .single-font").on("click", function () {
  let fntclass = $(this).attr('data-font');
  changeDesign('font-family',fntclass)
});


// JS for range slider
var slider = document.getElementById("font_slider");
if (slider) {
  $(".font_fill").css("width", (slider.value*100/slider.max) + "%");
  slider.oninput = function () {
    $(".font_fill").css("width", (this.value*100/this.max) + "%");
    $('#design_html .editTxtBox').css("font-size",this.value + "px");
  };
}
var slider = document.getElementById("outline_slider");
if (slider) {
  $(".outline_fill").css("width", (slider.value*100/slider.max) + "%");
  slider.oninput = function () {
    $(".outline_fill").css("width", (this.value*100/this.max) + "%");
    $('#design_html .editTxtBox').css("-webkit-text-stroke-width",this.value + "px");
    console.log($('#design_html .editTxtBox').css("font-size"));
    let fs = (parseInt($('#design_html .editTxtBox').css("font-size").replace('px',''))+parseInt(this.value));
    console.log(fs);
    //$('#design_html .editTxtBox').css("font-size",fs + "px");
  };
}
var shadow_slider = document.getElementById("shadow_slider");
var shadow_slider_clr = 'black';
if (shadow_slider) {
  shadow_slider.oninput = function () {
    $(".shadow_fill").css("width", (this.value*100/this.max) + "%");
    $('#design_html .editTxtBox').css("text-shadow",this.value+"px "+this.value+"px "+this.value/4+"px "+shadow_slider_clr);
  };
}

// js for text-alignment
$(".slider.round").on("click", function () {
  $(
    ".color-box, .range-wrapper, .bottom-section, .font-change, .overlay, .tabs, .overlay2, .toggle-button, .redo-undo-buttons"
  ).toggleClass("disbale");
  $('#hasTxt:checked').length?$('#design_html .editTxtBox').hide():$('#design_html .editTxtBox').show();
});



$('#font_color').on("input", function(e){ changeDesign('color',e.target.value)});
$('#outline_color').on("input", function(e){ changeDesign('-webkit-text-stroke-color',e.target.value)});
$('#shadow_color').on("input", function(e){ shadow_slider_clr = e.target.value;changeDesign('text-shadow',shadow_slider.value+"px "+shadow_slider.value+"px "+shadow_slider.value/4+"px "+shadow_slider_clr)});

$('.chngClr').on("click", function(){ changeDesign('color',$(this).attr("data-value"))});

$('.chngOtClr').on("click", function(){ changeDesign('-webkit-text-stroke-color',$(this).attr("data-value"));});

$('.chngShClr').on("click", function(){shadow_slider_clr =$(this).attr("data-value"); changeDesign('text-shadow',shadow_slider.value+"px "+shadow_slider.value+"px "+shadow_slider.value/4+"px "+shadow_slider_clr);});

function changeDesign(key,val){
  $('.editTxtBox').css(key,val);
}
