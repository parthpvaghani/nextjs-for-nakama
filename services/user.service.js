import { BehaviorSubject } from 'rxjs';
import Router from 'next/router'

import { fetchWrapper } from 'helpers';

const baseUrl = `http://localhost:3001/api`;
const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

export const userService = {
    user: userSubject.asObservable(),
    get userValue () { return userSubject.value },
    login,
    logout,
    getAll,
    register
};

function login(username, password) {
    return fetchWrapper.post(`${baseUrl}/users/login`, {user:{ email:username, password }})
        .then(user => {
            // publish user to subscribers and store in local storage to stay logged in between page refreshes
            userSubject.next(user);
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
}

function register(username, password) {
    return fetchWrapper.post(`${baseUrl}/users`, {user:{ username:username, email:username, password }})
        .then(user => {
            // publish user to subscribers and store in local storage to stay logged in between page refreshes
            userSubject.next(user);
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
}

function logout() {
    // remove user from local storage, publish null to user subscribers and redirect to login page
    localStorage.removeItem('user');
    userSubject.next(null);
    Router.push('/login');
}

function getAll() {
    return fetchWrapper.get(`${baseUrl}/users/all`);
}
