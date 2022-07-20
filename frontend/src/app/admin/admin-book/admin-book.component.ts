import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort, Sort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { Book } from 'src/app/models/book'
import { BookService } from '../../services/book.service';
import { HttpClient } from '@angular/common/http'
import { ToastrService } from 'ngx-toastr'
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-book',
  templateUrl: './admin-book.component.html',
  styleUrls: ['./admin-book.component.scss'],
})
export class AdminBookComponent implements OnInit {
  newBook!: FormGroup

  selectCategory: any = []
  users: any = []

  // ! TAble

  displayedColumns: string[] = ['image', 'title', 'description', 'categoryName', 'edit']

  dataSource!: MatTableDataSource<Book>
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort
  private _liveAnnouncer: any

  constructor(
    private book: BookService,
    private dialog: MatDialog,
    private http: HttpClient,
    private toastr: ToastrService,
    private auth: AuthService
  ) { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`)
    } else {
      this._liveAnnouncer.announce('Sorting cleared')
    }
  }

  openDialogWithTemplateRef(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef)
  }

  ngOnInit() {


    this.auth.getAllUsers().subscribe(data => {
      this.users = data
    })
    // *****************TABLE

    this.book.getAllBooks().subscribe((data) => {
      this.dataSource = new MatTableDataSource<Book>(data)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    })
    // ***************** new Book Form Group ***********************

    this.newBook = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      description: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.required,
        ],
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
      }),
      file: new FormControl(null, {
        validators: [Validators.required],
      }),
      categoryName: new FormControl(null, {
        validators: [Validators.required],
      }),
    })

    // ******** fetching categories****************

    this.book.getCategories().subscribe(
      (data) => {
        this.selectCategory = data
      },
      (error) => {
        console.log(error, 'Fetching Error')
      },
    )
  } // end onInit
  // ********************* Save Button (new Book ) *******************************
  newBookSubmitted() {
    this.book.newBook(
      this.newBook.value.title,
      this.newBook.value.description,
      this.newBook.value.image,
      this.newBook.value.file,
      this.newBook.value.categoryName,
    )
    this.newBook.reset()
    this.imageUrl = null
  }

  // **************** Uploaded file image preview ********************

  // ******************** image************************

  imageUrl: any
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement | any).files[0]
    this.newBook.patchValue({ image: file })
    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg']
    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader()
      reader.onload = () => {
        this.imageUrl = reader.result as string
      }
      reader.readAsDataURL(file)
    }
  }

  // ************* File*******************************

  fileSize: any
  onFilePicked(event: Event) {
    const file = (event.target as HTMLInputElement | any).files[0]
    this.fileSize = file.size / 1024 / 1024
    this.fileSize.toPrecision(4)
    this.newBook.patchValue({ file: file })
    const allowedMimeTypes = ['application/pdf']
    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
    }
  }

  public getBookById: any = []

  getById(book: any) {
    this.book.getBookById(book._id).subscribe((data) => {
      this.getBookById = data
    })
  }

  deleteProduct(product: Book) {
    this.http
      .delete('http://localhost:3000/api/books' + '/' + product._id)
      .subscribe(
        (data) => {
          this.toastr.success('Successfully deleted', 'post', {
            closeButton: false,
            progressAnimation: 'increasing',
            progressBar: true,
            easing: 'linear',
            positionClass: 'toast-top-left',
          })
        },
        () => {
          this.toastr.error('Something went wrong', 'post', {
            closeButton: false,
            progressAnimation: 'increasing',
            progressBar: true,
            easing: 'linear',
          })
        },
      )
    window.location.reload()
  }



}
