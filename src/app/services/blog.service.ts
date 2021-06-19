import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogService {  

  constructor(private firestore: AngularFirestore) { }

  addBlog(value: Object) {
    const date  = Date.now()
    value["date"] = date
    console.log(value, "Service values after date is being added")
    return this.firestore.collection("blogs").add(value)
  }

  getBlogs() {
    return this.firestore.collection('blogs').snapshotChanges().pipe(
      map((blogData: any)=> {
        return {
          blogs: blogData.map(blog => {
            return {
                id: blog.payload.doc.id,
                category: blog.payload.doc.data().category,
                confirm: blog.payload.doc.data().confirm,
                date: blog.payload.doc.data().date,
                feature: blog.payload.doc.data().feature,
                headline: blog.payload.doc.data().headline,
                mainImage: blog.payload.doc.data().mainImage,
                mainImageCaption: blog.payload.doc.data().mainImageCaption,
                otherImageCaption: blog.payload.doc.data().otherImageCaption,
                paragraph1: blog.payload.doc.data().paragraph1,
                paragraph2: blog.payload.doc.data().paragraph2,
                popular: blog.payload.doc.data().popular,
                quotes: blog.payload.doc.data().quotes,
                textEmphasis: blog.payload.doc.data().textEmphasis,
                title: blog.payload.doc.data().title,
            }
          })
        }
      })
    )
  }

  getBlog(id:string) {
    return this.firestore.collection('blogs').doc(id).valueChanges().pipe(
      map((blog:any)=> {
        return {
          id: id,
          headline: blog.headline,
          mainImage: blog.mainImage,
          mainImageCaption: blog.mainImageCaption,
          otherImageCaption: blog.otherImageCaption,
          paragraph1: blog.paragraph1,
          paragraph2: blog.paragraph2,
          popular: blog.popular,
          quotes: blog.quotes,
          textEmphasis: blog.textEmphasis,
          title: blog.title,
          date: blog.date,
          category: blog.category
        }
      })
    )
  }

  getAllCategories() {
    return this.firestore.collection("categories").snapshotChanges().pipe(
      map((categoryData: any)=> {
        return {
          categories: categoryData.map(category => {
            return {
              id: category.payload.doc.id,
              name: category.payload.doc.data().name,
              description: category.payload.doc.data().description,
              cla: category.payload.doc.data().cla
            }
          })
        }
      })
    )
  }
}
