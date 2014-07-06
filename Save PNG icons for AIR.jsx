/*
***********************************************************
	Save Air icons
	
	Developed by Behrooz Tahanzadeh (http://b-tz.com)
	
	Copyright 2014 License: GNU GPL v3 http://www.gnu.org/licenses/gpl-3.0.html
	
***********************************************************
*/




// uncomment to suppress Illustrator warning dialogs
// app.userInteractionLevel = UserInteractionLevel.DONTDISPLAYALERTS;

//Default PNG widths in pixel. Change it if you want to add custom sizes.
var sizes = [128,114,72,57,48,36,32,16];

//Call main function at the beginning
main();




/**
	This is main function, wraps other functionality of this script.
	I prefer to put everything in a single function block. It will make your code more clear.
*/
function main()
{
	if(app.documents.length <= 0)
	{
		alert('Open/Create a document before running this script!');
		return;
	}
	
	var c = true;
	
	if(app.activeDocument.width != app.activeDocument.height)
		c = confirm("It's recommended to use square shape art board! Do you want to continue?");
		
	if(c)
	{
		var destFolder = Folder.selectDialog( 'Select the folder where you want to save the PNG files.', '~' );
	
		if(destFolder != null)
		{
			var name = prompt('Choose a name for exported files. Eg: icon_', '');
			
			if(name != null)
			{
				savePngFiles(destFolder, name);
				saveInfoFiles(destFolder, name);
			}
		}
	}
}//eof




/**
	Returns the options to be used for the generated PNG files.
	
	@param width the name of the document
	@return ExportOptionsPNG24
*/
function getPNGOptions(width)
{
	var exportOptions = new ExportOptionsPNG24();
	
	exportOptions.artBoardClipping = true;
	exportOptions.verticalScale = exportOptions.horizontalScale = (width*100)/app.activeDocument.width;
	
	return exportOptions;
}//eof




/**
	Save PNG file in given directory
	
	@param destFolder given directory
	@param name given file name. Each image width will be append to the end of file name.
*/
function savePngFiles(destFolder, name)
{
	for(var i=0; i<sizes.length; ++i)
	{
		var opt = getPNGOptions(sizes[i]);
		saveInFile = new File( destFolder + '/' + name+sizes[i] );
		var type = ExportType.PNG24;
		
		app.activeDocument.exportFile( saveInFile, type, opt);
	}
}//eof




/**
	Save Info file
	
	@param destFolder given directory
	@param name given file name. Each image width will be append to the end of file name.
*/
function saveInfoFiles(destFolder, name)
{
	saveInFile = new File( destFolder + '/' + name+"info.xml" );
	
	saveInFile.open("w", "TEXT");
	
	saveInFile.writeln("<icon>");
	
	for(var i=0; i<sizes.length; ++i)
		saveInFile.writeln("\t<image"+sizes[i]+"x"+sizes[i]+">"+name+sizes[i]+".png<\/image"+sizes[i]+"x"+sizes[i]+">");
	
	saveInFile.writeln("<\/icon>");
	
	saveInFile.close();
}//eof