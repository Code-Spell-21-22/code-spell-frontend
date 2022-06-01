import axios from "axios";


const address ='http://159.65.60.64:8080/api';
const apihandler = (() =>{
    
    
    const postLogin =(email,password) =>{
        axios.post(address+'/auth/login', {
            email: email,
            password: password
        });
    };
    
    const postRegister =(username,email,password) =>{
        axios.post(address+'/auth/register', {
            username:username,
            email: email,
            password: password
        });
    };

    const getUserDetails =(username)=>{
        axios.get(address+'/user/'+username+'/details');
    };
    
    
    /** 
     * 
     * params:{ username:username} 
     *
     * ns como meter no meio  
     * 
     */


    const getUserAchievements =(username)=>{
        axios.get(address+ '/user/'+username+'/achievements');

    };
    const putUserPassword=(username,password)=>{
        axios.put(address+'/user/'+username+'/password',{
            new_password: password
        });

    };
    const putUserName=(username,name)=>{
        axios.put(address+'/user/'+username+'/name',{
            new_name:name

        });


    };

    
    const getLevelLeaderboard = (levelid,language,level,skill_level)=>{
        axios.get(address+'/level/'+levelid+'/leaderboards',{
            params: {
                language:language,
                level:level,
                skill_level:skill_level
            }
        });
    };
    const getLevelDocumentation =(levelid)=>{
        axios.get(address+'/level/'+levelid+'/documentation')
    };
    
    const getLevels = (language,skill_level,chapter)=>{
        axios.get(address+'/level',{
            params: {
                language:language,
                skill_level:skill_level,
                chapter:chapter
            }
        });
    };
    const getChapter = (language,skill_level)=>{
        axios.get(address+'/chapter',{
            params: {
                language:language,
                skill_level:skill_level,
            }
        });
    };
    const getPossibleSoluctions =(levelid)=>{
        axios.get(address+'/level/'+levelid+'/solutions')
    };


    const postLevelSolution =(levelid,solutionid,code,header) =>{
        axios.post(address+'/level/'+levelid+'/submit/'+solutionid,code ,{
            'authorization': header,
            'content-type': 'text/plain',
            
        })   ;
        };
    

    const getLevelGoals =(levelid)=>{
        axios.get(address+'/level/'+levelid+'/goals');
    };

    const getLevel =(levelid)=>{

        axios.get(address+'/level/'+levelid);
    };
    const getSolution =(levelid,solutionid)=>{
        axios.get(address+'/level/'+levelid+'/solutions/'+solutionid);

    };

    return { 
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
    };

})(); //tentei com e sem parenteses still nothi
export default apihandler();