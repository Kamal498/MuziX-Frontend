import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { FavouritesService } from 'src/app/services/favourites.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input()
  detail: any;
  userId: String;

  constructor(private _router: Router, private fav: FavouritesService, private auth: AuthService) {}

  isLiked: boolean = false;
  
  ngOnInit() {

    this.auth.user$.subscribe(res => {
      console.log(res);
      this.userId = res.email;
      this.fav.checkFavourites(this.detail.id, this.userId).subscribe(resp => {
        console.log(resp);
        this.isLiked = resp.body;
      })
    })
    }

  seeDetails(item: any) {
    let artistId;

    if (item.type === 'artist') {
      artistId = item.id;
    } else {
      artistId = item.artists[0].id;
    }

    this._router.navigate(['dashboard', 'results', 'details'], { queryParams: { type: 'artist', id: artistId },   queryParamsHandling: 'merge' } );
  }

  gotoplayer(url, name, image){
    this._router.navigate(['dashboard', 'player'], { queryParams: { id: url, name: name, img: image },   queryParamsHandling: 'merge' })
  }

  alterFav(){
    let newOb = {
      "id": 1,
      "albumId": this.detail.id,
      "name": this.detail.name,
      "image": this.detail.images[0].url,
      "userId": this.userId,
      // "artists": this.detail.artists
    }
    console.log(newOb);
    this.fav.postFavourites(newOb).subscribe(res => {
      console.log(res);
    });
  }


}
