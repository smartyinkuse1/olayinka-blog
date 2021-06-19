import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent implements OnInit {
  blogId;
  blog: any;
  constructor(public route: ActivatedRoute, private blogService: BlogService) { }

  ngOnInit(): void {
    // Listen for changes on the component path that we set in the app-routing
    this.route.paramMap.subscribe((param: ParamMap)=> {
      //Check if it the id has a valid value
        if (param.has('id')) {
          console.log("i Hava a valid Id");
          
          this.blogId = param.get('id')
          console.log(this.blogId, "This is the Id of the post you clicked")
        }
        this.blogService.getBlog(this.blogId).subscribe(res => {
          this.blog = res
          console.log(res, "This is the single Post");
          
        })
    })
  }

}
