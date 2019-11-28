import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { VkData, User } from './vk-data.model';
import { encodeQueryString, auth } from './utils';

@Injectable()
export class VkDataService {
  constructor(private http: HttpClient) {}

  private static checkErrors(data: any[]): void {
    if (!data[0].error && !data[1].error) {
      return;
    }

    if (
      [data[0].error, data[1].error].some(
        err => err && err.error_msg.startsWith('User authorization failed'))
    ) { // then
      // если это ошибка авторизации (например истёк токен), то пытаемся авторизваться заново
      auth.removeToken();
      auth.authorize();
      throw new Error(); // прерываем выполнение скрипта
    }

    // при прочих ошибках кидаем исключение с описанием ошибки
    const msg: string = (data[0].error && data[0].error.error_msg) ||
      (data[1].error && data[1].error.error_msg);
    throw new Error(msg);
  }

  async getData(): Promise<VkData> {
    // запрос данных VkData от API vk
    const requestFields = 'first_name, last_name, photo_200, photo_200_orig, screen_name';
    const token = auth.getToken();
    const url1 = `https://api.vk.com/method/users.get${encodeQueryString({
      access_token: token,
      fields: requestFields
    })}`;
    const url2 = `https://api.vk.com/method/friends.get${encodeQueryString({
      access_token: token,
      count: 5,
      order: 'random',
      fields: requestFields
    })}`;

    const data: any[] = await Promise.all([
      this.http.jsonp(url1, 'callback').toPromise(),
      this.http.jsonp(url2, 'callback').toPromise()
    ]);

    // я знаю что следуя Angular-way это следовало бы делать так:
    //
    // return forkJoin([
    //   this.http.jsonp(url1, 'callback'),
    //   this.http.jsonp(url2, 'callback')
    // ]).pipe(map((data: any[]) => {
    //
    // но при этом теряется магия async/await, что не здорово

    VkDataService.checkErrors(data);

    // преобразуем данные полученные от API в экзепляр VkData
    return new VkData(
      User.adapt(data[0].response[0]),
      data[1].response.items.map((friend: any) => User.adapt(friend))
    );
  }
}
