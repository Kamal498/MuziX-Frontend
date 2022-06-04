import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isAuth = false;

  constructor(public auth: AuthService, 
    @Inject(DOCUMENT) public document: Document, 
    private router: Router,
    private _spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(res => {
      if (res) {
        this.router.navigate(['dashboard']);
        this.isAuth = true;
      }
    });
    this._spotifyService.refreshtoken();
    setInterval(()=> { 
      this._spotifyService.refreshtoken(); 
    }, 3500 * 1000);
  }

}
