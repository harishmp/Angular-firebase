import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
declare var $:any;

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  @ViewChild('closebutton') closebutton;

  BookDetail = {
    title: '',
    description:  '',
    cover_url: '',
    author: '',
  }

  items = [];
  itemsAuthors = [];
  searchkey;
  addorEdit = true;

  constructor(public fs: AngularFirestore) {
    $('#myModalAdd').modal({
      backdrop: 'static',
      keyboard: false
    })
  }

  ngOnInit(): void {
    this.callAuthorApi();
    this.callBooksApi();
  }

  callAuthorApi() {
    this.fs.collection('authors').get().subscribe(changes => {
      // console.log('authors', changes.docs[0].data())
      changes.docs.forEach( (item) => {
      this.itemsAuthors.push(item.data())
    })
    },(err) => {
      console.log(err);
    });
  }

  callBooksApi(){
    this.fs.collection('books').get().subscribe(changes => {
      changes.docs.forEach( (item) => {
        var bookObj :any
        bookObj = item.data();
        bookObj.id = item.id;
        this.items.push(bookObj)
      })
    })
  }

  clearData() {
    this.BookDetail = {
      title: '',
      description:  '',
      cover_url: '',
      author: '',
    };
  }

  clearandRefresh() {
    this.clearData();
    this.items = [];
    this.callBooksApi();
    this.closebutton.nativeElement.click();
  }

  onSubmit(){
    if(this.addorEdit === true) {
      this.fs.collection('books').add(this.BookDetail);
      this.clearandRefresh();
    } else {
      let id = this.BookDetail['id']
      this.fs.collection('books').doc(id).update(this.BookDetail);
      this.clearandRefresh();
    }
  }

  onDelete(item, i){
    this.fs.collection('books').doc(item.id).delete()
    .then( () => {
      this.items.splice(i, 1);
    }).catch( ( err ) => {
      alert("ERROR Deleting the Book")
    });
  }

  onClickOpenPopup(item, event){
    this.addorEdit = event;
    if(event === false) {
      this.BookDetail = item;
    }
  }

}
