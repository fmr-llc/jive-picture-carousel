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
This is the Javascript library that drives the Picture Carousel widgets.

WIDGET DESCRIPTION
This Jive HTML widget loads in a Jive setup document with four columns in the table.
The table content is parsed into a Bootstrap slider.  The timing and colors in the UI 
are configurable via the builder app.
*/
var fidosreg_id = 'b764a0a9536448345dc227af95e192521d337b5e4c3560c859b89ecd0407004a';

var isIE =new Boolean(false);
var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");
var IEVersion = parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)));
if(IEVersion <= 8) {
	isIE = true;
}

var content_area_class = '#jive-body-main div.jive-rendered-content';
var enabled_slide_debug = false;	//Enables console.log messages in Firefox and disables the Presentation from being produced. Setting this to true, will allow you to see if your content is being pulled in properly. When you are confident your content is pulled in correctly set this to false.  

var insertHtml	= "<div id='mainContainer'>\n"
				+ "<div id='myCarousel' class='carousel slide' data-interval='" + sliderSpeed + "' data-ride='carousel'>\n"
				+ "<ol class='carousel-indicators'>\n"
				+ "</ol>\n"
				+ "<div class='carousel-inner' id='innerCarousel'>\n"
				+ "</div>\n"
				+ "<a class='left carousel-control' href='#myCarousel' data-slide='prev'>‹</a>\n"
				+ "<a class='right carousel-control' href='#myCarousel' data-slide='next'>›</a>\n"
				+ "</div>\n"
				+ "</div>\n"
				+ "<br/>\n"
				+ "<div id='docTable' style='display:none;'>\n"
				+ "</div>\n";

function init(){
	function log(msg){
		if (typeof console === "undefined" || typeof console.log === "undefined") return false;
		console.log(msg);
	}
	if(enabled_slide_debug) {
		log('Presentation: Content Page = ' + sourceURL);
	}

	if(!sourceURL) {
		return false;
	}

	// Do a jquery .load of the source table document, and only bring in the data defined with the content_area_class element
	$j("#docTable").load(sourceURL + ' ' + content_area_class, function(response, status, xhr) {

		if (status == "error") {
			log("Presentation: Sorry but there was an error: Most likly reason is because your sourceURL variable is not pointing to a valid document");
			return false;
		}

		// Check to see if there is a table in the docTable
		if($j('#docTable table').length < 1) {
			log('Presentation: No HTML returned from AJAX call, please check presentation_area_class and sourceURL variables. You may not have created the table in the source content document.');
			return false;
		}

		// Check to make sure there are at least two table rows
		if($j('table tr', '#docTable').length < 2) {
			log('Presentation: table does not have at least 2 rows, please properly create your content table.');
			return false;
		} 
		
		loadTableData();
		reSize();
	}); //end load

	
	$j(function(){
		$j(".carousel-control").click(function() {
    		$j(this).blur();
		});
	});
} // end init function

function loadTableData() {
	// set variables for temporarily storing table data
	var subSection = false;

	//Checks to see if the doc has a table
	if ($j('#docTable table').length < 1) {
		log('Presentation: No table exists in the content.  Please correct your presentation document.');
		return false;
	}
			
	// Get the number of rows in the table
	var tableRows = $j('#docTable tbody:first > tr');
	$numRows = tableRows.length;

	if(enabled_slide_debug) {
		log('Presentation: total number of table rows: ' + $numRows);
	}

	// Loop over the rows and place them in the accordion.
	var indicatorHTML = '';
	var carouselHTML = '';
	var titleHtml = '';
	var captionHtml = '';
	var picSource = '';
	var picWidth = '';
	var picHeight = '';
	var UrlHtml = '';
	for(var i=0; i < $numRows; i++){
		indicatorHTML += '<li data-target="#myCarousel" data-slide-to="' + i + '"';
		if (i == 0){
			indicatorHTML += ' class="active"';
		}
		indicatorHTML += '></li>';

		//Grabs the content in the table row.
		titleHtml = $j('#docTable tbody:first > tr:eq('+i+') td:eq(0)').html();
		captionHtml = $j('#docTable tbody:first > tr:eq('+i+') td:eq(1)').html();
	 	picSource = $j('#docTable tbody:first > tr:eq('+i+') td:eq(2)').find('img').parent().attr('href');
	 	picWidth = $j('#docTable tbody:first > tr:eq('+i+') td:eq(2)').find('img').attr('width');
	 	picHeight = $j('#docTable tbody:first > tr:eq('+i+') td:eq(2)').find('img').attr('height');
		UrlHtml = $j('#docTable tbody:first > tr:eq('+i+') td:eq(3)').find('a').attr('href');
		
		carouselHTML += '<div class="item';
		if (i == 0){
			carouselHTML += ' active';
		} 
		carouselHTML += '">\n';

		if (UrlHtml){
			carouselHTML += "<a href='" + UrlHtml + "' class='jive-link-custom' target='new'>\n"
		}
		carouselHTML += "<img src='" + picSource + "' style='margin:auto;' id='image" + (i+1) + "' width='" + picWidth + "' height='" + picHeight + "'></img>\n";
		if (UrlHtml){
			carouselHTML += "</a>\n";
		}
		carouselHTML += "<div class='carousel-caption'>\n"
        			  + "<h3 class='carousel-title' style='text-shadow: -1px 0 black, 0 1.5px black, 1.5px 0 black, 0 -1px black;'>" + titleHtml + "</h3>\n"
        			  + "<p>" + captionHtml + "</p>\n"              
					  + '</div>\n</div>\n\n'; 
	} // end for loop
	
	// Append the loop HTML to the resultArea
	$j('.carousel-indicators').html(indicatorHTML);
	$j('#innerCarousel').html(carouselHTML);
	customization();
	resizeCarousel();
	reSize();
} // end loadTableData function

