import { FormGroup,Validator } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({providedIn :'root'})
export class PasswordMatch implements Validator{

    validate(formGroup:FormGroup){
        
        if(formGroup.get('password').value === formGroup.get('passwordConfirmation').value)
            return null;
        else
            return { PasswordDontMatch : true };    
    }

}
