import { Component, OnInit ,ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialService } from '../SocialMService/social.service';
import { User } from '../UserInterface/user';
import { Post } from '../../shared/paginator/paginator.service';
import { FormGroup , FormControl ,Validators} from '@angular/forms';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cards:Post[];

  totalPages:number;

  userId :string;

  user:User;

  submitVisible:boolean= false;

  type:string;

  postType:string;

  showLFFModal:boolean;

  whichModal:string;

  AddPostVisible:boolean = null;

  ProfileForm = new FormGroup({

    file: new FormControl('', [Validators.required]),

    fileSource: new FormControl('', [Validators.required])

  });

  imageSrc: string | ArrayBuffer;

  imageUrl:string;

  followVisible:boolean = false;

  follow:boolean = true;

  onFileChange(event) {

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;

      reader.readAsDataURL(file);
  }

    if (event.target.files.length > 0) {
      const file = event.target.files[0];

      this.ProfileForm.patchValue({

        fileSource: file

      });

      this.submitVisible = true;
    }
  }

  onSubmit(){
    if(this.ProfileForm.invalid)
        return;

    const formData = new FormData();

    formData.append('image', this.ProfileForm.get('fileSource').value);

    const profileElement = this.element.nativeElement.firstChild.firstChild.firstChild.firstChild.firstChild.firstChild;

    this.socialService.addProfile(formData)
    .subscribe(response=>{
        this.imageUrl ="http://localhost:8080/" + response.profileURL;
        profileElement.style.backgroundImage = "url('" + this.imageUrl + "')";
        this.submitVisible=false;


    })

     

    // profileElement.style.backgroundImage = "url('" + imageUrl + "')";

    

    // this.socialService.createPost(formData).subscribe((response)=>{
    //   console.log( response.message);
    //   this.message = response.message;
    // });

  }

  onFollowersClick()
  {
    this.type = "followersModal";
    this.whichModal = "followers"; 
    this.showLFFModal = true;
  }

  onFollowingClick()
  {
    this.type = "followingModal";
    this.whichModal = "following";
    this.showLFFModal = true;
  }

  onCloseModal(visible:boolean)
  {
    this.showLFFModal = false;
  }

  constructor(private activatedRoute : ActivatedRoute,
              private socialService : SocialService,
              private element:ElementRef,
              private router:Router) 
  {
      this.userId = this.activatedRoute.snapshot.params.userId;
      this.activatedRoute.data.subscribe(data=>{
        this.user = data.user;
      });

      if(this.router.url.startsWith('/home'))
      {
        this.AddPostVisible = true;
        this.postType = '/home';
      } 
      else
      {
        this.AddPostVisible = false;
        this.postType = '/user';
        this.socialService.isFollowed(this.user.userId).subscribe(rsp=>{
          if(rsp.isFollowed)
            this.follow = false;
          else
            this.follow = true;  
          this.followVisible = true;
        })

      }    
  }


  ngOnInit(): void {
    const profileElement = this.element.nativeElement.firstChild.firstChild.firstChild.firstChild.firstChild.firstChild;
    const defaultUrl="https://workhound.com/wp-content/uploads/2017/05/placeholder-profile-pic.png";
    if(!this.user.profileURL)
      profileElement.style.backgroundImage = "url('" + defaultUrl + "')";
    else
    {
      this.imageUrl ="http://localhost:8080/" + this.user.profileURL;
      profileElement.style.backgroundImage = "url('" + this.imageUrl + "')";
    } 
   }

   onFollowClick(value:HTMLElement)
   {
    if(!this.follow)
    {
      this.socialService.unfollow(this.user.userId)
      .subscribe(response=>{
        this.follow = true
      });
    }
    else 
    {
      this.socialService.follow(this.user.userId)
      .subscribe(response=>{
        this.follow = false;
      });
    }  
   }

}
