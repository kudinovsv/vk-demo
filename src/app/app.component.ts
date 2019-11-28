import { Component, OnInit } from '@angular/core';

import { VkData } from './vk-data.model';
import { VkDataService } from './vk-data.service';
import { auth } from './utils';

@Component({
  selector: 'app-root',
  template: `
    <div *ngIf="!haveToken">
      <button (click)="authorize()" class="btn btn-primary">Авторизоваться</button>
    </div>
    <div *ngIf="vkData">
      <h1>Вы вошли как</h1>
      <app-user-list [users]="[vkData.owner]"></app-user-list>
      <hr>
      <h1>Друзья</h1>
      <app-user-list [users]="vkData.friends"></app-user-list>
    </div>
  `,
  styles: [`
    div {
      text-align: center;
    }

    h1 {
      font-size: 30px;
      font-family: "Trebuchet MS", Helvetica, sans-serif;
      color: darkgreen;
      margin: 20px 0;
    }

    button {
      margin-top: 10px;
    }

    hr {
      margin: 0;
      background-color: darkcyan;
    }
  `],
  providers: [VkDataService]
})
export class AppComponent implements OnInit {
  haveToken: boolean = auth.haveToken();
  vkData: VkData | undefined;

  constructor(private vkDataService: VkDataService) {}

  async ngOnInit() {
    if (this.haveToken) {
      this.vkData = await this.vkDataService.getData();
    }
  }

  authorize() {
    auth.authorize();
  }
}
