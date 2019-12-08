export default class AppView {
  constructor(titles) {
    this.titles = titles;
  }

  show() {
    const content = document.createElement('div');
    content.className = 'mainn';
    content.innerHTML = '<div class="searchField"><input type="text" class="teaxtarea"><input type="button" class="searchButton" value="search"></div><div class="cards"><div class="line"></div></div><div class="buttons"></div><div class="warningMessage"></div>';
    document.body.appendChild(content);
    window.console.log(this.titles);
    const message = document.getElementsByClassName('warningMessage')[0];
    message.innerHTML = '';
    const btn = document.getElementsByClassName('buttons')[0];
    btn.innerHTML = "<div class='buttons' ><i class='prev'><img class='arrow' src='../../assets/images/back.png'></i><i><p class='page'>1</p></i><i class='next'><img class='arrow next' src='../../assets/images/next.png'></i></div>";
    btn.classList.add('hid');
  }

  showClips() {
    const cards = document.getElementsByClassName('line')[0];
    cards.innerHTML = this.titles.map(title => `<a href="https://www.youtube.com/watch?v=${title[5]}" target="_blank">
    <div class="card">
    <div class="name"><h4>${title[0]}</h4></div><img src="${title[4]}"></img>
    <div class="data"><h5>${title[1]}</h5><br><span class="views">${title[6][0]} views, ${title[2].slice(0, 10)}</span><br>${title[3].slice(0, 100)}...<br>
    <br></div></div></a>`).join('');
    const message = document.getElementsByClassName('warningMessage')[0];
    message.classList.add('hid');
    const btn = document.getElementsByClassName('buttons')[0];
    btn.classList.remove('hid');
  }

  addClips() {
    const cards = document.getElementsByClassName('line')[0];
    const a = document.createElement('div');
    a.innerHTML = this.titles.map(title => `<a href="https://www.youtube.com/watch?v=${title[5]}" target="_blank">
    <div class="card">
    <div class="name"><h4>${title[0]}</h4></div><img src="${title[4]}"></img>
    <div class="data"><h5>${title[1]}</h5><br><span class="views">${title[6][0]} views, ${title[2].slice(0, 10)}</span><br>${title[3].slice(0, 100)}...<br>
    <br></div></div></a>`).join('');
    cards.appendChild(a);
    const message = document.getElementsByClassName('warningMessage')[0];
    message.classList.add('hid');
    const btn = document.getElementsByClassName('buttons')[0];
    btn.classList.remove('hid');
  }

  error() {
    window.console.log(this.titles);
    const cards = document.getElementsByClassName('line')[0];
    cards.innerHTML = '';
    const btn = document.getElementsByClassName('buttons')[0];
    btn.classList.add('hid');
    const message = document.getElementsByClassName('warningMessage')[0];
    message.classList.remove('hid');
    message.innerHTML = '<p class="txtMessage">По запросу ничего не найдено.</p><p class="txtMessage"> Рекомендации:</p> <ul class="items"><li>Убедитесь, что все слова написаны без ошибок.</li><li>Попробуйте использовать другие ключевые слова.</li><li> Попробуйте использовать более популярные ключевые слова.</li><li>Попробуйте уменьшить количество слов в запросе.</li>';
  }
}
