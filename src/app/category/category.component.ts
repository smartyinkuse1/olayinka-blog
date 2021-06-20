import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categoryName
  constructor(public route: ActivatedRoute, private blogService: BlogService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap)=> {
      if (paramMap.has('cat')) {
        this.categoryName = paramMap.get('cat')
      }
      this.blogService.getBlogsByCategory(this.categoryName).subscribe(res=> {
        console.log(res.blogs);
        
      })
    })
  }

}
