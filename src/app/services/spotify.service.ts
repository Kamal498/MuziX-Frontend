import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { FavouritesService } from 'src/app/services/favourites.service';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private _http: HttpClient,private fav: FavouritesService) {}

  private url: string = 'https://api.spotify.com/v1/';
  private id: any = "2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6";
  private artist_id: any = "6eUKZXaKkcviH0Ku9w2n3V";

  private artist_id2: any = "66CXWjxzNUsdJxJ2JdwvnR";

  private artist_id3: any = "04gDigrS5kc9YWfZHwBETP";

  bearer_token = '';

  ngOnInit(){
  }

  // private headers: HttpHeaders = new HttpHeaders({
  //   Authorization:
  //     'Bearer '+ this.bearer_token
  // });

  getNewReleases() {
    //console.log(this.bearer_token);
    const newheaders: HttpHeaders = new HttpHeaders({
      Authorization:
        'Bearer '+ this.bearer_token
    });
    return this._http
      .get(this.url + `browse/new-releases`, { headers: newheaders })
      .pipe(map(data => data['albums'].items));
  }

  getArtist(txt: string) {
    const newheaders: HttpHeaders = new HttpHeaders({
      Authorization:
        'Bearer '+ this.bearer_token
    });
    return this._http
      .get(
        this.url + `search?q=${txt}&type=artist&market=SV&offset=0&limit=20`,
        { headers: newheaders }
      )
      .pipe(map(data => data['artists'].items));
  }

  getArtistById(id: string) {
    const newheaders: HttpHeaders = new HttpHeaders({
      Authorization:
        'Bearer '+ this.bearer_token
    });
    return this._http.get(this.url + `artists/${id}`, {
      headers: newheaders
    });
  }

  getTopTracks(id: string) {
    const newheaders: HttpHeaders = new HttpHeaders({
      Authorization:
        'Bearer '+ this.bearer_token
    });
    return this._http
      .get(this.url + `artists/${id}/top-tracks?country=us`, {
        headers: newheaders
      })
      .pipe(map(data => data['tracks']));
  }

  getSeveralArtists(){
    const newheaders: HttpHeaders = new HttpHeaders({
      Authorization:
        'Bearer '+ this.bearer_token
    });
    return this._http.get(this.url + 'artists/'+this.artist_id+'/related-artists', {
      headers: newheaders
    }).pipe(map(data => data['artists']));
  }

  getTrack(id){
    const newheaders: HttpHeaders = new HttpHeaders({
      Authorization:
        'Bearer '+ this.bearer_token
    });
    return this._http
      .get(this.url + `albums/${id}/tracks`, {
        headers: newheaders
      })
      .pipe(map(data => data['items']));
  }

  getRecommendedArtists(){
    const newheaders: HttpHeaders = new HttpHeaders({
      Authorization:
        'Bearer '+ this.bearer_token
    });
    return this._http.get(this.url + 'artists/'+this.artist_id2+'/related-artists', {
      headers: newheaders
    }).pipe(map(data => data['artists']));
  }

  getFavoriteArtists(){
    const newheaders: HttpHeaders = new HttpHeaders({
      Authorization:
        'Bearer '+ this.bearer_token
    });
    return this._http.get(this.url + 'artists/'+this.artist_id3+'/related-artists', {
      headers: newheaders
    }).pipe(map(data => data['artists']));
  }




  // private Refreshheaders: HttpHeaders = new HttpHeaders({
  //   Authorization: 'Basic MzA4YzgyOWMwZWY3NDBkNzlhYmMwMTk0OGQwYjFiYTQ6ZTk1MDk2ZTk1NTlkNDU3Njk4YTVmN2U0YTE5YWM4YzQ=',
  //   Content-Type: 'application/x-www-form-urlencoded'
  // });

  refreshtoken(){

    const params = new HttpParams({
      fromObject: {
        grant_type: 'refresh_token',
        refresh_token: this.refresh_token,
      }
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + this.basic_token
      })
    };

    this._http.post('https://accounts.spotify.com/api/token', params, httpOptions)
          .subscribe(
            (res: any) => {
              //console.log(res);
              //this.bearer_token = res.access_token;
              //console.log(this.bearer_token);
              sessionStorage.setItem('access_token', res.access_token);
              // sessionStorage.setItem('refresh_token', res.refresh_token);
              this.bearer_token = sessionStorage.getItem('access_token');
              //console.log(this.bearer_token);
            },
            err => console.log(err)
          );
  }

  refresh_token = "AQDWOB3cI9ydefOF5xdlqtr_uVIyMSaqAqUtTbIneVaUTsfBrkPpUL0mu11hrpOm0lCmrRM_WfBKSop-wt5KQMhFCcjL2V4MFjPUbtCAS-Az3Ob-RLd6r6LfRNrG5SBQvwo";
  basic_token= "MzA4YzgyOWMwZWY3NDBkNzlhYmMwMTk0OGQwYjFiYTQ6ZTk1MDk2ZTk1NTlkNDU3Njk4YTVmN2U0YTE5YWM4YzQ=";





  // artistId: string; 
  // artist: any = [];
  // getArtistNameFromUserFavorites(){
  //   this.fav.getFavorites().subscribe(res=>{
  //     console.log(res);
  //     this.artist=res;
  //     this.artistId=this.artist[0].albumId;
  //     console.log(this.artistId);
  //     return res;
  //   });
  // };



}
