let password=''
export default function Validation(name,value) {
        if(name==='password'){
            password=value
        }
        const emailValidation = value => (
            (/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(value)
        )
    
        const UserValidation = value => (
            (/^[a-zA-Z]+$/).test(value)
    
        )
        const PasswordValidation = value => (
            (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/).test(value)
    
        )   
       
        switch (name) {
    
            case 'username':
              return UserValidation(value);
   
                break;
            case 'email':
                return emailValidation(value)
                
                break;
            case 'password':
                return PasswordValidation(value)

                
                break;
            case 'conformPassword':
               // console.log('name.password', name.password)
                return value === password
                
                
                 break;
    
            default:
                
                break;
        }
        
    
    }
    
  



