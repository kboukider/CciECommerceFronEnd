import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CatalogueService} from "../catalogue.service";
import {Product} from "../model/product.model";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  public currentProduct:Product;
  selectedFiles:any;
  progress: number;
  currentFileUpload: any;
  public currentTime: number;
  public editPhoto: boolean;
  public mode: number=0;

  constructor(private router:Router, private route:ActivatedRoute,
              public catalService:CatalogueService,
              public authService:AuthenticationService) { }

  ngOnInit() {
    let url=atob(this.route.snapshot.params.url);
    this.catalService.getProduct(url).subscribe(data=>{
      this.currentProduct=data;
    })
  }

  onEditPhoto(p) {
    this.currentProduct=p;
    this.editPhoto=true;
  }

  onSelectedFile(event) {
    this.selectedFiles=event.target.files;
  }

  uploadPhoto() {
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0)
    this.catalService.uploadPhotoProduct(this.currentFileUpload, this.currentProduct.id).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        //console.log(this.router.url);
        //this.getProducts(this.currentRequest);
        //this.refreshUpdatedProduct();
        this.currentTime=Date.now();
        this.editPhoto=false;
      }
    },err=>{
      alert("Problème de chargement");
    })

    this.selectedFiles = undefined
  }

  getTS() {
    return this.currentTime;
  }

  onEditProduct() {
    this.mode=1;
  }

  onUpdateProduct(data) {

  }

  onAddProductToCaddy(currentProduct: Product) {

  }
}
