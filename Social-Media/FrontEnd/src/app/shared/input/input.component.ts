import { Component, OnInit,Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  @Input('label') label:string;
  @Input('control') control:FormControl;
  @Input('inputType') inputType:string;


  constructor() { }

  ngOnInit(): void {

    
 
  }

  showErrors(){
    return this.control.touched && this.control.dirty && this.control.errors;
  }

}
