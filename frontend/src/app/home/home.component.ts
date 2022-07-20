import { Component, Inject, OnDestroy, OnInit, TemplateRef } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { ToastrService } from 'ngx-toastr'
import { Book } from '../models/book'
import { BookService } from '../services/book.service'
import { AuthService } from '../services/auth.service'
import { Subscription } from 'rxjs'
import { DOCUMENT } from '@angular/common'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  isFirst = true

  constructor(
    private book: BookService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private auth: AuthService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  allBooks: Book[] = []
  isLoading = false

  private authListenerSubs!: Subscription
  userIsAuthenticated = false
  isAdmin = false

  ngOnInit() {
    this.userIsAuthenticated = this.auth.getIsAuth()
    const token = localStorage.getItem('token')
    if (token) {
      this.userIsAuthenticated = true
    } else {
      this.userIsAuthenticated = false
    }
    this.authListenerSubs = this.auth
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated
      })

    this.isLoading = true
    // ***************** get All Books *****************

    this.book.getAllBooks().subscribe(
      (data) => {
        this.isLoading = false
        setTimeout(() => {
          this.isLoading = false
        }, 2000);
        if (data.length < 1) {
          this.toastr.info('Books have not been added yet', 'Book', {
            closeButton: true,
            progressAnimation: 'increasing',
            progressBar: true,
            easing: 'linear',
            positionClass: 'toast-top-right',
          })
          setTimeout(() => {
            this.isLoading = false
          }, 2000);

        } else { this.allBooks = data }
      },
      (error) => {
        console.log(error)
        this.toastr.error('Fetching error', 'Book', {
          closeButton: true,
          progressAnimation: 'increasing',
          progressBar: true,
          easing: 'linear',
          positionClass: 'toast-top-left',
        })
        setTimeout(() => {
          this.isLoading = false
        }, 1500)
      },
    )
  }

  getAllBook() {
    this.isLoading = true
    this.book.getAllBooks().subscribe(
      (data) => {
        this.isLoading = false
        if (data.length < 1) {
          this.toastr.info('Books have not been added yet', 'Book', {
            closeButton: true,
            progressAnimation: 'increasing',
            progressBar: true,
            easing: 'linear',
            positionClass: 'toast-top-right',
          })
        } else this.allBooks = data
      },
      (error) => {
        console.log(error)
        this.toastr.error('Fetching error', 'Book', {
          closeButton: true,
          progressAnimation: 'increasing',
          progressBar: true,
          easing: 'linear',
          positionClass: 'toast-top-left',
        })
        setTimeout(() => {
          this.isLoading = false
        }, 1500)
      },
    )
  }

  getIeltsBooks() {
    this.isLoading = true
    this.book.getIELTSbooks().subscribe(
      (data) => {
        this.isLoading = false
        if (data.length < 1) {
          this.toastr.info('Books have not been added yet', 'Book', {
            closeButton: true,
            progressAnimation: 'increasing',
            progressBar: true,
            easing: 'linear',
            positionClass: 'toast-top-right',
          })
        } else this.allBooks = data
      },
      (error) => {
        console.log(error)
        setTimeout(() => {
          this.isLoading = false
        }, 1500)
        this.toastr.error('Fetching error', 'Book', {
          closeButton: true,
          progressAnimation: 'increasing',
          progressBar: true,
          easing: 'linear',
          positionClass: 'toast-top-left',
        })
      },
    )
  }
  getProgrammingBooks() {
    this.isLoading = true
    this.book.getProgrammingBooks().subscribe(
      (data) => {
        this.isLoading = false
        if (data.length < 1) {
          this.toastr.info('Books have not been added yet', 'Book', {
            closeButton: true,
            progressAnimation: 'increasing',
            progressBar: true,
            easing: 'linear',
            positionClass: 'toast-top-right',
          })
        } else this.allBooks = data
      },
      (error) => {
        console.log(error)
        this.toastr.error('Fetching error', 'Book', {
          closeButton: true,
          progressAnimation: 'increasing',
          progressBar: true,
          easing: 'linear',
          positionClass: 'toast-top-left',
        })
        setTimeout(() => {
          this.isLoading = false
        }, 1500)
      },
    )
  }
  getArtBooks() {
    this.isLoading = true
    this.book.getArtBooks().subscribe(
      (data) => {
        this.isLoading = false
        if (data.length < 1) {
          this.toastr.info('Books have not been added yet', 'Book', {
            closeButton: true,
            progressAnimation: 'increasing',
            progressBar: true,
            easing: 'linear',
            positionClass: 'toast-top-right',
          })
        } else this.allBooks = data
      },
      (error) => {
        console.log(error)
        this.toastr.error('Fetching error', 'Book', {
          closeButton: true,
          progressAnimation: 'increasing',
          progressBar: true,
          easing: 'linear',
          positionClass: 'toast-top-left',
        })
        setTimeout(() => {
          this.isLoading = false
        }, 1500)
      },
    )
  }

  // ********* Get IELTS book via category ******
  getSpeaking() {
    this.isLoading = true
    this.book.getSpeakingBooks().subscribe(
      (data) => {
        this.isLoading = false
        if (data.length < 1) {
          this.toastr.info('Books have not been added yet', 'Book', {
            closeButton: true,
            progressAnimation: 'increasing',
            progressBar: true,
            easing: 'linear',
            positionClass: 'toast-top-right',
          })
        } else this.allBooks = data
      },
      (error) => {
        console.log(error)
        this.toastr.error('Fetching error', 'Book', {
          closeButton: true,
          progressAnimation: 'increasing',
          progressBar: true,
          easing: 'linear',
          positionClass: 'toast-top-left',
        })
        setTimeout(() => {
          this.isLoading = false
        }, 1500)
      },
    )
  }
  getListening() {
    this.isLoading = true
    this.book.getListeningBooks().subscribe(
      (data) => {
        this.isLoading = false
        if (data.length < 1) {
          this.toastr.info('Books have not been added yet', 'Book', {
            closeButton: true,
            progressAnimation: 'increasing',
            progressBar: true,
            easing: 'linear',
            positionClass: 'toast-top-right',
          })
        } else this.allBooks = data
      },
      (error) => {
        console.log(error)
        this.toastr.error('Fetching error', 'Book', {
          closeButton: true,
          progressAnimation: 'increasing',
          progressBar: true,
          easing: 'linear',
          positionClass: 'toast-top-left',
        })
        setTimeout(() => {
          this.isLoading = false
        }, 1500)
      },
    )
  }
  getReading() {
    this.isLoading = true
    this.book.getReadingBooks().subscribe(
      (data) => {
        this.isLoading = false
        if (data.length < 1) {
          this.toastr.info('Books have not been added yet', 'Book', {
            closeButton: true,
            progressAnimation: 'increasing',
            progressBar: true,
            easing: 'linear',
            positionClass: 'toast-top-right',
          })
        } else this.allBooks = data
      },
      (error) => {
        console.log(error)
        this.toastr.error('Fetching error', 'Book', {
          closeButton: true,
          progressAnimation: 'increasing',
          progressBar: true,
          easing: 'linear',
          positionClass: 'toast-top-left',
        })
        setTimeout(() => {
          this.isLoading = false
        }, 1500)
      },
    )
  }
  getWriting() {
    this.isLoading = true
    this.book.getWritingBooks().subscribe(
      (data) => {
        this.isLoading = false
        if (data.length < 1) {
          this.toastr.info('Books have not been added yet', 'Book', {
            closeButton: true,
            progressAnimation: 'increasing',
            progressBar: true,
            easing: 'linear',
            positionClass: 'toast-top-right',
          })
        } else this.allBooks = data
      },
      (error) => {
        console.log(error)
        this.toastr.error('Fetching error', 'Book', {
          closeButton: true,
          progressAnimation: 'increasing',
          progressBar: true,
          easing: 'linear',
          positionClass: 'toast-top-left',
        })
        setTimeout(() => {
          this.isLoading = false
        }, 1500)
      },
    )
  }
  getVocabulary() {
    this.isLoading = true
    this.book.getVocabularyBooks().subscribe(
      (data) => {
        this.isLoading = false
        if (data.length < 1) {
          this.toastr.info('Books have not been added yet', 'Book', {
            closeButton: true,
            progressAnimation: 'increasing',
            progressBar: true,
            easing: 'linear',
            positionClass: 'toast-top-right',
          })
        } else this.allBooks = data
      },
      (error) => {
        console.log(error)
        this.toastr.error('Fetching error', 'Book', {
          closeButton: true,
          progressAnimation: 'increasing',
          progressBar: true,
          easing: 'linear',
          positionClass: 'toast-top-left',
        })
        setTimeout(() => {
          this.isLoading = false
        }, 1500)
      },
    )
  }

  // ********* Get Programming book via category ******

  getFrontend() {
    this.isLoading = true
    this.book.getFrontendBooks().subscribe(
      (data) => {
        this.isLoading = false
        if (data.length < 1) {
          this.toastr.info('Books have not been added yet', 'Book', {
            closeButton: true,
            progressAnimation: 'increasing',
            progressBar: true,
            easing: 'linear',
            positionClass: 'toast-top-right',
          })
        } else this.allBooks = data
      },
      (error) => {
        console.log(error)
        this.toastr.error('Fetching error', 'Book', {
          closeButton: true,
          progressAnimation: 'increasing',
          progressBar: true,
          easing: 'linear',
          positionClass: 'toast-top-left',
        })
        setTimeout(() => {
          this.isLoading = false
        }, 1500)
      },
    )
  }
  getBackend() {
    this.isLoading = true
    this.book.getBackendBooks().subscribe(
      (data) => {
        this.isLoading = false
        if (data.length < 1) {
          this.toastr.info('Books have not been added yet', 'Book', {
            closeButton: true,
            progressAnimation: 'increasing',
            progressBar: true,
            easing: 'linear',
            positionClass: 'toast-top-right',
          })
        } else this.allBooks = data
      },
      (error) => {
        console.log(error)
        this.toastr.error('Fetching error', 'Book', {
          closeButton: true,
          progressAnimation: 'increasing',
          progressBar: true,
          easing: 'linear',
          positionClass: 'toast-top-left',
        })
        setTimeout(() => {
          this.isLoading = false
        }, 1500)
      },
    )
  }

  // ********* Get Art book via category ******

  getHistorical() {
    this.isLoading = true
    this.book.getHistoricalBooks().subscribe(
      (data) => {
        this.isLoading = false
        if (data.length < 1) {
          this.toastr.info('Books have not been added yet', 'Book', {
            closeButton: true,
            progressAnimation: 'increasing',
            progressBar: true,
            easing: 'linear',
            positionClass: 'toast-top-right',
          })
        } else this.allBooks = data
      },
      (error) => {
        console.log(error)
        this.toastr.error('Fetching error', 'Book', {
          closeButton: true,
          progressAnimation: 'increasing',
          progressBar: true,
          easing: 'linear',
          positionClass: 'toast-top-left',
        })
        setTimeout(() => {
          this.isLoading = false
        }, 1500)
      },
    )
  }
  getLiterature() {
    this.isLoading = true
    this.book.getLiteratureBooks().subscribe(
      (data) => {
        this.isLoading = false
        if (data.length < 1) {
          this.toastr.info('Books have not been added yet', 'Book', {
            closeButton: true,
            progressAnimation: 'increasing',
            progressBar: true,
            easing: 'linear',
            positionClass: 'toast-top-right',
          })
        } else this.allBooks = data
      },
      (error) => {
        console.log(error)
        this.toastr.error('Fetching error', 'Book', {
          closeButton: true,
          progressAnimation: 'increasing',
          progressBar: true,
          easing: 'linear',
          positionClass: 'toast-top-left',
        })
        setTimeout(() => {
          this.isLoading = false
        }, 1500)
      },
    )
  }

  // *----------------------Search box----------------------
  _searchData: any = []
  searchResultMessage = ''
  searchData: any = []
  searchBook(search: any) {
    if (search.length > 0) {
      this.book.searchBook(search).subscribe((data: any) => {
        this.searchData = data
        if (data.length > 0) {
          this.isLoading = false
        }
        if (data.length <= 0) {
          this.searchResultMessage = 'Not Found'
        } else {
          this.searchResultMessage = ''
        }
      })
    } else return
  }

  public getBookById: any = []

  getById(book: any) {
    this.book.getBookById(book._id).subscribe((data) => {
      this.getBookById = data
    })
  }
  shareBook(book: Book) { }

  openDialogWithTemplateRef(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef)
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe()
  }
  scrollToTop(): void {
    // scroll to the top of the body
    return this.document.body.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'start'
    });
  }
}
