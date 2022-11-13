import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, ReplaySubject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    private currentUserSource = new ReplaySubject<User | null>(1);

    currentUser$ = this.currentUserSource.asObservable();
    baseUrl: string = 'https://localhost:5001/api/';

    constructor(private http: HttpClient) { }

    login(model: any) {
        return this.http.post(this.baseUrl + 'account/login', model).pipe(
            map((res: User) => {
                const user = res;
                if (user) {
                    localStorage.setItem('user', JSON.stringify(user));
                    this.currentUserSource.next(user);
                }
            })
        )
    }

    register(model: any) {
        return this.http.post(this.baseUrl + 'account/register', model).pipe(
            map((user: User) => {
                if (user) {
                    localStorage.setItem('user', JSON.stringify(user));
                    this.currentUserSource.next(user);
                }
            })
        )
    }

    logout() {
        localStorage.removeItem('user');
        this.currentUserSource.next(null);
    }

    setCurrentUser(user: User | null) {
        this.currentUserSource.next(user);
    }

}