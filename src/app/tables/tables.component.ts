import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../author.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {

  isConfiguratorOpen = false;
  selectedItemColor: string = '';
  
  toggleConfigurator() {
    this.isConfiguratorOpen = !this.isConfiguratorOpen;
  }

  onColorChange(color: string): void {
    if (color) {
      this.selectedItemColor = color; // Update the color
    }
  }

  navItems = [
    { label: 'Dashboard', icon: 'dashboard', link: '/dashboard', isSelected: false },
    { label: 'Tables', icon: 'table_chart', link: '/tables', isSelected: false },
    { label: 'Billing', icon: 'receipt', link: '/billing', isSelected: false },
    { label: 'Profile', icon: 'person', link: '/user-profile', isSelected: false },
    { label: 'Sign In', icon: 'login', link: '/sign-in', isSelected: false },
    { label: 'Sign Out', icon: 'logout', link: '/sign-out', isSelected: false },
  ];
  
  selectNavItem(selectedItem: any): void {
    this.navItems.forEach(item => (item.isSelected = false)); // Deselect all items
    selectedItem.isSelected = true; // Select the clicked item
  }

  authors : any[] = [];
  displayedColumns: string[] = ['name', 'email', 'phone', 'actions'];


  projects = [
    { name: 'Project A', budget: 5000, status: 'Ongoing', completion: 40 },
    { name: 'Project B', budget: 10000, status: 'Completed', completion: 100 },
    { name: 'Project C', budget: 7000, status: 'Ongoing', completion: 70 },
    { name: 'Project D', budget: 15000, status: 'Canceled', completion: 10 }
  ];

  displayedProjectColumns: string[] = ['project', 'budget', 'status', 'completion', 'actions'];

  constructor(private authorService: AuthorService, private router: Router ) { }

  ngOnInit(): void {
    this.authorService.authors$.subscribe(authors => {
      this.authors = authors;
    });

  }

  editAuthor(author: any) {
    this.authorService.setEditingAuthor(author);
    this.router.navigate(['/dashboard']); 
  }

  deleteAuthor(author: any) {
    this.authorService.deleteAuthor(author);
  }

  deleteProject(project: any) {
    console.log('Deleted project:', project);
    this.projects = this.projects.filter(p => p !== project);
  }
}

