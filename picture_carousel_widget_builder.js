/*
Jive - Picture Carousel Widget

Copyright (c) 2015-2016 Fidelity Investments
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
var URLCheck = '/docs/';
var pictureSize = 'aspect';
var sliderHeight = '300';
var playerBorder = '0';
var sliderSpeed = '5000';
var backgroundColor = '#f2f2f2';
var borderColor ='#b8b8b8';
var captionTextColor ='#bbbbbb';
var captionBackgroundColor ='#000000';
var arrowColor = '#F2F2F2';
var arrowBackgroundColor = '#bbbbbb';
var navColor = '#F2F2F2';
var navBackgroundColor = '#bbbbbb';

function toggleNextButton() {
	if($j('#docURLInput').val().length > 0 ) {
		$j('#nextButton').attr('disabled', false);
		$j('#URLStatus').html('');
	} else {
		$j('#nextButton').attr('disabled', true);
	}
}

function resize(){
	setTimeout(resizeMe,100);
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
	playerBorder = parseInt($j('#playerBorder').val());
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
	$j('#customizationPageTwo').show();
	$j('#previewDiv').show();
	resize();
}

function pageTwoNext(){
	finish();
}

function pageTwoBack(){
	hide();
	$j('#customizationPageOne').show();
	$j('#previewDiv').show();
	resize();
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
					+ "var playerBorder = '" + playerBorder + "';\n"
					+ "var backgroundColor = '" + backgroundColor + "';\n"
					+ "var borderColor ='" + borderColor + "';\n"
					+ "var captionTextColor ='" + captionTextColor + "';\n"
					+ "var captionBackgroundColor ='" + captionBackgroundColor + "';\n"
					+ "var arrowColor = '" + arrowColor + "';\n"
					+ "var arrowBackgroundColor = '" + arrowBackgroundColor + "';\n"
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

	$j('#pictureSize').change(function() {
		loadPreview();
		customization();
	});

 	$j( "#pictureScrollSpeed" ).change(function() {
		if( $j.isNumeric( $j('#pictureScrollSpeed').val() ) == false ){
			$j('#pictureScrollSpeed').val(5);
		} else if ($j('#pictureScrollSpeed').val() < 1){
			$j('#pictureScrollSpeed').val(1);
		}
		sliderSpeed = $j('#pictureScrollSpeed').val() * 1000;
		loadPreview();
		customization();
	});

	$j( "#colSize" ).change(function() {
		loadPreview();
		customization();
		resize();
	});
	
	$j('#playerSpeed_slider').on("input change", function() {
		document.getElementById("playerSpeed").value = $j(this).val();
	});

	$j('#playerSpeed_slider').change(function () {
		document.getElementById("playerSpeed").value = $j(this).val();
		sliderSpeed = parseInt($j(this).val()) * 1000;
		$j( "#colSize" ).change();
	});
	
	$j('#pictureHeight_slider').on("input change", function() {
		document.getElementById("pictureHeight").value = $j(this).val();
	});

	$j('#pictureHeight_slider').change(function () {
		document.getElementById("pictureHeight").value = $j(this).val();
		$j( "#colSize" ).change();
	});
	
	$j('#playerBorder_slider').on("input change", function() {
		document.getElementById("playerBorder").value = $j(this).val();
	});

	$j('#playerBorder_slider').change(function () {
		document.getElementById("playerBorder").value = $j(this).val();
		$j( "#colSize" ).change();
	});

	$j("#backgroundColor").spectrum({
		color: backgroundColor,
	 	showAlpha: true,
	 	showInput: true,
	 	move: function(color) {
			backgroundColor = color.toHslString();
			customization();
		},
	 	hide: function(color) {
			backgroundColor = color.toHslString();
			customization();
		}
	});

	$j("#borderColor").spectrum({
		color: borderColor,
	 	showAlpha: true,
	 	showInput: true,
	 	move: function(color) {
			borderColor = color.toHslString();
			customization();
		},
	 	hide: function(color) {
			borderColor = color.toHslString();
			customization();
		}
	});

	$j("#arrowColor").spectrum({
		color: arrowColor,
	 	showAlpha: true,
	 	showInput: true,
	 	move: function(color) {
			arrowColor = color.toHslString();
			customization();
		},
	 	hide: function(color) {
			arrowColor = color.toHslString();
			customization();
		}
	});

	$j("#arrowBackgroundColor").spectrum({
		color: arrowBackgroundColor,
	 	showAlpha: true,
	 	showInput: true,
	 	move: function(color) {
			arrowBackgroundColor = color.toHslString();
			customization();
		},
	 	hide: function(color) {
			arrowBackgroundColor = color.toHslString();
			customization();
		}
	});

	$j("#navColor").spectrum({
		color: navColor,
	 	showAlpha: true,
	 	showInput: true,
	 	move: function(color) {
			navColor = color.toHslString();
			customization();
		},
	 	hide: function(color) {
			navColor = color.toHslString();
			customization();
		}
	});

	$j("#navBackgroundColor").spectrum({
		color: navBackgroundColor,
	 	showAlpha: true,
	 	showInput: true,
	 	move: function(color) {
			navBackgroundColor = color.toHslString();
			customization();
		},
	 	hide: function(color) {
			navBackgroundColor = color.toHslString();
			customization();
		}
	});

	$j("#captionBackgroundColor").spectrum({
		color: captionBackgroundColor,
	 	showAlpha: true,
	 	showInput: true,
	 	move: function(color) {
			captionBackgroundColor = color.toHslString();
			customization();
		},
	 	hide: function(color) {
			captionBackgroundColor = color.toHslString();
			customization();
		}
	});

	$j("#captionTextColor").spectrum({
		color: captionTextColor,
	 	showAlpha: true,
	 	showInput: true,
	 	move: function(color) {
			captionTextColor = color.toHslString();
			customization();
		},
	 	hide: function(color) {
			captionTextColor = color.toHslString();
			customization();
		}
	});
});