import {Injectable} from '@angular/core';

export const menuitemLst: any[] = [
  {
    Text: 'Home',
    Url: '/home'
  },
  {
    Text: 'Transport',
    UrlPattern: 'transportservice',
    Children: [
      {
        Text: 'Paketlieferung',
        Url: '/transportservice/paketlieferung'
      },
      {
        Text: 'Tourlieferungen',
        Url: '/transportservice/tourlieferung'
      },
      {
        Text: 'Weitere Transporte',
        Url: '/transportservice/weiterelieferung'
      }
    ]
  },
  {
    Text: 'Umzugsservice',
    UrlPattern: 'umzugsservice',
    Url: '',
    Children: [
      {
        Text: 'Geschäftsumzug',
        Url: '/umzugsservice/geschaeftsumzug'
      },
      {
        Text: 'Privatumzug',
        Url: '/umzugsservice/privatumzug'
      },
      {
        Text: 'Weitere Umzüge',
        Url: '/umzugsservice/weitereumzuege'
      },
      {
        Text: 'Anfrage',
        Url: '/umzugsservice/anfrage'
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
  },
  {
    Text: 'Benutzerkonto',
    OnlyMobile: true,
    LoggedInUser: true,
    Url: '',
    UrlPattern: 'benutzerkontolggedIn',
    Children: [
      {
        Text: 'Übersicht',
        Url: '/benutzerkonto/uebersicht'
      },
      {
        Text: 'Meine Anfragen',
        Url: '/benutzerkonto/anfragen'
      },
      {
        Text: 'Meine Offerten',
        Url: '/benutzerkonto/offerten'
      },
      {
        Text: 'Meine Aufträge',
        Url: '/benutzerkonto/auftraege'
      },
      {
        Text: 'Benutzerprofil',
        Url: '/benutzerkonto/benutzerprofil'
      },
      {
        Text: 'Abmelden',
        Url: '/anmelden'
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
