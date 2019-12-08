
import AppModel from '../models/AppModel';
import AppView from '../views/AppView';

export default class App {
  constructor() {
    this.state = {
      url: 'https://www.googleapis.com/youtube/v3/search?',
      key: 'key=AIzaSyDJwUoIs67Y4o8zmJDnuJ8q-EdX18dwwgo',
      type: '&type=video',
      part: '&part=snippet',
      maxRes: '&maxResults=15',
      query: '&q=',
      myQuery: '',
      pageToken: '&pageToken=',
      nextPageToken: '',
    };
  }

  async start() {
    const model = new AppModel(this.state);
    const data = await model.getClipNames();

    const view = new AppView(data[0]);
    let flag = 0;
    let page = 1;

    view.show(page);
    let mas = [];
    const mass = [];
    let step3 = 0;
    let tok = 0;

    function func() {
      const line = document.querySelector('.line');
      const cards = document.querySelectorAll('.card');
      const cardsWidth = document.querySelector('.cards').offsetWidth;
      const widthArray = [0];
      let lineWidth = 0;
      const offset = 0;
      const step = 1;
      const ostatok = 0;

      for (let i = 0; i < cards.length; i += 1) {
        widthArray.push(cards[i].offsetWidth * 4 + 100);
        lineWidth += cards[i].offsetWidth * 4 + 100 + 100000;
      }

      line.style.width = `${lineWidth}px`;
      flag += 1;
      const masq = [line, cards, cardsWidth, widthArray, lineWidth, offset, step, ostatok];
      return masq;
    }

    function revert() {
      while (mass[6] > 1) {
        mass[6] -= 1;
        if (((mass[6] - 1) % 3 === 0)) {
          [,,,,,, step3] = mass;
        }
        mass[5] -= mass[3][mass[6]];
        mass[0].style.left = `${-mass[5]}px`;
        const currentPage = document.getElementsByClassName('page')[0].innerHTML;
        const nextPage = document.getElementsByClassName('page')[0];
        nextPage.innerHTML = Number(currentPage) - 1;
      }
    }

    const searchButton = document.getElementsByClassName('searchButton')[0];
    searchButton.addEventListener('click', async () => {
      const dd = document.getElementsByClassName('line')[0];
      dd.classList.add('hid');
      revert();
      function f() {
        dd.classList.remove('hid');
      }
      setTimeout(f, 300);
      const query = document.getElementsByClassName('teaxtarea')[0].value;
      const model1 = new AppModel(this.state);
      this.state.myQuery = query;
      const inf = await model1.getClipNames();
      const view1 = new AppView(inf[0]);
      [,, tok] = inf;
      if (view1.titles.length === 0) view.error();
      else {
        page += 1;
        view1.showClips(page);
      }
    });

    const next = document.getElementsByClassName('next')[0];
    next.addEventListener('click', async () => {
      if (flag === 0) {
        mas = func();
        mass.push(mas[0], mas[1], mas[2], mas[3], mas[4], mas[5], mas[6], mas[7]);
      }

      mass[7] = mass[4] - mass[2] - (mass[5] + mass[3][mass[6]]);
      if (mass[7] >= 0) {
        if ((mass[6] % 3 === 0) && mass[6] > step3) {
          [,,,,,, step3] = mass;
          const model2 = new AppModel(this.state);
          const inf = await model2.getnextClips(tok);
          const view1 = new AppView(inf[0]);
          [,, tok] = inf;
          if (view1.titles.length === 0) view.error();
          else {
            page += 1;
            view1.addClips(page);
          }
        }
        mass[5] += mass[3][mass[6]];
        mass[0].style.left = `${-mass[5]}px`;
        mass[6] += 1;
        const currentPage = document.getElementsByClassName('page')[0].innerHTML;
        const nextPage = document.getElementsByClassName('page')[0];
        nextPage.innerHTML = Number(currentPage) + 1;
      } else {
        mass[0].style.left = `${-(mass[4] - mass[2])}px`;
      }
    });

    const prev = document.getElementsByClassName('prev')[0];
    prev.addEventListener('click', async () => {
      if (mass[6] > 1) {
        mass[6] -= 1;
        if (((mass[6] - 1) % 3 === 0)) {
          [,,,,,, step3] = mass;
        }
        mass[5] -= mass[3][mass[6]];
        mass[0].style.left = `${-mass[5]}px`;
        const currentPage = document.getElementsByClassName('page')[0].innerHTML;
        const nextPage = document.getElementsByClassName('page')[0];
        nextPage.innerHTML = Number(currentPage) - 1;
      }
    });
  }
}
