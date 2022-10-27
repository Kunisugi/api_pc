import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SvProductoService } from './../services/sv-producto.service';
import { IProducto} from './../modelo/i-producto';

@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.page.html',
  styleUrls: ['./ver-producto.page.scss'],
})
export class VerProductoPage implements OnInit {
  public id : number;
  public producto : IProducto;

  constructor(private activedRoute : ActivatedRoute, private api: SvProductoService) { }

  ngOnInit() {
    this.id = this.activedRoute.snapshot.queryParams['id'];
    console.log(this.id)

    this.api.getProducto(this.id).subscribe(data => {
      this.producto = data;
      console.log(this.producto.nombre)
    })
  }

}
