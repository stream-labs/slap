chrome.devtools.panels.create('ReactModules', null, '/panel.html', () => {

  chrome.devtools.inspectedWindow.eval(
    "alert('Alert from devtools.js')",
    (result, isException) => {

    },
  );
});
