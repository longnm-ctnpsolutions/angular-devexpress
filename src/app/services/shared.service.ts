import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Company } from '../types/company';

@Injectable({
  providedIn: 'root', // Khai báo ở đây để tạo 1 instance duy nhất
})
export class SharedDataService {
  private companyDataSubject = new BehaviorSubject<Company | undefined>(
    this.loadDataFromLocalStorage()
  );

  private companyList = new BehaviorSubject<Company[]>(
    this.loadDataListFromLocalStorage() || []
  );

  setCompanyList(data: Company[]) {
    this.companyList.next(data);
    localStorage.setItem('companyList', JSON.stringify(data));
  }

  getCompanyList(): Company[] {
    return this.companyList.getValue();
  }

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

  private loadDataListFromLocalStorage(): Company[] | [] {
    const data = localStorage.getItem('companyList');
    return data ? JSON.parse(data) : [];
  }

  private loadDataFromLocalStorage(): Company | undefined {
    const data = localStorage.getItem('companyData');
    return data ? JSON.parse(data) : undefined;
  }
}
