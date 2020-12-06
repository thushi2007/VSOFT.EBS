import {Injectable} from '@angular/core';

export const menuitemLst: any[] = [
  {
    Text: 'Home',
    Url: '/home'
  },
  {
    Text: 'Benutzerkonto',
    UrlPattern: 'benutzerkonto',
    Url: '/benutzerkonto/admin',
    Children: [
      {
        Text: 'Anmelden',
        Url: '/anmelden'
      },
      {
        Text: 'Registrieren',
        Url: '/registrieren'
      }
    ]
  },
  {
    Text: 'Reinigungsservice',
    Url: '',
    UrlPattern: 'reinigungsservice',
    Children: [
      {
        Text: 'Umzugsreinigung',
        Url: '/reinigungsservice/umzugsreinigung'
      },
      {
        Text: 'Unterhaltsreinigung',
        Url: '/reinigungsservice/unterhaltungsreinigung'
      },
      {
        Text: 'Baureinigung',
        Url: '/reinigungsservice/baureinigung'
      },
      {
        Text: 'Entsorgung und Reinigung',
        Url: '/reinigungsservice/entsorgungraeumung'
      },
      {
        Text: 'Anfrage',
        Url: '/reinigungsservice/anfrage'
      }
    ]
  },
  {
    Text: 'Hauswartung',
    UrlPattern: 'hauswartung',
    Children: [
      {
        Text: 'Preise',
        Url: '/hauswartung/preise'
      },
      {
        Text: 'Anfrage',
        Url: '/hauswartung/anfrage'
      }
    ]
  },
  {
    Text: 'Immobilien',
    Url: 'immobilien'
  },
  {
    Text: 'Kontakt',
    Url: '/kontakt'
  },
  {
    Text: 'Benutzerkonto',
    OnlyMobile: true,
    Url: '',
    UrlPattern: 'benutzerkonto',
    Children: [
      {
        Text: 'Anmelden',
        Url: '/anmelden'
      },
      {
        Text: 'Registrieren',
        Url: '/registrieren'
      },
      {
        Text: 'Passwort vergessen',
        Url: '/pwtvergessen'
      }
    ]
  }
];

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  menuItems: any[];

  constructor() {
    this.menuItems = menuitemLst;
  }

  getMenuItemWithChildren(urlkey: string): any[] {
    return this.menuItems.filter((obj: any) => {
      const pattern = urlkey.replace('/', '');
      return obj.Url === urlkey || (obj?.UrlPattern === pattern);
    });
  }
}
