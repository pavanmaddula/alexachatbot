
		'use strict';
		const request = require("request");
		const Alexa=require('alexa-sdk');
		var rows,rows1,speecht='hi';
		var listarray = [];
		 
		const APP_ID='amzn1.ask.skill.de8e5974-f9f7-4031-a3b8-d6a82785ddad';
		const key = "1PSRyQ2nKESErf2xicokVGuoO1sQclll7ZGLiIs-7q_U";
		 const url = "https://spreadsheets.google.com/feeds/list/"+key+"/od6/public/values?alt=json";
		exports.handler = function(event, context, callback) {
		  
		  const alexa=Alexa.handler(event,context,callback);
		  alexa.APP_ID=APP_ID;
		  alexa.registerHandlers(handlers);
		  alexa.execute();

		};
		var handlers={

			'LaunchRequest':function(){
				this.emit(':ask','this is  the response from google sheets kindly say hi');
			},
			'googlesheet':function(event){
				request({
		    json: true,
		    url: url
		  }, function (error, response, body) {
		    if (error || response.statusCode !== 200) return

		    let parsed = body.feed.entry.map( (entry) => {
		    	        
		       
		      rows = entry.title["$t"]

		       listarray.push(rows);
		      // console.log(listarray);

		       // "updated": entry.title[1]
		       
               //console.log(typeof(rows));
		      
               
		      // Dynamically add all relevant columns from the Sheets to the response
		     /* Object.keys( entry ).forEach( (key) => {
		        if ( /gsx\$/.test(key) ) {
		          let  newKey = key.replace("gsx$", "");
		          rows[newKey] = entry[key]["$t"];
		          

		          var speechOutput=rows[newKey];
		         
		          speecht=speechOutput;
		           }
		     return row		      });*/
		      //console.log(rows);
		      
		     
		 })
		console.log('this is the output from list array',listarray[0]);
		
		      
		 });
				
				
		        this.emit(':ask',listarray);
	            listarray=[];

		 },
			'AMAZON.HelpIntent': function () {
		        const speechOutput = HELP_MESSAGE;
		        const reprompt = HELP_REPROMPT;

		        this.response.speak(speechOutput).listen(reprompt);
		        this.emit(':responseReady');
		    },
		    'AMAZON.CancelIntent': function () {
		        this.response.speak(STOP_MESSAGE);
		        this.emit(':responseReady');
		    },
		    'AMAZON.StopIntent': function () {
		        this.response.speak(STOP_MESSAGE);
		        this.emit(':responseReady');
		    },

		};
