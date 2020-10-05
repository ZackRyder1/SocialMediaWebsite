import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl ,Validators} from '@angular/forms';
import { SocialService } from '../SocialMService/social.service';

@Component({
  selector: 'app-add-post-form',
  templateUrl: './add-post-form.component.html',
  styleUrls: ['./add-post-form.component.css']
})
export class AddPostFormComponent implements OnInit {

  message:string;

  PostForm = new FormGroup({

    caption: new FormControl('', [Validators.required]),

    file: new FormControl('', [Validators.required]),

    fileSource: new FormControl('', [Validators.required])

  });

  imageSrc: string | ArrayBuffer;

  onFileChange(event) {

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;

      reader.readAsDataURL(file);
  }

    if (event.target.files.length > 0) {

      console.log(event.target.files);
      const file = event.target.files[0];

      this.PostForm.patchValue({

        fileSource: file

      });

    }
  }

         

  onSubmit(){

    if(this.PostForm.invalid)
      {
        this.PostForm.setErrors({noImageSelected : true});
        return;
      }

    const formData = new FormData();

    formData.append('image', this.PostForm.get('fileSource').value);
    formData.append('caption',this.PostForm.get('caption').value);

    this.socialService.createPost(formData).subscribe((response)=>{
      console.log( response.message);
      this.message = response.message;
    });

  }
    

  constructor(private socialService:SocialService) { }

  ngOnInit(): void {
  }

}
