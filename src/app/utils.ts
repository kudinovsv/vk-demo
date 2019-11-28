export function encodeQueryString(params: Record<string, string | number>): string {
  // формирование строки параметров для url с добавлением версии API
  const API_VER = '5.101';

  const paramsStr = Object.fromEntries(
    Object.entries(params).map(([k, v]) => [k, v.toString()])
    // можно было и не конвертировтаь, а просто передать <any>params в конструктор URLSearchParams
  );
  paramsStr.v = API_VER;

  return `?${new URLSearchParams(paramsStr).toString()}`;
}

const TOKEN_KEY = 'token';

(function checkUrlForToken() {
  // пытаемся получить токен из url
  const hash = document.location.hash;
  if (hash) {
    const token = (new URLSearchParams(hash.slice(1))).get('access_token');
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    }
  }
})();

export const auth = {
  getToken(): string {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return token;
    } else {
      throw new Error('Токен отсутствует.');
    }
  },

  haveToken(): boolean {
    return Boolean(localStorage.getItem(TOKEN_KEY));
  },

  removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  },

  authorize(): void {
    // попытка авторизавться в vk
    const CLIENT_ID = 7075443;

    document.location.href = `https://oauth.vk.com/authorize${encodeQueryString({
      client_id: CLIENT_ID,
      redirect_uri: 'https://kudinovsv.github.io/vk.demo/',
      scope: 'friends',
      response_type: 'token'
    })}`;
  }
};
