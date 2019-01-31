import { Injectable } from '@angular/core';
import { Session } from '../models/session.model';
import { Router } from '@angular/router';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  //Declarate variables for localStorage token Authentication
  private localStorageService;
  private currentSession : Session = null;

  constructor(private router: Router) {
    this.localStorageService = localStorage;
    this.currentSession = this.loadSessionData();
  }

  /*
    Set Current User Session in App
  */
  setCurrentSession(session: Session): void {
    this.currentSession = session;
    this.localStorageService.setItem('currentUser', JSON.stringify(session));
  }

  /**
   * Load session data for user app
   */
  loadSessionData(): Session{
    var sessionStr = this.localStorageService.getItem('currentUser');
    return (sessionStr) ? <Session> JSON.parse(sessionStr) : null;
  }

  /**
   * Get Current Session data for user authenticate
   */
  getCurrentSession(): Session {
    return this.currentSession;
  }

  /**
   * Remove a Session data Authenticate
   */
  removeCurrentSession(): void {
    this.localStorageService.removeItem('currentUser');
    this.currentSession = null;
  }

  /**
   * Get Current User Authenticate, Return Object User
   */
  getCurrentUser(): User {
    var session: Session = this.getCurrentSession();
    return (session && session.user) ? session.user : null;
  };

  /**
   * Validate if User token Exist for validate authentication
   * True: User Auth
   * False: No user Auth
   */
  isAuthenticated(): boolean {
    return (this.getCurrentToken() != null) ? true : false;
  };

  /**
   * Return Current Token for User Auth
   */
  getCurrentToken(): string {
    var session = this.getCurrentSession();
    return (session && session.token) ? session.token : null;
  };

  /**
   * LogOut for App
   */
  logout(): void{
    this.removeCurrentSession();
    this.router.navigate(['/login']);
  }

}
