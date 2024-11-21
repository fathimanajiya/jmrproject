import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../author.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

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

  
  
  formData = { name: '', email: '', phone: '' };
  isEditing = false;
  carouselImages = [
    'assets/image1.png',
    'assets/image2.png',
    'assets/image3.png'
  ];
  currentImageIndex = 0;
  

  constructor(private authorService: AuthorService, private router: Router) { }

  ngOnInit(): void {
    this.initializeTables();
    this.startCarousel();

    const editingAuthor = this.authorService.getEditingAuthor();
    if (editingAuthor) {
      this.formData = { ...editingAuthor }; 
      this.isEditing = true;
    }
  }

  prevImage() {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.carouselImages.length) % this.carouselImages.length;
  }

  
  nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.carouselImages.length;
  }

  startCarousel() {
    setInterval(() => {
      this.nextImage(); // Automatically move to the next image every 4 seconds
    }, 4000); // Change this value to adjust the speed
  }

  initializeTables() {
    setTimeout(() => {

     
    }, 0);
  }

  onSubmit() {
    if (this.isEditing) {
      this.authorService.updateAuthor(this.formData);
    } else {
      this.authorService.addAuthor(this.formData);
    }
    this.resetForm();
    this.router.navigate(['/tables']);
  }

  private resetForm() {
    this.formData = { name: '', email: '', phone: '' };
    this.isEditing = false;
    this.authorService.setEditingAuthor(null);
  }
}
