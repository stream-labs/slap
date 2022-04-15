import React from 'react';
import { message } from 'antd';
import {
  generateId, injectState, useModule, injectWatch,
} from '../../../../lib';

class MyWatchersModule {

  state = injectState({
    logs: [] as string[],
    blogs: [] as string[],
  });

  watchLogs = injectWatch(() => this.state.logs, this.onLogsChanged);

  onLogsChanged(logs: string[]) {
    message.info(`Logs changed ${logs.length}`);
  }

  addLog() {
    this.state.setLogs([...this.state.logs, `log: ${generateId()}`]);
  }

  addBlog() {
    this.state.setBlogs([...this.state.blogs, `blog: ${generateId()}`]);
  }
}

export function WatchersPage () {
  const {
    logs, blogs, addLog, addBlog,
  } = useModule(MyWatchersModule);

  return (
    <div>
      {logs.map(log => <div key={log}>{log}</div>)}
      {blogs.map(blog => <div key={blog}>{blog}</div>)}
      <button onClick={addLog}>ADD LOG</button>
      <button onClick={addBlog}>ADD BLOG</button>
    </div>
  );
}
