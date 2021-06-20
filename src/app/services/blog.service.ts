import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import  firestore  from 'firebase/app';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogService {  

  constructor(private firestore: AngularFirestore) { }

  addBlog(value: Object) {
    const date  = Date.now()
    value["date"] = date
    value["counter"] = 0
    console.log(value, "Service values after date is being added")
    return this.firestore.collection("blogs").add(value)
  }

  getBlogs() {
    return this.firestore.collection('blogs', ref=> ref.orderBy("date", "desc") ).snapshotChanges().pipe(
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
                counter: blog.payload.doc.data().counter
            }
          })
        }
      })
    )
  }

  getBlog(id:string) {
    //Add Increment Value
    let increment = firestore.firestore.FieldValue.increment(1)
    //Fetch the post by id
    let blogPost = this.firestore.doc(`blogs/${id}`)
    //Update the post with the increamented value
    blogPost.update({counter: increment}) 
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
          category: blog.category,
          counter: blog.counter
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

  getBlogsByCategory(category: any) {
    return this.firestore.collection('blogs', ref => ref.where("category", "==", category)).snapshotChanges().pipe(
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
                counter: blog.payload.doc.data().counter
            }
          })
        }
      })
    )
  }

  getAllFeaturedBlogs() {
    return this.firestore.collection('blogs', ref => ref.where("feature", "==", true).orderBy("date", "desc").limit(3)).snapshotChanges().pipe(
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
                counter: blog.payload.doc.data().counter
            }
          })
        }
      })
    )
  }

  getMostReadBlogs() {
    return this.firestore.collection('blogs', ref => ref.orderBy("counter", "desc").limit(5)).snapshotChanges().pipe(
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
                counter: blog.payload.doc.data().counter
            }
          })
        }
      })
    )
  }
}
