import React, { useState } from 'react';
import { Button, message, Tag } from 'antd';

export function InspectInConsoleModal() {

  function onCopyHandler() {
    navigator.clipboard.writeText('$p0.instance');
    message.destroy();
  }

  return (
    <div>
      <p>Type <Tag>$p0.instance</Tag> in the console to access this module</p>

      <Button type="primary" onClick={onCopyHandler}>
        Copy reference to Clipboard
      </Button>

    </div>
  );

}
