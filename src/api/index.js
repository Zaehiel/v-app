import article from './article';
import list from './list';

const api = (queryType) => new Promise((resolve, reject) => {
  setTimeout(() => {
    let response = null;

    switch(queryType) {
      case 'list':
        response = list;
        break;
      case 'article':
        response = article;
        break;
    }

    resolve({
      response,
    });
  }, 222);
});

export default api;