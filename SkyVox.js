function pipe(data, tts) {
	console.log('pipe > '  + data);
  var fs = require('fs');
	fs.writeFile("\\\\.\\pipe\\SkyVox", data , function(err) {
	    if(err) {
		    console.error(err);
	           tts({'tts':'erreur...'});
			 console.log("erreur !!!!!!!");
	    }
	}); 
}

exports.action = function(data, tts){
	if(data._action == 'ActionLoadSaveItem') {
		return actionLoadSaveStuff(data, tts);
	}

}


function actionLoadSaveStuff(data, tts) {
		//console.log(data)
	output = '';
	speak = '';

	if(data._do == 'loaditem') {
	    //speak = 'sort ';
    }
    speak += data._name;


	if(data._do == 'save') {
	    speak += ' enregistré';
	    output = 'save ' +  data._item;
	}
	if(data._do == 'load') {
        output = 'load ' + data._item;
        if(data._double !== undefined) {
            speak += ' double';
            output += ' double';
        } else if(data._gauche !== undefined) {
            output += ' left';
        } else {
        	speak += ' chargé';
        }
	}

    pipe(output,tts);
    tts({'tts':speak});
}