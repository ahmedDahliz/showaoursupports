import { Component, OnInit, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { SupportService } from './support.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewChecked{
  @ViewChild('scrolled', {static: false}) private somthingnicearea: ElementRef;
  @ViewChild('toDelete', {static: false}) private formDeletable: ElementRef;
  @ViewChild('toAppend', {static: false}) private divtoAppend: ElementRef;
  title = 'showaoursupport';
  country: string = "";
  supportsCount: string = "0";
  supports: any = [];

  constructor(private _support: SupportService){}

  ngOnInit() {

    this._support.getSupports().subscribe(res =>{
      this.supportsCount = res.length.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
      this.supports = [];
      console.log(res[0].payload.doc.data());

      res.forEach(support => {
        console.log(support.payload.doc.data());

        if (support.payload.doc.data().somethingnice) {
          this.supports.push(support)
        }
      });
    });

  }
  ngAfterViewChecked() {
       this.somthingnicearea.nativeElement.scrollTop = this.somthingnicearea.nativeElement.scrollHeight;
   }
  onClickSubmit(formData) {
    let badwords: any = ['fuckyou', 'fuck', 'asshole', 'cunt', ' bitch ', 'fucker', 'jerk', 'Son of a bitch ', 'Dick', 'Bastard', 'pussy'];
    badwords.forEach(badword => {
      if (formData['somethingnice'].toLowerCase().includes(badword.toLowerCase())) {
        formData['somethingnice'] = '';
      }
    });
    formData['date'] = new Date();
    if (formData['name'] === "") {
      formData['name'] = 'Anonyme';
    }

    this._support.setSupport(formData);
    this.formDeletable.nativeElement.remove();
    this.divtoAppend.nativeElement.innerHTML = "<div class='text-center mr-auto p-5' ><h2>Thank you for your support <i class='fa fa-thumbs-up'></i> </h2><h5> And don't forget to share please <i class='fas fa-praying-hands'></i></h5></div>"
  }
}
