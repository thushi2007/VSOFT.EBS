import {Injectable} from '@angular/core';

export const menuitemLst: any[] = [
  {
    Text: 'Home',
    Url: '/home'
  },
  {
    Text: 'Anmelden',
    UrlPattern: 'anmelden',
    Url: '/anmelden',
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
    Text: 'Benutzerkonto',
    UrlPattern: 'benutzerkontoadmin',
    Url: '/benutzerkonto/admin',
    Children: [
      {
        Text: 'Produkte',
        Url: '/benutzerkonto/admin/artikel'
      },
      {
        Text: 'Kunden',
        Url: '/benutzerkonto/admin/kunden'
      },
      {
        Text: 'Bestellungen',
        Url: '/benutzerkonto/admin/kaeufe'
      },
      {
        Text: 'Profil',
        Url: '/benutzerkonto/admin/profile'
      },
      {
        Text: 'Abmelden',
        Url: '/anmelden'
      }
    ]
  },
  {
    Text: 'Benutzerkonto',
    UrlPattern: 'benutzerkontokunde',
    Url: '/benutzerkonto/kunde',
    Children: [
      {
        Text: 'Bestellungen',
        Url: '/benutzerkonto/kunde/kaeufe'
      },
      {
        Text: 'Profil',
        Url: '/benutzerkonto/kunde/profile'
      },
      {
        Text: 'Abmelden',
        Url: '/anmelden'
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
