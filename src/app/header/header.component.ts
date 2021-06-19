import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  categories;
  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.blogService.getAllCategories().subscribe(res=> {
      console.log(res.categories);
      this.categories = res.categories
    })
  }

}
