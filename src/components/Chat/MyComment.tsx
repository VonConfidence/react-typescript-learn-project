import * as React from 'react';
import { ICommentItem } from './chat';

import './mycomment.less';
/*
  author: string;
  avatar: string;
  content: React.ComponentType;
  datetime: string;
*/
export default function MyComment(props: ICommentItem) {
  const { avatar, author, content, datetime } = props;
  return (
    <React.Fragment>
      <div className="my-comment">
        <div className="my-comment-inner">
          <div className="my-comment-content">
            <div className="ant-comment-content-author" style={{ justifyContent: 'flex-end' }}>
              <span className="ant-comment-content-author-time">{datetime}</span>
              <span className="ant-comment-content-author-name">{author}</span>
            </div>
            <div className="ant-comment-content-detail" style={{ textAlign: 'right' }}>
              {content}
            </div>
          </div>
          <div className="my-comment-avatar">
            <img src={avatar} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