function customization(){
	$j('#innerCarousel').height(sliderHeight);
	$j('#myCarousel').attr('data-interval', sliderSpeed);
	$j('.item').css({'background-color' : backgroundColor});
	$j('#mainContainer').css({'border': playerBorder + "px solid " + borderColor});
	$j('a.carousel-control').css({
		'color': arrowColor,
		'background-color': arrowBackgroundColor,
		'border-color': arrowColor
	});
	$j('.carousel-indicators li').css({
		'color': navColor,
		'background-color': navBackgroundColor,
		'border-color': navColor
	});
	$j('.carousel-title').css({'color': captionTextColor});

	if($j('#innerCarousel').width() > 225 ){
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
	}else{
		$j('.carousel-caption').hide();
	}
	$j('.carousel').carousel();
} 

function resizeImage(imageID, containerHeight, containerWidth){
	if (pictureSize == 'stretch') {
		$j('#' + imageID).width( parseInt(containerWidth) );
		$j('#' + imageID).height( parseInt(containerHeight) );
	} else if ( pictureSize == 'aspect' ) {
		var startWidth = parseInt($j('#' + imageID).attr('width'));
		var startHeight = parseInt($j('#' + imageID).attr('height'));

		containerHeight = parseInt(containerHeight);
		containerWidth = parseInt(containerWidth);
		var ratio = startWidth/startHeight;

		if(startHeight > containerHeight){
			var changeHeight = startHeight - containerHeight;
			if (ratio < 1) {
			    startWidth = startWidth - Math.round(changeHeight * ratio);
			} else if(ratio > 1){
				startWidth = startWidth - Math.round(changeHeight / ratio);
			} else {
				startWidth = startWidth - changeHeight;
			}
		}else if(startHeight < containerHeight){
			var changeHeight = containerHeight - startHeight;
			if (ratio < 1) {
			    startWidth = startWidth + Math.round(changeHeight / ratio);
			} else if(ratio > 1){			
				startWidth = startWidth + Math.round(changeHeight * ratio);
			} else {
				startWidth = startWidth + changeHeight;
			}
		}else{
			//return false;
		}

		startHeight = containerHeight;
		ratio = startWidth/startHeight;

		// The new width is to large for the container
		if(startWidth > containerWidth){
			var changeWidth = startWidth - containerWidth;
			if (ratio < 1) {
			    startHeight = startHeight - Math.round(changeWidth * ratio);
			} else if(ratio > 1){			
				startHeight = startHeight - Math.round(changeWidth / ratio);
			} else {
				startHeight = startHeight - changeWidth;
			}
			startWidth = containerWidth;
		}
		$j('#' + imageID).width(startWidth);
		$j('#' + imageID).height(startHeight);
	}
}

function resizeCarousel() {
	$j.each($j('#innerCarousel').find('img'), function(i,item){
		resizeImage($j(item).attr('id'), sliderHeight, $j('#innerCarousel').width());
	});
	reSize();
}

function reSize() {
	setTimeout(resizeMe,250);
}

$j(document).ready(function() {
	if (typeof sliderSpeed === 'undefined') {
    	var sliderSpeed = 5000;
    }
	if (typeof playerBorder === 'undefined') {
    	var playerBorder = 0;
    }
});