import { Component } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

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
}
