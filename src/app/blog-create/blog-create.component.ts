import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogService } from '../services/blog.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css']
})
export class BlogCreateComponent implements OnInit {
  form: FormGroup;  
  mainImage!: any;
  downloadUrl!: any;
  categories!: any;
  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private router: Router,
    private afs: AngularFireStorage 

    ) { }

  ngOnInit(): void {
    this.blogService.getAllCategories().subscribe(res=> {
      this.categories = res.categories
      console.log(this.categories, "Categories")
      
    })
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(6)] ],
      headline: ['', [Validators.required, Validators.minLength(6)] ],
      paragraph1: ['', [Validators.required, Validators.minLength(15)]],
      mainImageCaption: ['', [Validators.required]],
      category: ['', [Validators.required]],
      quotes: ['', [Validators.required, Validators.minLength(5)]],
      textEmphasis: [''],
      otherImageCaption: [''],
      paragraph2: ['' ],
      popular: false,
      feature: false,
      confirm: [false, [Validators.required]]
    })
  }

  get f() {
    return this.form.controls;
  }

  uploadImage(event: any) {
    console.log("A File input is clicked", event)

    //Retrieve the file Object from the event
    const file = event.target.files[0]

    // Declare the FilePath on FireStorage so as to be easily identied or retrieved
    const filePath = `BlogImages/${file.name}`;

    //Checks if the file picked is an image
    if (file.type.split("/")[0] !== 'image') {
      (<HTMLInputElement>document.getElementById('inputFile')).value = "";
      return alert("you are only allowed to pick images")      
    }

    //Declaring the file path in firebase file storage
    const fileRef = this.afs.ref(filePath)

    //Upload the file to the declared path
    const fileUploadTask = this.afs.upload(filePath, file)

    fileUploadTask.snapshotChanges().pipe(
      finalize(()=> {
        this.downloadUrl = fileRef.getDownloadURL()
        this.downloadUrl.subscribe(url =>  this.mainImage = url)
      })
    ).subscribe()
  }

  onSubmitBlog() {
    // console.log(this.form.value,  "The values in the Component");
    let blogObj = {
      ...this.form.value,
      mainImage: this.mainImage
    }
    console.log(blogObj);
    

    this.blogService.addBlog(blogObj).then(res => {
      console.log(res)
      this.form.reset()
      this.router.navigateByUrl("/")
    }).catch((err:any) => {
      alert(`Error from Adding Data ${err}`)
    })

    
  }


}
