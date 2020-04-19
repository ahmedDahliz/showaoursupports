import { Component, OnInit } from '@angular/core';
import { SupportService } from './support.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'showaoursupport';
  country: string = "";
  supportsCount: number = 0;
  supports: any = [];
  constructor(private _support: SupportService){}

  ngOnInit() {
    this._support.getSupports().subscribe(res =>{
      this.supportsCount = res.length.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
      res.forEach(support => {
        if (support.payload.doc.data().somethingnice) {
          this.supports.push(support)
        }
      });

    });
  }

  onClickSubmit(formData) {
    this._support.setSupport(formData).then();
  }
}
