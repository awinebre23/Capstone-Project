import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedItemComponent } from './feed-item/feed-item.component';
import { FeedComponent } from './feed.component';
import { MoneyPipe } from 'src/app/shared/money.pipe';
import { ManageComponent } from './manage/manage.component';
import { InvestorManageComponent } from './manage/investor-manage/investor-manage.component';
import { MemberManageComponent } from './manage/member-manage/member-manage.component';


@NgModule({
  declarations: [
    FeedComponent,
    FeedItemComponent,
    ManageComponent,
    MoneyPipe,
    ManageComponent,
    InvestorManageComponent,
    MemberManageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FeedModule { }
