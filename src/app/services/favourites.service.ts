import { AuthService } from '@auth0/auth0-angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  favorites :any =[];
  favoriteSubject : BehaviorSubject<Array<Object>>;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.favoriteSubject = new BehaviorSubject<Array<any>>(this.favorites);
    this.auth.user$.subscribe(res => {
      this.fetchFavourites(res.email);
    })
   }

  //url for production env on cloud
  prod_url = 'http://muzixappbackend-env.eba-rwbwqu9m.us-east-1.elasticbeanstalk.com'
  
  //url for development env on local
  dev_url = 'http://localhost:5000'
  
  fetchFavourites(id){
    return this.http.get(this.prod_url + '/get/' + id).subscribe(res => {
      this.favorites=res;
      this.favoriteSubject.next(this.favorites);
    },
    err=>{
      this.favorites=[];
      this.favoriteSubject.next(this.favorites);
    });
  }

  getFavorites(){
    return this.favoriteSubject;
  }

  postFavourites(fav){
    return this.http.post(this.prod_url + '/add', fav)
    .pipe(tap(
      (res) => {
        let flag =false;
        for(let i of this.favorites){
          if(i.name===fav.name){

            flag=true;
            break;
          }
        }
        if(!flag){
          this.favorites.push(res);
          this.favoriteSubject.next(this.favorites);
        }
        else{
        let temp =this.favorites.filter(res=>{
          return res.name!=fav.name;
        });
        this.favorites=temp;
        this.favoriteSubject.next(this.favorites);
      }
    }
    ));
  }

  checkFavourites(albumId, userId){
    return this.http.get(this.prod_url + '/check?albumId=' + albumId + '&userId=' + userId).pipe(map(data => data));
  }
}