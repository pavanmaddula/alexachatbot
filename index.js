
			'use strict';
			const request = require("request");
			const Alexa=require('alexa-sdk');
			var rows,rows1,speecht='hi';
			var listarray = [],listarray2=[];
			 
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
					this.emit(':ask','welcome to Aditya institutions,these are the events which is conducted by technical hub . if your willing to listen ,kindly say yes or else say no');
				},

				'aboutevents':function(event){
	               
	               
	            request({
			    json: true,
			    url: url
			    }, function (error, response, body) {
			    if (error || response.statusCode !== 200) return

			    let parsed = body.feed.entry.map( (entry) => {
			    	        
			       
			      rows = entry.title["$t"]

			       listarray.push(rows);
			       
			       
			      })
			});
					
					
			        this.emit(':ask',listarray);
			       
			        listarray=[];
			        
			       
		            

			     },


			    'allevents':function(){
			    	var eventtime=this.event.request.intent.slots.time.value;
			    	if(eventtime==='at a time'){
			    		this.emit(':ask',listarray);
			    	}
			    	if(eventtime==='individual'){
			    		this.emit('googlesheet');
			    	}

			    },

			    'googlesheet':function(){

			    	
			     var eventdetails=this.event.request.intent.slots.eventname.value;
			             for(var i=1;i<=listarray.length;i++){
			                 if( eventdetails==listarray[i]){	
							this.emit(':ask',listarray[i+1]);
							
		                       }
		                     }
			   
			   console.log(listarray);
			       
			   },
			 
			    'Unhandled':function(){
			    	this.emit(':ask','sorry i dont no that one');
			    },
			    'AMAZON.NoIntent':function(){
			    	this.emit(':ask','thanks for listening . you can ask anything about on going events .i am here to help you. ');
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
