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
  // console.log(cellColorArray);
  //create instrument for each
  var synthF = Synth.createInstrument('piano');
  var synthA = Synth.createInstrument('piano');
  var synthC = Synth.createInstrument('piano');
  var synthE = Synth.createInstrument('piano');

  //play sound
  if (cellColorArray[0].every(x => x != "0")) {
    synthF.setVolume(0.0);
  } else {
    synthF.setVolume(1.0);
  }
  if (cellColorArray[1].every(x => x != "0")) {
    synthA.setVolume(0.0);
  } else {
    synthA.setVolume(1.0);
  }
  if (cellColorArray[2].every(x => x != "0")) {
    synthC.setVolume(0.0);
  } else {
    synthC.setVolume(1.0);
  }
  if (cellColorArray[3].every(x => x != "0")) {
    synthE.setVolume(0.0);
  } else {
    synthE.setVolume(1.0);
  }

  synthF.play('F', 4, 2);
  synthA.play('A', 4, 2);
  synthC.play('C', 4, 2);
  synthE.play('E', 4, 2);
}
