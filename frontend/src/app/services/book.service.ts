import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Book } from '../models/book';


const BACKEND_URL = 'http://localhost:3000/api/'

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  newBook(title: string, description: string, image: File, file: File, categoryName: string) {
    const form = new FormData()
    form.append('title', title)
    form.append('description', description)
    form.append('image', image, title)
    form.append('file', file)
    form.append('categoryName', categoryName)

    this.http.post(BACKEND_URL + 'books', form).subscribe(data => {
      this.toastr.success('Successfully created', 'Book', {
        closeButton: true,
        progressAnimation: 'increasing',
        progressBar: true,
        easing: 'linear',
        positionClass: 'toast-top-left'
      });
    }, (error) => {
      this.toastr.error('Something went wrong', 'Book', {
        closeButton: true,
        progressAnimation: 'increasing',
        progressBar: true,
        easing: 'linear',
        positionClass: 'toast-top-left'
      });
      console.log(error);
    })
  }

  getAllBooks() {
    return this.http.get<Book[]>(BACKEND_URL + 'books')
  }

  // ***********************IELTS books***************************

  getIELTSbooks() {
    return this.http.get<Book[]>(BACKEND_URL + 'books/ielts')
  }

  getSpeakingBooks() {
    return this.http.get<Book[]>(BACKEND_URL + 'books/ielts/speaking')
  }

  getListeningBooks() {
    return this.http.get<Book[]>(BACKEND_URL + 'books/ielts/listening')
  }

  getReadingBooks() {
    return this.http.get<Book[]>(BACKEND_URL + 'books/ielts/reading')
  }

  getWritingBooks() {
    return this.http.get<Book[]>(BACKEND_URL + 'books/ielts/writing')
  }
  getVocabularyBooks() {
    return this.http.get<Book[]>(BACKEND_URL + 'books/ielts/vocabulary')
  }

  // ***********************Programming books***************************

  getProgrammingBooks() {
    return this.http.get<Book[]>(BACKEND_URL + 'books/programming')
  }

  getFrontendBooks() {
    return this.http.get<Book[]>(BACKEND_URL + 'books/programming/frontend')
  }

  getBackendBooks() {
    return this.http.get<Book[]>(BACKEND_URL + 'books/programming/backend')
  }

  // ***********************Art books***************************

  getArtBooks() {
    return this.http.get<Book[]>(BACKEND_URL + 'books/art')
  }

  getHistoricalBooks() {
    return this.http.get<Book[]>(BACKEND_URL + 'books/art/historical')
  }

  getLiteratureBooks() {
    return this.http.get<Book[]>(BACKEND_URL + 'books/art/literature')
  }

  // ***********************Categories*****************************

  getCategories() {
    return this.http.get(BACKEND_URL + 'categories')
  }

  // *******************Search by key *******************************

  searchBook(key: any) {
    return this.http.get(`${BACKEND_URL}books/search/${key}`);
  }

  // *********************** Get By Id *************************

  getBookById(book: any) {
    return this.http.get(`${BACKEND_URL}books/${book}`)
  }

}
