import React from 'react';
import { message } from 'antd';
import {
  generateId, injectState, useModule,
} from '../../../../lib';

class MyModuleWithEvents {

  state = injectState({
    logs: [] as string[],
    blogs: [] as string[],
  });

  init() {
    this.state.onLogsChange((newLogs, prevLogs) => {
      console.log('new logs', newLogs, 'prevLogs', prevLogs);
      message.info(`Logs changed ${this.state.logs.length}`);
    });
  }

  addLog() {
    this.state.setLogs([...this.state.logs, `log: ${generateId()}`]);
  }

  addBlog() {
    this.state.setBlogs([...this.state.blogs, `blog: ${generateId()}`]);
  }
}

export function EventsPage() {
  const {
    logs, blogs, addLog, addBlog,
  } = useModule(MyModuleWithEvents);

  return (
    <div>
      {logs.map(log => <div key={log}>{log}</div>)}
      {blogs.map(blog => <div key={blog}>{blog}</div>)}
      <button onClick={addLog}>ADD LOG</button>
      <button onClick={addBlog}>ADD BLOG</button>
    </div>
  );
}
