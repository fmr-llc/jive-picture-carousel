/*
Jive - Picture Carousel Widget

Copyright (c) 2015 Fidelity Investments
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

FILE DESCRIPTION
This is the Javascript library that drives the Picture Carousel Widget Builder app.

WIDGET DESCRIPTION
This Jive HTML widget loads in a Jive setup document with four columns in the table.
The table content is parsed into a Bootstrap slider.  The timing and colors in the UI 
are configurable via the builder app.
*/
var fidosreg_id = 'b764a0a9536448345dc227af95e192521d337b5e4c3560c859b89ecd0407004a';
var sourceURL = '';
var sourceURL = '';
var URLCheck = '/docs/';
var pictureSize = 'aspect';
var sliderHeight = '300px';
var sliderSpeed = '5000';
var backgroundColor = 'f2f2f2';
var borderColor ='b8b8b8';
var captionTextColor ='bbbbbb';
var captionBackgroundColor ='000000';
var navColor = 'F2F2F2';
var navBackgroundColor = 'bbbbbb';

function toggleNextButton() {
	if($j('#docURLInput').val().length > 0 ) {
		$j('#nextButton').attr('disabled', false);
		$j('#URLStatus').html('');
	} else {
		$j('#nextButton').attr('disabled', true);
	}
}

function resize(){
	setTimeout(resizeMe,300);
}

function nextFromStart(){
	if($j('#docURLInput').val().indexOf(URLCheck) == -1){
		$j('#URLStatus').html('Invalid URL');
		$j('#docURLInput').val('');
		$j('#nextButton').attr('disabled', true);
		resize();
	} else {
		loadPreview();
	}
}

function loadPreview(){
	var content_area_class = '#jive-body-main div.jive-rendered-content';
	pictureSize = $j('#pictureSize input:radio:checked').val();
	sliderHeight = parseInt($j('#pictureHeight').val());
	$j('#previewDiv').width( $j('#colSize').val() );
	sourceURL = $j('#docURLInput').val();
	$j("#previewDiv").empty();
	$j("#previewDiv").load(sourceURL + ' ' + content_area_class, function(response, status, xhr) {
		if ((status == "error") || ($j('#previewDiv table').length < 1) || ($j('table tr', '#previewDiv').length < 2)) {
			$j("#previewDiv").html("<div id='mainContent'></div>");
			$j('#URLStatus').html('Invalid Document');
			$j('#docURLInput').val('');
			$j('#nextButton').attr('disabled', true);
			resize();
		} else {
			hide();
			$j("#previewDiv").html("<div id='mainContent'></div>");
			$j('#mainContent').html(insertHtml);
			$j('#customizationPageOne').show();
			$j('#previewDiv').show();
			init();
		}	
	}); //end load
}

function pageOneNext(){
	hide();
	sliderSpeed = $j('#pictureScrollSpeed').val() * 1000;
	$j('#customizationPageTwo').show();
	$j('#previewDiv').show();
	resize();
}

function pageTwoNext(){
	finish();
}

function backFromFinish(){
	hide();
	$j('#customizationPageTwo').show();
	$j('#previewDiv').show();
	resize();
}

function hide(){
	$j('#startingDiv').hide();
	$j('#customizationPageOne').hide();
	$j('#customizationPageTwo').hide();
	$j('#previewDiv').hide();
	$j('#generatedCodeDiv').hide();
}

function changeSliderSpeed(direction){
	if(direction == 'up'){
		$j('#pictureScrollSpeed').val(parseInt($j('#pictureScrollSpeed').val()) + 1);

	}else if(direction == 'down' && parseInt($j('#pictureScrollSpeed').val()) > 1){
		$j('#pictureScrollSpeed').val(parseInt($j('#pictureScrollSpeed').val()) - 1);
	}

	sliderSpeed = parseInt($j('#pictureScrollSpeed').val()) * 1000;
	loadPreview();
	updatePreview();
}

function updatePreview(){
	$j('#innerCarousel').height( sliderHeight );
	$j('#myCarousel').attr('data-interval', "" + sliderSpeed);
	$j('.item').css({'background-color' : backgroundColor});
	$j('#mainContainer').css({'border': "1px solid " + borderColor});
	$j('a.carousel-control').css({
		'color': navColor,
		'background-color': navBackgroundColor,
		'border-color': navColor
	});
	$j('.carousel-indicators li').css({
		'color': navColor,
		'background-color': navBackgroundColor,
		'border-color': navColor
	});
	$j.each($j('.carousel-caption'), function(i,item){
		if($j(item).text().replace(/\n/g, '').length > 0){
			$j(item).css({'background-color': captionBackgroundColor,
						  'border-radius':'5px',
						  'color': captionTextColor ,
						  'height': "'" + sliderHeight + "px'"
						});
			$j('.carousel-caption h3').css({'color': captionTextColor});
		}
	});
}

function startOver() {
	hide();
	$j('#previewDiv').hide();
	$j('#URLStatus').html('');
	$j('#docURLInput').val('');
	sourceURL = '';
	$j('#nextButton').attr('disabled', true);
	$j('#startingDiv').show();
	resize();
}

function selectAll(){
	$j('#generatedCodeBox').select();
}//selectAll

