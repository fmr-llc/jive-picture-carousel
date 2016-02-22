Jive - Picture Carousel Widget
==============================
<p><img src="docs/picture-carousel.jpg" /></p>
The Picture Carousel widget is a great tool for controlling site navigation, both in and out of your [Jive](https://community.jivesoftware.com/welcome) instance.  This is an HTML widget project that guides users through related sites, helps them navigate through complex business units, and organizes your site topics and eases access in your community.  Creating a Picture Carousel in your site is now as simple as creating a Jive document with a bullet list of your Picture Carousel items.  A builder application takes the setup document and generates the code for you.

Prerequisite
------------
The [Content Lookup](https://github.com/fmr-llc/jive-content-lookup) widget installation has essential parts of setting up this widget project.  Make sure to install this widget prior to continuing with the Picture Carousel widget installation.

Upload Picture Carousel Libraries
---------------------------------
* Download this project's Zip archive and extract it to your local computer.
* Log into your Jive community.
* Navigate to the upload location for your library files.
* Create an Uploaded File in the Library location of your Jive community.  Drag the file "picture_carousel_widget_builder.css" to the file section of the upload.  Set the file name to "Picture Carousel Widget Builder CSS Library", put a description of your choosing, tag it, set the authors, and make sure it is being published to the correct Library location.  Click Publish.
* Create another Uploaded File in the Library location of your Jive community.  Drag the file "picture_carousel_widget_builder.js" to the file section of the upload.  Set the file name to "Picture Carousel Widget Builder JavaScript Library", put a description of your choosing, tag it, set the authors, and make sure it is being published to the correct Library location.  Click Publish.

Download Spectrum
-----------------
[Spectrum Color Picker](https://github.com/bgrins/spectrum) is a library that several of these widget projects will use for customizing your preferences.  You will need to check if you have this installed from a previous widget installation.  If not, you need to obtain a copy of this library and store specific files in your Jive instance for use.  Follow these instructions to check for status, and download the latest version and upload to your community if required:
* Use the Content Lookup widget to search for "Spectrum JavaScript Library".  If the file is returned in the search, you can assume it is already installed, and can skip the rest of this section.  Otherwise, continue with the below steps to download Spectrum and install it in your Jive installation.
* Click [Spectrum download](https://github.com/bgrins/spectrum/archive/master.zip) to get the latest version or use a version used by your front end developers.
* (Optional) Perform any required security checks on the downloaded code.
* Extract the zip file to your computer.
* Log into your Jive community.
* Navigate to the upload location for your library files.
* Create an Uploaded File in the Library location of your Jive community.  Look in the Spectrum archive on your computer.  Expand the dist folder.  Drag the file "spectrum.css" to the file section of the upload.  Set the file name to "Spectrum CSS Library", put a description of your choosing, tag it, set the authors, and make sure it is being published to the correct Library location.  Click Publish.
* Create another Uploaded File in the Library location of your Jive community.  Go back to the Spectrum archive.  Drag the file "spectrum.js" to the file section of the upload.  Set the file name to "Spectrum JavaScript Library", put a description of your choosing, tag it, set the authors, and make sure it is being published to the correct Library location.  Click Publish.

Update Library Loader
---------------------
* Use the Content Lookup widget to search for "Library Loader".  Click the link to the file in the results.  If it is not found, contact your administrator.
* Download a copy of the "Library Loader" file from your community.  Open it for editing.
* Go back to the Content Lookup widget and search for "Picture Carousel Widget".  You should see the two library files you uploaded to your community above.
* Find the search result for "Picture Carousel Widget Builder CSS Library" and copy its Content ID.  It should be a number like 694225.
* Update the library_loader.js file line for "picture_carousel_widget_builder.css" and update the content ID variable (it should be 0 before updating) to the Content ID.  The result should look similar to:
```
	libraries['picture_carousel_widget_builder.css'] = { contentID: '694225' };
```
* Find the search result for "Picture Carousel Widget Builder JavaScript Library" and copy its Content ID.  It should be a number like 694226.
* Update the library_loader.js file line for "picture_carousel_widget_builder.js" and update the content ID variable (it should be 0 before updating) to the Content ID.  The result should look similar to:
```
	libraries['picture_carousel_widget_builder.js'] = { contentID: '694226' };
```
* If you installed Spectrum (did not skip the section above), then perform these steps:
  * Use the Content Lookup widget to search for "Spectrum".  You should see results for the CSS and Javascript libraries uploaded above.
  * Find the search result for "Spectrum CSS Library" and copy its Content ID.  It should be a number like 694227.
  * Update the library_loader.js file line for "spectrum.css" and update the content ID variable (it should be 0 before updating) to the Content ID.  If a line for "spectrum.css" is not present in your Library Loader, then just add the line below with the correct Content ID in it.  The result should look similar to:
```
	libraries['spectrum.css'] = { contentID: '694227' };
```
  * Find the search result for "Spectrum JavaScript Library" and copy its Content ID.  It should be a number like 694228.
  * Update the library_loader.js file line for "spectrum.js" and update the content ID variable (it should be 0 before updating) to the Content ID.  The result should look similar to:
```
	libraries['spectrum.js'] = { contentID: '694228' };
```
* Save the changes to the library_loader.js file on your computer.
* Edit the "Library Loader" uploaded file in your Jive community.
* Drag the updated file from your computer to the file section of the uploaded file.  Click Publish.
You have now updated the Library Loader in your Jive community with the library files needed to run the Picture Carousel builder and widgets.

Install the Picture Carousel Builder application
------------------------------------------------
* Use the Content Lookup widget to search for "jQuery Library".  Copy the Content ID.  It should be a number like "694224"
* Look in the Picture Carousel archive on your computer and edit the "picture_carousel_widget_builder.html" file.
* Find the jquery_content_id and replace the zero in the quotes with the Content ID.  The result should look similar to:
```
	var jquery_content_id = "694224";
```
* Go back to the Content Lookup widget and get the Binary URL for "jQuery Library".  It should look similar to:
```
	https://myjiveinstance.mycompany.com/api/core/v3/attachments/file/694224/data
```
* Edit the "picture_carousel_widget_builder.html" file again.
* Find the line:
```
    <script src='JQUERY'></script>
```
replace the text JQUERY with the Binary URL.  It should end up looking similar to:
```
    <script src='https://myjiveinstance.mycompany.com/api/core/v3/attachments/file/694224/data'></script>
```
* Use the Content Lookup widget to search for "Library Loader".  Copy the Content ID.
* Edit the "picture_carousel_widget_builder.html" file again.
* Find the library_loader_content_id and replace the zero in the quotes with the Content ID.  The result should look similar to:
```
	var library_loader_content_id = "694223";
```
* Save the file.
* Go to the site you want to put the Picture Carousel Builder application in your community, and go to the Overview page.
* Manage the Overview page, and drag a new HTML widget into a full page width column on the page.
* Edit the new HTML Widget.
* Copy the updated code from "picture_carousel_widget_builder.html" and paste it into the "Your HTML" entry field in the new widget.
* Click "Save Properties".
* Click "Publish Layout".
<p>Your Picture Carousel Builder is now set up.</p>
<p><img src="docs/picture_carousel-builder.jpg" /></p>
<p>Site admins can use the below instructions to create their own Picture Carousels...</p>

Creating a Picture Carousel Setup document
------------------------------------------
* Create a Jive document.
* The document must consist of a single table with four columns, and one row per picture you want in your carousel.
* Name the columns “Title”, “Caption”, “Picture”, and “Link” for clarity.
* The first column represents the title that will show for the picture.  The second column represents the caption of the picture.  The third column represents the actual picture that will be displayed.  Lastly, the fourth column represents the hyperlink redirected to if the picture is clicked.  Each row you add to the table represents another picture added to the carousel.
<p>NOTE: The only column that is required to be filled is the third column (containing the picture).  Even if you do not have captions, titles, or links you must still have four columns total.</p>
<<<<<<< HEAD
<p><img src="docs/picture_carousel-setup-doc.jpg" /></p>
=======
<p><img src="docs/picture_carousel-widget-setup-doc.jpg" /></p>
>>>>>>> origin/Release
* Once your Picture Carousel setup document is completed, publish the document and copy the URL.

Build the Picture Carousel
--------------------------
* Go to the Overview page that you installed the Picture Carousel Builder application.
<<<<<<< HEAD
  <p><img src="docs/picture_carousel-builder.jpg" /></p>
* Paste the picture carousel setup document URL you copied in the section above.
* Click Next and the format screen displays.
  <p><img src="docs/picture_carousel-format.jpg" /></p>
=======
* Paste the picture carousel setup document URL you copied in the section above.
* Click Next and the format screen displays.
  <p><img src="docs/picture_carousel-widget-format.jpg" /></p>
>>>>>>> origin/Release
  ** Picture Scroll Speed - Number of seconds to delay between slides.
  ** Image Size
    *** Keep Aspect Ratio - Sizes the pictures within the player, but always keeps the original aspect ratio of the picture.
    *** Stretch - Stretches the pictures to fill in the player.
    *** Do Not Resize - Keeps the original picture size.
  ** Column Width - This is a simulation of the jive column widths.  This allows you to get a basic visual of the player within the target column width.
  ** Player Height - Sets the height of the player.
* Click Next to go to the color control.
<<<<<<< HEAD
  <p><img src="docs/picture_carousel-colors.jpg" /></p>
=======
  <p><img src="docs/picture_carousel-widget-colors.jpg" /></p>
>>>>>>> origin/Release
  You can fine-tune the colors with the color selectors for the following:
  ** Background - Any player area revealed when the picture size is not set to Stretch.
  ** Border - Border around the carousel.  This can be set to invisible in the color selector if no border is desired.
  ** Navigation Icons - The control icons for navigation.
  ** Navigation Background - Background of the navigation controls.
  ** Caption - The text color in the captions.
  ** Caption Background - The background of the caption area.
* Once satisfied with your picture carousel configuration, click Next.  This will generate the code for your Picture Carousel widget and highlight it.  Copy the generated code.
* Go to the overview page you want to put the Picture Carousel.
* Drag an HTML Widget into a column.  Make sure to put the widget into a column sufficiently wide to display your Picture Carousel.
* Edit the widget.  Paste the Picture Carousel code.
* Click on Save Properties.
* Publish the page.
<p><img src="docs/picture_carousel.jpg" /></p>

Usage
-----
<p>Once the Picture Carousel is setup and operational, users can utilize the meu items for navigation.</p>
<p>If changes are needed, update the setup document and the Picture Carousel will pull in the updates on the next page refresh.</p>

Issues
------
If your widget is not working as expected, please check out [Issues](docs/issues.md)

Additional Jive-n widget projects in this series
------------------------------------------------
* [Accordion widget](https://github.com/fmr-llc/jive-accordion)
* [Content Lookup](https://github.com/fmr-llc/jive-content-lookup)
* [Content Viewer widget](https://github.com/fmr-llc/jive-content-viewer)
* [Export widget](https://github.com/fmr-llc/jive-export-followers)
* [Form widget](https://github.com/fmr-llc/jive-form)
* [Form Report widget](https://github.com/fmr-llc/jive-form-report)
* [Menu Bar widget](https://github.com/fmr-llc/jive-menu)
* [Presentation widget](https://github.com/fmr-llc/jive-presentation)
* [Search widget](https://github.com/fmr-llc/jive-advanced-search)
* [Team Listing widget](www.github.com/fmr-llc/jive-team-listing)

Contributing
------------
If you would like to contribute to this project, please check out [Contributing](docs/contributing.md)

License
-------
<<<<<<< HEAD
<p>(c) 2015-2016 Fidelity Investments</p>
=======
(c) 2015-2016 Fidelity Investments
>>>>>>> origin/Release
Licensed under the [Apache License](docs/LICENSE), Version 2.0