import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList, EventEmitter, Output } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { TablesComponent } from '../tables/tables.component';
import { BillingComponent } from '../billing/billing.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})


export class SettingsComponent implements AfterViewInit {

  constructor(private dashboard: DashboardComponent,
  ) {}

  @Output() colorChange = new EventEmitter<string>(); // Emit color changes to parent

  changeColor(color: string):void {
    // Emit the selected color to the parent component
    this.colorChange.emit(color);
  }

  closeConfigurator():void {
    this.dashboard.isConfiguratorOpen = false;
    this.colorChange.emit('');
  }


  // Get references to the toggle switches and sidenav buttons

  @ViewChildren('toggleSwitch') toggleSwitches!: QueryList<ElementRef>;
  @ViewChildren('sidenavButton') sidenavButtons!: QueryList<ElementRef>;

  ngAfterViewInit(): void {
    // Add click event listeners for toggle switches
    this.toggleSwitches.forEach(switchEl => {
      switchEl.nativeElement.addEventListener('click', () => {
        switchEl.nativeElement.classList.toggle('active');
      });
    });

    // Add click event listeners for sidenav type buttons
    this.sidenavButtons.forEach(button => {
      button.nativeElement.addEventListener('click', () => {
        this.sidenavButtons.forEach(btn => btn.nativeElement.classList.remove('active'));
        button.nativeElement.classList.add('active');
      });
    });
  }
}

