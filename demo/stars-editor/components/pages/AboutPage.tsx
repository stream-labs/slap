import React from 'react';

export function AboutPage () {
  function openChildWindow() {
    const myWindow = window.open('?id=child', '_blank');
    console.log('open window', myWindow);
    console.log('opener', myWindow?.opener);
  }

  return (
    <div>
      About page
      <a onClick={openChildWindow}>Open the Child window</a>
    </div>
  );
}
