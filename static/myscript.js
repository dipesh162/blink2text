// console.log("DSFD");

var row0=table.rows[0];

function createTable(){

	var table=document.getElementById("table");
	var ascii='A'.charCodeAt();
	var row;

	for(var i=0;i<5;i++){
		
		var tr=table.insertRow();
		tr.id="r"+(i+1);
		
		row=table.rows[i];

		for(var j=0;j<5;j++){
			var td=tr.insertCell();
			
			td.innerHTML=row.cells[j].innerHTML;
			row.cells[j].innerHTML=String.fromCharCode(ascii+i*5+j);				
			
			td.id="r"+(i+1)+"c"+j;
		}
	}
	document.getElementById("r0").style.visibility="visible";
}

createTable();


var rowCount=0,columnCount=0,rowSize=6,colSize=5, delay=1500, blink = 0 ;

//Return Previous value of Count
function getPrevious(count,size){

	return (count-1+size)%size;
}

function getNext(count,size){
	return (count+1)%size;
}

function rowHighlight(){	
	var curr,pre;
	
	//get previous row
	pre=document.getElementById( "r" + getPrevious(rowCount,rowSize) );

	//get current row
	curr=document.getElementById( "r" + rowCount);

	//check if previous row is highlighted; if so then remove marker
	if(pre.classList.contains("danger"))
		pre.classList.remove("danger");

	//highlight the current row
	curr.classList.add("danger");

	//Increment Count
	rowCount=getNext(rowCount,rowSize);
}

function columnHighlight()
{
	var curr,pre;		

	document.getElementById( "r" + getPrevious(rowCount,rowSize)).classList.remove("danger");

	// get Previous column
	pre=document.getElementById("r" + getPrevious(rowCount,rowSize) + "c" + getPrevious(columnCount,colSize) );

	// get Current Column
	curr=document.getElementById("r" + getPrevious(rowCount,rowSize) + "c" + columnCount);

	console.log("r" + getPrevious(rowCount,rowSize) + "c" + getPrevious(columnCount,colSize));

	if(pre.classList.contains("success"))
		pre.classList.remove("success");

	curr.classList.add("success");

	columnCount=getNext(columnCount,colSize);
}

function cleaRowHighlighter()
{
	clearInterval(rowInterval);

	columnCount=0;
	columnInterval=setInterval(columnHighlight,delay);
}


function restart()
{
	clearInterval(columnInterval);
	
	document.getElementById("r" + getPrevious(rowCount,rowSize) + "c" + getPrevious(columnCount,colSize) ).classList.remove("success");

	var ch=document.getElementById("r" + getPrevious(rowCount,rowSize) + "c" + getPrevious(columnCount,colSize) ).innerHTML;

	var text=document.getElementById("sentence");

	switch(ch){

		case "&lt;--": text.innerHTML=text.innerHTML.slice(0,-1);
			 		break;
		case "CLR": text.innerHTML="";
					break;
		default : text.innerHTML+=ch;
	}
	rowCount=getPrevious(rowCount,rowSize);
	rowInterval=setInterval(rowHighlight,delay);
}

var rowInterval=setInterval(rowHighlight,delay);

function loop (){
	blink += 1;
	blink %= 2;

	if(blink % 2){
		cleaRowHighlighter();
	}

	else{
		restart();
	}
}

