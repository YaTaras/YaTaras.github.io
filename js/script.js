 $(document).ready(function() {


//--------------START---------------CONTENT SELECTION---------------------------//
var counter = 0;
function selectHTML(tagName) {
    try {
        if (window.ActiveXObject) {
            var createdRange = document.selection.createRange();
            return createdRange.htmlText;
        }    
        var newNode = document.createElement(tagName);
        newNode.setAttribute("id", "element"+(++counter));
        var wrapSelection = getSelection().getRangeAt(0);
        wrapSelection.surroundContents(newNode);
        return newNode.innerHTML;
    } catch (e) {
        if (window.ActiveXObject) {
            return document.selection.createRange();
        } else {
            return getSelection();
        }
    }
}
//--------------END---------------CONTENT SELECTION---------------------------//



//--------------START-------------OPERATIONS WITH CONTENT---------------------//
$(function() {
    $('#boldBtn').click( function() {
        var mytext = selectHTML("span");
        $("#element"+(counter)).css({"fontWeight":"800"});
    });
});

$(function() {
    $('#italicBtn').click( function() {
        var mytext = selectHTML("span");
        $("#element"+(counter)).css({"fontStyle":"italic"});
    });
});

$(function() {
    $('#underlineBtn').click( function() {
        var mytext = selectHTML("span");
        $("#element"+(counter)).css({"textDecoration":"underline"});
    });
});

$(function() {
    $('#kegel').change( function() {
        var mytext = selectHTML("span");
        var kegelSize = $('#kegel').val();
        $("#element"+(counter)).css({"fontSize": kegelSize+"pt"});
    });
});

$(function() {
    $('#alignLeftBtn').click( function() {
        var mytext = selectHTML("b");
        $("#editableArea").css({"textAlign":"left"});
    });
});
$(function() {
    $('#alignCenterBtn').click( function() {
        var mytext = selectHTML("span");
        $("#editableArea").css({"textAlign":"center"});
    });
});
$(function() {
    $('#alignJustifyBtn').click( function() {
        var mytext = selectHTML("span");
        $("#editableArea").css({"textAlign":"justify"});
    });
});


$(function() {
    $('#bulletListBtn').click( function() {
        var mytext = selectHTML("li");
    });
});
//--------------END-------------OPERATIONS WITH CONTENT----------------------//



//--------------START---------------UNDO/REDO/SAVE---------------------------//
var arr = [];
var str = '';
var historyCounter = arr.length-1;

$('#editableArea').bind("keyup", function(){
  saveChanges();
  $('#redoBtn').prop('disabled', true).addClass("passiveBtn").removeClass("activeBtn");
  $('#undoBtn').prop('disabled', false).addClass("activeBtn").removeClass("passiveBtn");
  $('#saveBtn').prop('disabled', false).addClass("activeBtn").removeClass("passiveBtn");
});

function saveChanges () {
	var str = '<div>' + $("#editableArea").clone().html() + '</div>';
        arr.push(str);
        historyCounter++;
}

$(function() {
    $('#undoBtn').click( function() {
    	$('#saveBtn').prop('disabled', false).addClass("activeBtn").removeClass("passiveBtn");
    	--historyCounter;
    	str = arr[historyCounter];
    	$("#editableArea").html("");
    	$( str ).appendTo( "#editableArea" );   
    	if(historyCounter<=arr.length-1) {
    		$('#redoBtn').prop('disabled', false).addClass("activeBtn").removeClass("passiveBtn");
    	} 
    	if(historyCounter<=-1) {
    		$('#undoBtn').prop('disabled', true).addClass("passiveBtn").removeClass("activeBtn");
    	} 
    });
});

$(function() {
    $('#redoBtn').click( function() {
    	$('#saveBtn').prop('disabled', false).addClass("activeBtn").removeClass("passiveBtn");
    	$('#undoBtn').prop('disabled', false).addClass("activeBtn").removeClass("passiveBtn");
    	++historyCounter;
    	str = arr[historyCounter];
    	$("#editableArea").html("");
    	$( str ).appendTo( "#editableArea" );
    	if(historyCounter>=arr.length-1) {
    		$('#redoBtn').prop('disabled', true).addClass("passiveBtn").removeClass("activeBtn");
    	}
    });
});

$(function() {
    $('#saveBtn').click( function() {
    	arr = [];
    	historyCounter = arr.length-1;
    	$('#redoBtn').prop('disabled', true).addClass("passiveBtn");
  		$('#undoBtn').prop('disabled', true).addClass("passiveBtn");
  		$('#saveBtn').prop('disabled', true).addClass("passiveBtn");
    });
});
//---------------END--------------UNDO/REDO/SAVE---------------------------//



//---------------START--------------DROP-DOWN IMG---------------------------//
var handleDrag = function(e) {
        e.stopPropagation();
        e.preventDefault();
    };

var handleDrop = function(e) {
    e.stopPropagation();
    e.preventDefault();
    x = e.clientX;
    y = e.clientY;
    var file = e.dataTransfer.files[0];
    if (file.type.match('image.*')) {

    var reader = new FileReader();

    reader.onload = (function(theFile) {
        var dataURI = theFile.target.result;
        var img = document.createElement("img");
        img.src = dataURI;
			if (document.caretRangeFromPoint) {
		    range = document.caretRangeFromPoint(x, y);
		    range.insertNode(img);
		}
        });
        reader.readAsDataURL(file);
    }
};

var dropZone = document.getElementById('editableArea');
dropZone.addEventListener('dragover', handleDrag, false);
dropZone.addEventListener('drop', handleDrop, false);
//---------------END--------------DROP-DOWN IMG---------------------------//


});