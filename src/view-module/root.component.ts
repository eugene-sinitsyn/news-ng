import { Component } from '@angular/core';
import { ArticleModel } from '@domain';

@Component({
  selector: 'news-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class AppComponent {
  public readonly mockArticle: ArticleModel = {
    source: {
      id: 'the-washington-post',
      name: 'The Washington Post'
    },
    author: 'Seung Min Kim, Paul Kane, Elise Viebeck',
    title: 'Senate leaders battle over impeachment trial after McConnell rejects Democrats\' calls for witnesses - The Washington Post',
    description: 'The Senate majority leader, who said he would work in “total cooperation” with the White House, suggested the House’s case against Trump is “deficient.”',
    url: 'https://www.washingtonpost.com/politics/mcconnell-rejects-democrats-call-for-new-witnesses-in-senate-impeachment-trial/2019/12/17/dbdc326a-20e9-11ea-bed5-880264cc91a9_story.html',
    urlToImage: 'https://www.washingtonpost.com/resizer/2EqPoWCB0jtwx9Z4oK13pB5-7BU=/1440x0/smart/arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/MJMKBQBA5MI6VPWVRABGJTERVE.jpg',
    publishedAt: '2019-12-17T18:14:00Z',
    content: 'Asked during a later interview with The Washington Post about the contentious and public tit-for-tat between the two leaders before a formal meeting has even been scheduled, Schumer said McConnell was the one creating the tensions.\r\nI dont do it, he said. Hes… [+5297 chars]'
    }
}