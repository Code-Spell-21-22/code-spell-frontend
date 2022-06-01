import axios from "axios";


const address ='http://159.65.60.64:8080/api';
export class ApiHandler {
    
      postLogin = (email,password) =>{
        axios.post(address+'/auth/login', {
            email: email,
            password: password
        });
    };
    
    postRegister = (username,email,password) => {
        axios.post(address+'/auth/register', {
            username:username,
            email: email,
            password: password
        });
    };

      getUserDetails = (username) =>{
        axios.get(address+'/user/'+username+'/details');
    };
    
    
    /** 
     * 
     * params:{ username:username} 
     *
     * ns como meter no meio  
     * 
     */


      getUserAchievements =(username)=>{
        axios.get(address+ '/user/'+username+'/achievements');

    };
      putUserPassword=(username,password)=>{
        axios.put(address+'/user/'+username+'/password',{
            new_password: password
        });

    };
      putUserName=(username,name)=>{
        axios.put(address+'/user/'+username+'/name',{
            new_name:name

        });


    };

    
      getLevelLeaderboard = (levelid,language,level,skill_level)=>{
        axios.get(address+'/level/'+levelid+'/leaderboards',{
            params: {
                language:language,
                level:level,
                skill_level:skill_level
            }
        });
    };
      getLevelDocumentation =(levelid)=>{
        axios.get(address+'/level/'+levelid+'/documentation')
    };
    
      getLevels = (language,skill_level,chapter)=>{
        axios.get(address+'/level',{
            params: {
                language:language,
                skill_level:skill_level,
                chapter:chapter
            }
        });
    };
      getChapter = (language,skill_level)=>{
        axios.get(address+'/chapter',{
            params: {
                language:language,
                skill_level:skill_level,
            }
        });
    };
      getPossibleSoluctions =(levelid)=>{
        axios.get(address+'/level/'+levelid+'/solutions')
    };


      postLevelSolution =(levelid,solutionid,code,header) =>{
        axios.post(address+'/level/'+levelid+'/submit/'+solutionid,code ,{
            'authorization': header,
            'content-type': 'text/plain',
            
        })   ;
        };
    

      getLevelGoals =(levelid)=>{
        axios.get(address+'/level/'+levelid+'/goals');
    };

      getLevel =(levelid)=>{

        axios.get(address+'/level/'+levelid);
    };
      getSolution =(levelid,solutionid)=>{
        axios.get(address+'/level/'+levelid+'/solutions/'+solutionid);

    };

    /* return { 
        postRegister,
        postLogin,
        getChapter,
        getSolution,
        getLevel,
        getLevelGoals,
        getPossibleSoluctions,
        postLevelSolution,
        getLevels,
        getLevelLeaderboard,
        getLevelDocumentation,
        getUserAchievements,
        getUserDetails,
        putUserName,
        putUserPassword 
    }; */

}; //tentei com e sem parenteses still nothi
