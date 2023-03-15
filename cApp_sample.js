/* cApp basic structure
*   @param API          object      //API object
*   @param container    string      //dom ID where to launch cApp
*   @param config       object      //parameters from Plinth
*   @param error        object      //error object from Plinth
*/

/*the closure structure will be appended by Plinth*/
;(function(API,container,config,error){

    //1.basic four parameters.
    console.log("Hello world, this is from cApp.");
    console.log(`Dom container id : ${container}`);
    console.log(`Config from pedestal :  ${JSON.stringify(config)}`);
    console.log(`Error from pedestal : ${JSON.stringify(error)}`);

    //2.check the balance of target address
    var ss58="5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY";
    API.common.balance(ss58,function(res){
        console.log(res);
    });

/*the closure structure will be appended by Plinth*/
})(API,domID,config,error);