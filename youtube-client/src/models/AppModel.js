export default class AppModel {
  constructor(state) {
    this.state = state;
  }

  static extractClipNames(data) {
    return data.items.map((clip) => {
      const b = [];
      b.push(clip.snippet.title);
      b.push(clip.snippet.channelTitle);
      b.push(clip.snippet.publishedAt);
      b.push(clip.snippet.description);
      b.push(clip.snippet.thumbnails.medium.url); // 320*180
      b.push(clip.id.videoId);
      return b;
    });
  }

  static extractClipDate(data) {
    return data.items.map(clip => clip.snippet.publishedAt);
  }

  static getId(data) {
    return data.items.map(clip => clip.id.videoId);
  }

  static getView(data1) {
    return data1.items.map((clip) => {
      const b = [];
      b.push(clip.statistics.viewCount);
      return b;
    });
  }

  static getToken(data) {
    return data.nextPageToken;
  }

  async getClipNames() {
    const inf = [];
    const url = this.state.url + this.state.key + this.state.type
    + this.state.part + this.state.maxRes + this.state.query + this.state.myQuery;

    const responcy = await fetch(url);
    const data = await responcy.json();
    const cards = AppModel.extractClipNames(data);
    const tok = AppModel.getToken(data);

    const queryPart1 = 'https://www.googleapis.com/youtube/v3/videos?key=AIzaSyDJwUoIs67Y4o8zmJDnuJ8q-EdX18dwwgo&id=';
    const queryPart2 = AppModel.getId(data).join(',');
    const queryPart3 = '&part=snippet,statistics';

    const query1 = queryPart1 + queryPart2 + queryPart3;
    const responcy1 = await fetch(query1);
    const data1 = await responcy1.json();

    const views = AppModel.getView(data1);

    for (let i = 0; i < cards.length; i += 1) {
      cards[i][6] = views[i];
    }

    inf.push(cards, views, tok);
    return inf;
  }

  async getnextClips(tok) {
    const inf = [];

    this.state.nextPageToken = tok;
    const url = this.state.url + this.state.key + this.state.type
    + this.state.part + this.state.maxRes + this.state.query + this.state.myQuery
    + this.state.pageToken + this.state.nextPageToken;
    const responcy = await fetch(url);
    const data = await responcy.json();
    // eslint-disable-next-line no-param-reassign
    tok = AppModel.getToken(data);

    const cards = AppModel.extractClipNames(data);

    const queryPart1 = 'https://www.googleapis.com/youtube/v3/videos?key=AIzaSyDJwUoIs67Y4o8zmJDnuJ8q-EdX18dwwgo&id=';
    const queryPart2 = AppModel.getId(data).join(',');
    const queryPart3 = '&part=snippet,statistics';

    const query1 = queryPart1 + queryPart2 + queryPart3;
    const responcy1 = await fetch(query1);
    const data1 = await responcy1.json();

    const views = AppModel.getView(data1);

    for (let i = 0; i < cards.length; i += 1) {
      cards[i][6] = views[i];
    }

    inf.push(cards, views, tok);
    return inf;
  }
}
