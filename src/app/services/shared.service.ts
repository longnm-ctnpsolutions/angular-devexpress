import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { Company } from '../types/company';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private companyDataSubject = new BehaviorSubject<Company | undefined>(
    this.loadDataFromLocalStorage()
  );

  setCompanyData(data: Company | undefined) {
    this.companyDataSubject.next(data);
    localStorage.setItem('companyData', JSON.stringify(data));
  }

  getCompanyData() {
    return this.companyDataSubject.asObservable();
  }

  generateRandomImage(): string {
    const profileImgsNameList = [
      'Garfield',
      'Tinkerbell',
      'Annie',
      'Loki',
      'Cleo',
      'Angel',
      'Bob',
      'Mia',
      'Coco',
      'Gracie',
      'Bear',
      'Bella',
      'Abby',
      'Harley',
      'Cali',
      'Leo',
      'Luna',
      'Jack',
      'Felix',
      'Kiki',
    ];
    const profileImgsCollectionsList = [
      'notionists-neutral',
      'adventurer-neutral',
      'fun-emoji',
    ];
    const randomName =
      profileImgsNameList[
        Math.floor(Math.random() * profileImgsNameList.length)
      ];
    const randomCollection =
      profileImgsCollectionsList[
        Math.floor(Math.random() * profileImgsCollectionsList.length)
      ];

    const imageUrl = `https://api.dicebear.com/6.x/${randomCollection}/svg?seed=${randomName}`;
    console.log('Generated Image URL:', imageUrl); // Kiểm tra URL
    return imageUrl;
  }

  private loadDataFromLocalStorage(): Company | undefined {
    const data = localStorage.getItem('companyData');
    return data ? JSON.parse(data) : undefined;
  }
}
