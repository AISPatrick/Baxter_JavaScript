
function onResult(results, output) {

	 var Header = "\x02";  							  //<STX>
	 var Terminator = "\x0D\x0A"; 					  //<CR><LF>

     var outputMessageTCP     = '';         		  // TCP Output message initialization 
     var outputMessageSerial    = '';       		  // Serial Output message initialization 
     
     var numberOfCodes   = results.redingCount; 	  //No. of codes read during phase/cycle 

  if (numberOfCodes > 0) {							  //if a code was read
  
    for ( var codeIndex = 0 ; codeIndex < numberOfCodes ; codeIndex++ ){ 			//The script goes through every code that was read and concatenates(+=) TCP/Serial output.
    
    if(results.codes[codeIndex].addresses[0]<=9){									//0-9 need to be converted to 00,01,02...09			
    
     	if(codeIndex == numberOfCodes-1){											
	 		 outputMessageTCP       += results.codes[codeIndex].content ;	 		 //The very last string does not require '|'	so we don't send on the last code	
			 
			 outputMessageSerial    += 0; 											//Ensures two digits at the start of string
	  		 outputMessageSerial    += results.codes[codeIndex].addresses[0];		//Sends slave address ID
	  		 outputMessageSerial    += results.codes[codeIndex].content ;	 		//Special format Serial

	
	 	}else{
	  		 outputMessageTCP       += results.codes[codeIndex].content + '|'; 
	  		 
	  		 outputMessageSerial    += 0; 											//Ensures two digits at the start of string
	  		 outputMessageSerial    += results.codes[codeIndex].addresses[0];		//Sends slave address ID
	  		 outputMessageSerial    += results.codes[codeIndex].content + ';';		//Special format Serial

	   }
	 
}else{																				//Larger then 9 requires no conversion	
   
	 	if(codeIndex == numberOfCodes-1){
	 		 outputMessageTCP       += results.codes[codeIndex].content; 			//The very last string does not require '|'	so we don't send on the last code
			 
			 outputMessageSerial    += results.codes[codeIndex].addresses[0];	 	//Sends slave address ID
			 outputMessageSerial    += results.codes[codeIndex].content ;			//Special format Serial

	
	 	}else{
	  		 outputMessageTCP       += results.codes[codeIndex].content + '|'; 		//For every string other then the last we require '|'
	   		 
	   		 outputMessageSerial    += results.codes[codeIndex].addresses[0];	 	//Sends slave address ID
	  		 outputMessageSerial    += results.codes[codeIndex].content + ';';		//Special format Serial

	   }

}


}


}else{

 outputMessageTCP      += 'noread'; 
 outputMessageSerial      += 'noread'; 
 
}

output.setMessage( '\x02' +outputMessageTCP+'\x0D\x0A'); 							//Output for console for troubleshooting
//output.setMessage( '\x02' +outputMessageSerial+'\x0D\x0A'); 	

output.setMessage( '\x02'+ outputMessageTCP + '\x0D\x0A'  , "tcpserverchannel0"); 	//Output Special format TCP
output.setMessage( '\x02'+ outputMessageTCP + '\x0D\x0A'  , "tcpclientchannel0"); 	//Output Special format TCP


//output.setMessage( '\x02'+ numberOfCodes + '\r\n' , "serialchannel1"); 				//Output Number of Codes Read
output.setMessage( '\x02'+ outputMessageSerial + '\x0D\x0A', "serialchannel1"); 	//Output Number of Codes Read

//output.setMessage( '\x02'+ numberOfCodes + '\r\n' , "serialchannel2"); 				//Output Number of Codes Read
output.setMessage( '\x02'+ outputMessageSerial + '\x0D\x0A', "serialchannel2"); 	//Output Number of Codes Read

}
