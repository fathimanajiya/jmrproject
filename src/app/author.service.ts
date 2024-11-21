import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  // Use BehaviorSubject to hold authors' data and allow components to subscribe to changes
  private authorsSource = new BehaviorSubject<any[]>([]);
  authors$ = this.authorsSource.asObservable();

  private editingAuthorSource = new BehaviorSubject<any>(null);
  editingAuthor$ = this.editingAuthorSource.asObservable();

  constructor() { }

  // Add a new author to the list
  addAuthor(author: any) {
    const currentAuthors = this.authorsSource.value;
    this.authorsSource.next([...currentAuthors, author]);
  }

  // Set the author for editing
  setEditingAuthor(author: any) {
    this.editingAuthorSource.next(author);
  }

  // Get the current author being edited
  getEditingAuthor() {
    return this.editingAuthorSource.value;
  }

  // Update an existing author
  updateAuthor(updatedAuthor: any) {
    const authors = this.authorsSource.value.map(author => 
      author.email === updatedAuthor.email ? updatedAuthor : author
    );
    this.authorsSource.next(authors);
  }

  // Delete an author
  deleteAuthor(author: any) {
    const updatedAuthors = this.authorsSource.value.filter(a => a !== author);
    this.authorsSource.next(updatedAuthors);
  }
}
