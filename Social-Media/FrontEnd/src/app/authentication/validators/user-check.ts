import { AsyncValidator,FormControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import { AuthService } from '../AuthService/auth.service';
import { map , catchError } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable({providedIn : 'root'})
export class UserCheck implements AsyncValidator{
    
    constructor(private authService:AuthService){

    }
    
    validate = (formControl:FormControl)=>
    {
        const { value } = formControl;
        return this.authService.userAvailable(value).pipe(
            map(value=>{

                if(value.available)
                    return null;

            }),
            catchError((err)=>{

                console.log(err);

                if(err.status === 401)
                    return of({UserExists:true});
                else
                    return of({noConnection:true});   
                     
            })
        );
    }
}
