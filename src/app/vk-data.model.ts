export class User {
  constructor(
    public name: string,
    public photo: string,
    public page: string
  ) {}

  static adapt(data: any): User {
    return new User(
      `${data.first_name} ${data.last_name}`,
      data.photo_200 || data.photo_200_orig,
      `https://vk.com/${data.screen_name || `id${data.id}`}`
    );
  }
}

// модель данных приложения
export class VkData {
  constructor(
    public owner: User,
    public friends: User[]
  ) {}
}
