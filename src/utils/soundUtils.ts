// 最初に1回だけ読み込んでキャッシュしておく
const clickAudio = new Audio("/click.mp3");
clickAudio.preload = "auto";

export function playClickSound() {
  // 連続クリックしても音が途切れないように、クローンを作って再生する
  const sound = clickAudio.cloneNode() as HTMLAudioElement;
  sound.volume = 0.5; // 音量の調整
  sound.play().catch((e) => {
    // 最初のクリックなど、ブラウザの制限で再生できない場合は無視する
    console.error("Failed to play click sound:", e);
  });
}
