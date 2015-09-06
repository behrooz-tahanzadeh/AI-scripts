/*
***********************************************************
	Remove Open Paths From Selection
	
	Developed by Behrooz Tahanzadeh (http://b-tz.com)
	
	Copyright 2014 License: GNU GPL v3 http://www.gnu.org/licenses/gpl-3.0.html
	
***********************************************************
*/

if(documents.length>0)
{
	if(activeDocument.selection.length>0)
	{
		var allPaths = activeDocument.selection;
		var allPathsCount = allPaths.length;
		var notPath = 0;
		var notClosed = 0;
		
		if(confirm("Paths number:"+allPathsCount+"\nDo you want to continue?"))
		{
			for (var i=0; i<allPathsCount; i++)
			{
				if(allPaths[i].typename=="PathItem")
				{
					if(!allPaths[i].closed)
					{
						allPaths[i].selected = false;
						notClosed++;
					}
				}
				else
				{
					allPaths[i].selected = false;
					notPath++;
				}
			}
			
			alert("Done!\n\nNumber of open paths: "+notClosed+"\nNumber of not path items: "+notPath);
		}
	}
	else
	{
		alert("Select target path items and then run this script...!");
	}
}