import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  blogs;
  featureBlogs;
  mostReadBlogs;
  categories;
  constructor(private blogService: BlogService) { }

  ngOnInit(): void {

    //Get the Blogs from FireStore
    this.blogService.getBlogs().subscribe((res:any) => {
      // console.log(res);
      this.blogs = res.blogs
    })

    //Get all featured Posts from FireStore
    this.blogService.getAllFeaturedBlogs().subscribe(res => {
      this.featureBlogs = res.blogs
      // console.log(this.featureBlogs, "Feature Blogs")
    })

    //Get the most Read Blogs from FireStore
    this.blogService.getMostReadBlogs().subscribe(res=> {
      this.mostReadBlogs = res.blogs
      console.log(this.mostReadBlogs, "The most Read Blogs on my platform");
    })

    this.blogService.getAllCategories().subscribe(res=> {
        this.categories = res.categories
    })
  }

  check(category, value) {
    
    if (category === value) {
      return true
    }else {
      return false
    }
  }

  // getBlogsLength(categoryName) {
  //   console.log("Hey")
  //   this.blogService.getBlogsByCategory(categoryName).subscribe(res => {
  //     console.log(res.blogs.length);
      
  //     return res.blogs.length
  //   })
  // }


}
