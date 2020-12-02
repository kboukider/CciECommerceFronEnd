import {ProductItem} from '../model/product-item.model';
import {Injectable} from '@angular/core';
import {Product} from '../model/product.model';
import {AuthenticationService} from './authentication.service';
import {Caddy} from '../model/caddy.model';
import {Client} from '../model/client.model';
@Injectable({
  providedIn: 'root'
})
export  class CaddyService{
  public currentCaddyName:string="Caddy1";
  public listCaddies:Array<{num:number,name:string}>=[{num:1,name:'Caddy1'}];
  public caddies:Map<string,Caddy>=new Map();

  constructor(public authenticationService:AuthenticationService){
    let caddies=localStorage.getItem("myCaddies");
    if(caddies){
      this.caddies=JSON.parse(caddies);
    }
    else {
      let caddy = new Caddy(this.currentCaddyName);
      // this.caddies[this.currentCaddyName]=caddy;
      this.caddies.set(this.currentCaddyName, caddy);
    }
  }

  public addProductToCaddy(product:Product):void{
    //let caddy=this.caddies[this.currentCaddyName];
    let caddy=this.caddies.get(this.currentCaddyName);
    let productItem:ProductItem = caddy.items.get(product.id);
    if(productItem) {
      productItem.quantity+= product.quantity;
    }
    else{
      productItem=new  ProductItem();
      productItem.price=product.currentPrice;
      productItem.quantity=product.quantity;
      productItem.product=product;
      caddy.items.set(product.id, productItem);
      this.saveCaddies();
    }
  }

  public saveCaddies(){
    localStorage.setItem('myCaddies', JSON.stringify(this.caddies));
  }

  public getCurrentCaddy():Caddy {
    return this.caddies.get(this.currentCaddyName);
  }


  /*
    public removeProduct(id:number):void{
      let caddy=this.caddies[this.currentCaddyName];
      delete caddy.items[id];
      this.saveCaddy();
    }
    public addProduct(product:Product){
      this.addProductToCaddy(product.id,product.name,product.currentPrice,product.quantity)
      this.saveCaddy();
    }
    public loadCaddyFromLocalStorage(){
      let myCaddiesList=localStorage.getItem("ListCaddies_"+this.authService.authenticatedUser.username);
      this.listCaddies=myCaddiesList==undefined?[{num:1,name:'Caddy1'}]:JSON.parse(myCaddiesList);
      this.listCaddies.forEach(c=>{
        let cad=localStorage.getItem("myCaddy_"+this.authService.authenticatedUser.username+"_"+c.name);
        this.caddies[c.name]=cad==undefined?new Caddy(c.name):JSON.parse(cad);
      })
    }
    public getCaddy():Caddy{
      let caddy=this.caddies[this.currentCaddyName];
      return caddy;
    }

    saveCaddy() {
      let caddy=this.caddies[this.currentCaddyName];
      localStorage.setItem("myCaddy_"+this.authService.authenticatedUser.username+"_"+this.currentCaddyName,JSON.stringify(caddy));
    }

    getSize(){
      let caddy=this.caddies[this.currentCaddyName];
      return Object.keys(caddy.items).length;
    }

    emptyCaddy(){
      this.caddies=new Map();
      this.listCaddies=[];
    }

    getTotalCurrentCaddy() {
      let caddy=this.caddies[this.currentCaddyName];
      let total=0;
      for(let key in caddy.items ){
        total+=caddy.items[key].price*caddy.items[key].quantity;
      }
      return total;
    }

    addNewCaddy(c: { num: number; name: string }) {
      this.listCaddies.push(c);
      this.caddies[c.name]=new Caddy(c.name);
      localStorage.setItem("ListCaddies_"+this.authService.authenticatedUser.username,JSON.stringify(this.listCaddies));
    }

    setClient(client: Client) {
      this.getCaddy().client=client;
      this.saveCaddy();
    }
   */
  public getTotal():number{
    let total=0;
    let items:IterableIterator<ProductItem>= this.getCurrentCaddy().items.values();
    for (let pi of items){
      total+=pi.price*pi.quantity;
    }
    return total;
  }
}