function finish(){
	hide();
	$j('#URLStatus').html('');
	$j('#generatedCodeBox').text(
					"<scr"+"ipt src='/api/core/v3/attachments/file/" + jquery_content_id + "/data'><\/scr"+"ipt>\n" 
					+ "<scr"+"ipt src='/api/core/v3/attachments/file/" + library_loader_content_id + "/data'><\/scr"+"ipt>\n"
					+ "<scr"+"ipt>\n"
					+ "$j.load_library('bootstrap.css');\n"
					+ "$j.load_library('bootstrap-theme.css');\n"
					+ "$j.load_library('picture_carousel_widget.css');\n"
					+ "$j.load_library('bootstrap.js');\n"
					+ "var pictureSize = '" + pictureSize + "';\n"
					+ "var sliderSpeed = '" + sliderSpeed + "';\n"
					+ "var sourceURL='" + sourceURL + "';\n"		
					+ "var sliderHeight = '" + sliderHeight + "';\n"
					+ "var backgroundColor = '" + backgroundColor + "';\n"
					+ "var borderColor ='" + borderColor + "';\n"
					+ "var captionTextColor ='" + captionTextColor + "';\n"
					+ "var captionBackgroundColor ='" + captionBackgroundColor + "';\n"
					+ "var navColor = '" + navColor + "';\n"
					+ "var navBackgroundColor = '" + navBackgroundColor + "';\n"
					+ "$j(function(){\n"
					+ "$j('#mainContent').html(insertHtml);\n"
					+ "init();\n"
					+ "});\n"
					+ "$j.load_library('picture_carousel_widget.js');\n"
					+ "<\/scr"+"ipt>\n"
					+ "<div id='mainContent'><\/div>"
					);
	$j('#generatedCodeDiv').show( function() {
		$j('#generatedCodeBox').select();
		resize();
	});
}

$j(document).ready(function() {
	var ua = window.navigator.userAgent;
	var msie = ua.indexOf('MSIE ');
	var IEVersion = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)));
	if(IEVersion <= 8){	
		$j('#docURLInput').attr('onpropertychange', 'toggleNextButton()');
	} else {
		$j('#docURLInput').bind('input', function() { 
			toggleNextButton();
		});
	}

	hide();
	$j('#startingDiv').show();

	/*
	 *Page One
	 */
	$j('#pictureSize').change(function() {
		loadPreview();
		updatePreview();
	});

 	$j( "#pictureScrollSpeed" ).change(function() {
		if( $j.isNumeric( $j('#pictureScrollSpeed').val() ) == false ){
			$j('#pictureScrollSpeed').val(5);
		} else if ($j('#pictureScrollSpeed').val() < 1){
			$j('#pictureScrollSpeed').val(1);
		}
		sliderSpeed = $j('#pictureScrollSpeed').val() * 1000;
		loadPreview();
		updatePreview();
	});

	$j( "#colSize" ).change(function() {
		loadPreview();
		updatePreview();
		resize();
	});
	
	$j('#pictureHeight_slider').on("input change", function() {
		document.getElementById("pictureHeight").value = $j(this).val();
	});

	$j('#pictureHeight_slider').change(function () {
		document.getElementById("pictureHeight").value = $j(this).val();
		$j( "#colSize" ).change();
	});

	$j("#backgroundColor").spectrum({
		color: backgroundColor,
	 	showAlpha: true,
	 	showInput: true,
	 	move: function(color) {
			backgroundColor = color.toHslString();
			updatePreview();
		},
	 	hide: function(color) {
			backgroundColor = color.toHslString();
			updatePreview();
		}
	});

	$j("#borderColor").spectrum({
		color: borderColor,
	 	showAlpha: true,
	 	showInput: true,
	 	move: function(color) {
			borderColor = color.toHslString();
			updatePreview();
		},
	 	hide: function(color) {
			borderColor = color.toHslString();
			updatePreview();
		}
	});

	$j("#navColor").spectrum({
		color: navColor,
	 	showAlpha: true,
	 	showInput: true,
	 	move: function(color) {
			navColor = color.toHslString();
			updatePreview();
		},
	 	hide: function(color) {
			navColor = color.toHslString();
			updatePreview();
		}
	});

	$j("#navBackgroundColor").spectrum({
		color: navBackgroundColor,
	 	showAlpha: true,
	 	showInput: true,
	 	move: function(color) {
			navBackgroundColor = color.toHslString();
			updatePreview();
		},
	 	hide: function(color) {
			navBackgroundColor = color.toHslString();
			updatePreview();
		}
	});

	$j("#captionBackgroundColor").spectrum({
		color: captionBackgroundColor,
	 	showAlpha: true,
	 	showInput: true,
	 	move: function(color) {
			captionBackgroundColor = color.toHslString();
			updatePreview();
		},
	 	hide: function(color) {
			captionBackgroundColor = color.toHslString();
			updatePreview();
		}
	});

	$j("#captionTextColor").spectrum({
		color: captionTextColor,
	 	showAlpha: true,
	 	showInput: true,
	 	move: function(color) {
			captionTextColor = color.toHslString();
			updatePreview();
		},
	 	hide: function(color) {
			captionTextColor = color.toHslString();
			updatePreview();
		}
	});
});