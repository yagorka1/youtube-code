import AppView from './AppView';

describe('AppView.prototype.show', () => {
  it('Should be an instance of Function', () => {
    expect(AppView.prototype.show).toBeInstanceOf(Function);
  });

  it('Should be show correctly', () => {
    const context = {
      titles: [
        'Video about JS',
        'Another video ...',
        'I need more video',
      ],
    };

    AppView.prototype.show.call(context);
    expect(document.body.innerHTML).toMatchSnapshot();
  });
});
