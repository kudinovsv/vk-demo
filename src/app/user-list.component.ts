import { Input, Component } from '@angular/core';

import { User } from './vk-data.model';

@Component({
  selector: 'app-user-list',
  template: `
    <div *ngFor="let user of users">
      <a [href]="user.page">
        <img [src]="user.photo" width="200" height="200">
      </a>
      <a [href]="user.page">
        {{ user.name }}
      </a>
    </div>
  `,
  styles: [`
    div {
      width: 220px;
      display: inline-block;
      margin-bottom: 25px;
    }

    img {
      display: block;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 6px;
    }

    a {
      color: #2a5885;
      font-family: -apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif,"Noto Sans Armenian","Noto Sans Bengali","Noto Sans Cherokee","Noto Sans Devanagari","Noto Sans Ethiopic","Noto Sans Georgian","Noto Sans Hebrew","Noto Sans Kannada","Noto Sans Khmer","Noto Sans Lao","Noto Sans Osmanya","Noto Sans Tamil","Noto Sans Telugu","Noto Sans Thai";
      font-weight: 700;
      font-size: 13px;
      text-decoration: none;
    }
  `]
})
export class UserListComponent {
  @Input() users: User[] = [];
}
