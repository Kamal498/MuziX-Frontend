import { FavouritesService } from 'src/app/services/favourites.service';
import { AuthService } from '@auth0/auth0-angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-favorites-container',
  templateUrl: './favorites-container.component.html',
  styleUrls: ['./favorites-container.component.css']
})
export class FavoritesContainerComponent implements OnInit {

  
  artistId: string;
  artist: any = [];

  userId: String;
  //preloading: boolean = true;
  //topTracks: any[] = [];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _spotifyService: SpotifyService,
    private auth: AuthService,
    private fav: FavouritesService) {}

  ngOnInit() {
    this.auth.user$.subscribe(res=> {
      this.userId=res.email;
      this.fav.getFavorites().subscribe(res=>{
        this.artist=res;
        // console.log(this.artist);
      });
      //this._spotifyService.refreshtoken();
    })}


  // displayFavorites(){
  //   return this.fav.fetchFavourites(this.userId).subscribe(res=>{
  //     this.artists=res;
  //   });
  // }

  }
