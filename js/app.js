var currentRow = 0;
var rows = 6;
var rowCellIDs = [];

//create row and cell HTML
for (i = 0; i < rows; i++) {
  var rowID = "beatRow" + i;
  var cellCount = 4;
  var cellArray = [];

  // var row = "<div class='beatRow' id='"+rowID+"'>"+cellArray+"</div>";
  var row = "<div class='beatRow' id='"+rowID+"'></div>";
  $('#beatGrid').append(row);

  //create cells for each row
  for (c =0; c < cellCount; c++) {
    var cellID = "row"+i+"Cell"+c;
    var cellRepID = cellID+"Rep";
    var cell = "<div class='beatCell' id='"+cellID+"'><div id='"+cellRepID+"' class='clickThrough'></div></div>";
    rowCellIDs.push(cellID);
    $('#'+rowID).append(cell);
  }
}

rowCellIDs.map( cell => {
  var colorPicker = new iro.ColorPicker( "#"+cell, {
     width: 72,
  })
  colorPicker.on('color:change', function() {
    onColorChange(colorPicker, "#"+cell);
  });
});

function onColorChange(colorPicker, id) {
  var cellID = id.replace("#", "")+"Rep";
  var rep = document.getElementById(cellID);
  rep.style.backgroundColor = colorPicker.color.hexString;
}

//play timer function
function play() {
  console.log("start play");
  //every X seconds
  setInterval(function(){

    //move marker
    transtionMarker();

    //play noise
    console.log("play row " + currentRow);
    playRow(currentRow);

    //update which row to play next
    currentRow++;
    if (currentRow >= rows) {
      currentRow = 0;
    }

  }, 1000);
}

// hold synth audio info
var synthF = new AudioSynth;
var synthFOctave = 3;
var synthFDuration = 3;
var synthA = new AudioSynth;
var synthAOctave = 3;
var synthADuration = 3;
var synthC = new AudioSynth;
var synthCOctave = 3;
var synthCDuration = 3;
var synthE = new AudioSynth;
var synthEOctave = 3;
var synthEDuration = 3;

//play noise for passed row int
function playRow(rowInt) {
  //find how many cell instruments need to be created
  var cellCount = document.getElementById("beatRow" + rowInt).childElementCount;

  //get color for each cell rep and add to array
  var cellColorArray = [];
  for (i = 0; i < cellCount; i++) {
    var rgb = $("#row"+rowInt+"Cell"+i+"Rep").css("background-color");
    rgb = rgb.replace(/[^\d,]/g, '').split(',');
    cellColorArray.push(rgb);
  }

  //if color is black dont play not
  if (!cellColorArray[0].every((val, i, arr) => val === arr[0])) {
    updateInstrument("F", cellColorArray[0]);
    synthF.play("piano", 'F', synthFOctave, synthFDuration);
  }
  if (!cellColorArray[1].every((val, i, arr) => val === arr[0])) {
    updateInstrument("A", cellColorArray[1]);
    synthA.play("piano", 'A', synthAOctave, synthADuration);
  }
  if (!cellColorArray[2].every((val, i, arr) => val === arr[0])) {
    updateInstrument("C", cellColorArray[2]);
    synthC.play("piano", 'C', synthCOctave, synthCDuration);
  }
  if (!cellColorArray[3].every((val, i, arr) => val === arr[0])) {
    updateInstrument("E", cellColorArray[3]);
    synthE.play("piano", 'E', synthEOctave, synthEDuration);
  }

}

//updates sound of passed synth based on color provided
function updateInstrument(synth, rgb){

  //R = octave (scale 1-5 based on 0-255 percentage rounded)
  var r = Math.round((rgb[0]*5)/255);

  //G = Sample (scale 5000-100000 based on 0-255)
  var sampleMin = 5000;
  var sampleMax = 100000;
  var percentMax = sampleMax - sampleMin;
  var g = Math.round((((rgb[1]*percentMax)/255) + sampleMin));

  //B = Duration (scale 1-4 bason on 0-255)
  var b = Math.round((rgb[2]*5)/255);

  //update instruments
  if (synth === "F") {
    synthFOctave = r;
    synthF.setSampleRate(g);
    synthFDuration = b;
  }
  if (synth === "A") {
    synthAOctave = r;
    synthA.setSampleRate(g);
    synthADuration = b;
  }
  if (synth === "C") {
    synthCOctave = r;
    synthC.setSampleRate(g);
    synthCDuration = b;
  }
  if (synth === "E") {
    synthEOctave = r;
    synthE.setSampleRate(g);
    synthEDuration = b;
  }
}

function transtionMarker() {
  var markerY = currentRow * 90;
  $("#playMarker").css("transform","translate(0,"+markerY+"px)");
}
