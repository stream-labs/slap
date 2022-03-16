import { injectQuery } from '../../slapp/query';

const helloWorldQuery = createQuery(() => {

  return new Promise(resolve => {
    resolve('Hello World');
  });
});


class HelloWorldService {

  helloWorldQuery = injectQuery(helloWorldQuery);

}
