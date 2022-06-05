import axios from "axios";


 const address ='http://159.65.60.64:8080/api';
    
async function postLogin  (email,password)  {
        return axios.post(address+'/auth/login', {
            email: email,
            password: password
        });
    };
    
    async function postRegister  (username,email,password)  {
        return axios.post(address+'/auth/register', {
            username:username,
            email: email,
            password: password
        });
    };

     async function  getUserDetails  (username)  {
        return axios.get(address+'/user/'+username+'/details',{'authorization': header,
    });
    };
    
    
    /** 
     * 
     * params:{ username:username} 
     *
     * ns como meter no meio  
     * 
     */


      async function  getUserAchievements (username) {
        return axios.get(address+ '/user/'+username+'/achievements',{'authorization': header,
    });

    };
     async function  putUserPassword  (username,password) {
        return axios.put(address+'/user/'+username+'/password',{'authorization': header,
    
            new_password: password
        });

    };
     async function   putUserName  (username,name) {
        return axios.put(address+'/user/'+username+'/name',{'authorization': header,
    
            new_name:name

        });


    };

    
     async function  getLevelLeaderboard    (levelid,language,level,skill_level) {
        return axios.get(address+'/level/'+levelid+'/leaderboards',{'authorization': header,
    
            params: {
                language:language,
                level:level,
                skill_level:skill_level
            }
        });
    };
     async function  getLevelDocumentation   (levelid) {
        return axios.get(address+'/level/'+levelid+'/documentation',{'authorization': header,
    })
    };
    
     async function  getLevels    (language,skill_level,chapter) {
        return axios.get(address+'/level',{'authorization': header,
    
            params: {
                language:language,
                skill_level:skill_level,
                chapter:chapter
            }
        });
    };
     async function  getChapter    (language,skill_level) {
        return axios.get(address+'/chapter',
        {'authorization': header,
    
            params: {
                language:language,
                skill_level:skill_level,
            }
        });
    };
     async function  getPossibleSoluctions   (levelid) {
        return axios.get(address+'/level/'+levelid+'/solutions',{'authorization': header,
    })
    };


     async function  postLevelSolution   (levelid,solutionid,code,header)  {
        return axios.post(address+'/level/'+levelid+'/submit/'+solutionid,code ,{
            'authorization': header,
            'content-type': 'text/plain',
            
        })   ;
        };
    

    async function  getLevelGoals   (levelid) {
        return axios.get(address+'/level/'+levelid+'/goals',{'authorization': header,
    });
    };

     async function  getLevel   (levelid) {

        return axios.get(address+'/level/'+levelid,{'authorization': header,
    });
    };
     async function  getSolution   (levelid,solutionid) {
        return axios.get(address+'/level/'+levelid+'/solutions/'+solutionid,{'authorization': header,
    });

    };

    export  { 
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

//tentei com e sem parenteses still nothi