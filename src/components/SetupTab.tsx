import { memo } from 'react';
import { playClickSound } from '../utils/soundUtils'

export const SetupTab = memo(function SetupTab() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold border-b-4 border-[#8b8b8b] pb-2 inline-block">
        🛠️ 環境構築手順 (Forge 1.20.1)
      </h2>
      <div className="bg-[#c6c6c6] text-[#3f3f3f] p-4 border-2 border-black font-bold leading-relaxed shadow-[inset_2px_2px_0px_0px_#ffffff,inset_-2px_-2px_0px_0px_#555555]">
        VRChatter鯖へようこそ！<br />
        ここでは、皆さんがサーバーへ遊びに来れるよう、一つずつ丁寧に導入手順を解説していきます。<br />
        まずは、サーバー専用のModパック（ZIP形式）をダウンロードします！<br />
        下のボタンの遷移先ページから、VRChatter.zipをダウンロードしておきましょう！
      </div>

      <div className="flex justify-center my-4">
        <a href="https://github.com/LimeIvy/vrchatter-minecraft-server-wiki/releases/tag/modpack" target="_blank" rel="noopener noreferrer" className="mc-button py-4 px-8 text-2xl flex items-center justify-center gap-3 w-full md:w-auto hover:text-white" onClick={playClickSound}>
          <span className="text-3xl">📥</span>
          サーバー専用Modパックをダウンロード (ZIP)
        </a>
      </div>

      <div className="flex flex-col gap-8 mt-4">
        {/* Step 1 */}
        <div className="flex flex-col bg-[#8b8b8b] p-4 border-2 border-black shadow-[inset_3px_3px_0px_0px_#c6c6c6,inset_-3px_-3px_0px_0px_#555555]">
          <div className="flex items-center gap-4 mb-4">
            <div className="mc-slot w-16 h-16 shrink-0 text-white mc-text-shadow text-3xl font-bold flex items-center justify-center">
              1
            </div>
            <h3 className="text-2xl font-bold text-white mc-text-shadow">CurseForgeのインストール</h3>
          </div>
          <div className="flex flex-col gap-6 text-white mc-text-shadow leading-relaxed">
            <p>
              Modを簡単に管理するための必須アプリ「<strong>CurseForge（カースフォージ）</strong>」を導入します。<br />
              マイクラを遊ぶためのランチャーのような役割を果たします。
            </p>

            <div className="flex flex-col gap-4 bg-[#747474] p-4 border-2 border-[#555555]">
              <h4 className="font-bold text-xl text-mc-yellow">① インストーラーのダウンロード</h4>
              <p>
                PCのブラウザから
                <a href="https://www.curseforge.com/download/app" target="_blank" rel="noreferrer" className="text-[#55FFFF] underline hover:text-white transition-colors" onClick={playClickSound}>
                  CurseForgeの公式サイト
                </a>
                へアクセスし、画面にある<strong>「Download Standalone」</strong>をクリックしてインストーラーをダウンロードします。
              </p>
              <div className="w-full bg-[#3d424b] p-4 border-2 border-[#1e1e24] shadow-[inset_2px_2px_0px_0px_#6b7381,inset_-2px_-2px_0px_0px_#272a31]">
                <img src="./install-images/curseforge-install.png" alt="CurseForgeダウンロード画面" className="block max-h-96 lg:max-h-[500px] w-auto mx-auto object-contain bg-transparent" />
              </div>
            </div>

            <div className="flex flex-col gap-4 bg-[#747474] p-4 border-2 border-[#555555]">
              <h4 className="font-bold text-xl text-mc-yellow">② インストーラーの起動</h4>
              <p>
                ダウンロードされたインストーラーファイル（<code>CurseForge-Windows-Installer.exe</code>）をダブルクリックして開きます。
              </p>
              <div className="w-full bg-[#3d424b] p-4 border-2 border-[#1e1e24] shadow-[inset_2px_2px_0px_0px_#6b7381,inset_-2px_-2px_0px_0px_#272a31]">
                <img src="./install-images/curseforge-install-2.png" alt="CurseForgeインストーラー起動" className="block max-h-96 lg:max-h-[500px] w-auto mx-auto object-contain bg-transparent" />
              </div>
            </div>

            <div className="flex flex-col gap-4 bg-[#747474] p-4 border-2 border-[#555555]">
              <h4 className="font-bold text-xl text-mc-yellow">③ インストールの進行（言語選択など）</h4>
              <p>
                インストーラーが起動したら、画面の指示に従って言語を選択し、「次へ」を押します。基本的には支持の通り進めておけば大丈夫です。
              </p>
              <div className="w-full bg-[#3d424b] p-4 border-2 border-[#1e1e24] shadow-[inset_2px_2px_0px_0px_#6b7381,inset_-2px_-2px_0px_0px_#272a31]">
                <img src="./install-images/curseforge-installer.png" alt="CurseForge言語選択" className="block max-h-96 lg:max-h-[500px] w-auto mx-auto object-contain bg-transparent" />
              </div>
            </div>

            <div className="flex flex-col gap-4 bg-[#747474] p-4 border-2 border-[#555555]">
              <h4 className="font-bold text-xl text-mc-yellow">④ 自動録画アプリについて</h4>
              <p>
                途中で出てくる自動録画アプリのインストールについてですが、これはインストールしなくて大丈夫です。
              </p>
              <div className="w-full bg-[#3d424b] p-4 border-2 border-[#1e1e24] shadow-[inset_2px_2px_0px_0px_#6b7381,inset_-2px_-2px_0px_0px_#272a31]">
                <img src="./install-images/curseforge-installer-2.png" alt="CurseForgeインストール完了" className="block max-h-96 lg:max-h-[500px] w-auto mx-auto object-contain bg-transparent" />
              </div>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col bg-[#8b8b8b] p-4 border-2 border-black shadow-[inset_3px_3px_0px_0px_#c6c6c6,inset_-3px_-3px_0px_0px_#555555]">
          <div className="flex items-center gap-4 mb-4">
            <div className="mc-slot w-16 h-16 shrink-0 text-white mc-text-shadow text-3xl font-bold flex items-center justify-center">
              2
            </div>
            <h3 className="text-2xl font-bold text-white mc-text-shadow">Javaのインストール（未導入の方）</h3>
          </div>
          <div className="flex flex-col gap-6 text-white mc-text-shadow leading-relaxed">
            <p>
              次のステップで使う「Forge」のプログラムを動かすには、<strong>Java</strong>がPCに入っている必要があります。<br />
              <span className="text-[#55FFFF]">※ すでにバニラ以外のマイクラで遊んだことがあるなど、Java導入済みの方はこの手順をスキップしてください。</span>
            </p>

            <div className="flex flex-col gap-4 bg-[#747474] p-4 border-2 border-[#555555]">
              <h4 className="font-bold text-xl text-mc-yellow">① Java公式サイトへのアクセス</h4>
              <p>
                <a href="https://www.java.com/ja/" target="_blank" rel="noreferrer" className="text-[#55FFFF] underline hover:text-white transition-colors" onClick={playClickSound}>
                  Javaの公式サイト
                </a>
                を開き、中央の<strong>「デスクトップ用のJavaのダウンロード」</strong>をクリックします。
              </p>
              <div className="w-full bg-[#3d424b] p-4 border-2 border-[#1e1e24] shadow-[inset_2px_2px_0px_0px_#6b7381,inset_-2px_-2px_0px_0px_#272a31]">
                <img src="./install-images/java-install.png" alt="Javaダウンロード1" className="block max-h-96 lg:max-h-[500px] w-auto mx-auto object-contain bg-transparent" />
              </div>
            </div>

            <div className="flex flex-col gap-4 bg-[#747474] p-4 border-2 border-[#555555]">
              <h4 className="font-bold text-xl text-mc-yellow">② Javaのダウンロード</h4>
              <p>
                もう一度、<strong>「デスクトップ用のJavaのダウンロード」</strong>ボタンをクリックして、JavaのインストーラーをPCに保存します。
              </p>
              <div className="w-full bg-[#3d424b] p-4 border-2 border-[#1e1e24] shadow-[inset_2px_2px_0px_0px_#6b7381,inset_-2px_-2px_0px_0px_#272a31]">
                <img src="./install-images/java-install-2.png" alt="Javaダウンロード2" className="block max-h-96 lg:max-h-[500px] w-auto mx-auto object-contain bg-transparent" />
              </div>
            </div>

            <div className="flex flex-col gap-4 bg-[#747474] p-4 border-2 border-[#555555]">
              <h4 className="font-bold text-xl text-mc-yellow">③ インストーラーの起動</h4>
              <p>
                ダウンロードしたファイル（<code>jre-...-windows-x64.exe</code>）をダブルクリックして起動し、ライセンス条項を確認する画面を開きます。
              </p>
              <div className="w-full bg-[#3d424b] p-4 border-2 border-[#1e1e24] shadow-[inset_2px_2px_0px_0px_#6b7381,inset_-2px_-2px_0px_0px_#272a31]">
                <img src="./install-images/java-installer.png" alt="Javaインストーラー起動" className="block max-h-96 lg:max-h-[500px] w-auto mx-auto object-contain bg-transparent" />
              </div>
            </div>

            <div className="flex flex-col gap-4 bg-[#747474] p-4 border-2 border-[#555555]">
              <h4 className="font-bold text-xl text-mc-yellow">④ インストールの実行</h4>
              <p>
                「インストール」ボタンを押してしばらく待ちます。ゲージが溜まりきって「正常にインストールされました」と表示されれば、Javaの準備はOKです！
              </p>
              <div className="w-full bg-[#3d424b] p-4 border-2 border-[#1e1e24] shadow-[inset_2px_2px_0px_0px_#6b7381,inset_-2px_-2px_0px_0px_#272a31]">
                <img src="./install-images/java-installer-2.png" alt="Javaインストール完了" className="block max-h-96 lg:max-h-[500px] w-auto mx-auto object-contain bg-transparent" />
              </div>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col bg-[#8b8b8b] p-4 border-2 border-black shadow-[inset_3px_3px_0px_0px_#c6c6c6,inset_-3px_-3px_0px_0px_#555555]">
          <div className="flex items-center gap-4 mb-4">
            <div className="mc-slot w-16 h-16 shrink-0 text-white mc-text-shadow text-3xl font-bold flex items-center justify-center">
              3
            </div>
            <h3 className="text-2xl font-bold text-white mc-text-shadow">Forge 1.20.1のインストール</h3>
          </div>
          <div className="flex flex-col gap-6 text-white mc-text-shadow leading-relaxed">
            <p>
              Minecraftを改造（Mod化）するための大元となるシステム、「<strong>Minecraft Forge バージョン1.20.1</strong>」をインストールします。
            </p>

            <div className="flex flex-col gap-4 bg-[#747474] p-4 border-2 border-[#555555]">
              <h4 className="font-bold text-xl text-mc-yellow">① Forgeダウンロードページへ</h4>
              <p>
                <a href="https://files.minecraftforge.net/net/minecraftforge/forge/index_1.20.1.html" target="_blank" rel="noreferrer" className="text-[#55FFFF] underline hover:text-white transition-colors" onClick={playClickSound}>
                  Forge 1.20.1 公式ダウンロードページ
                </a>
                を開きます。画面右側にある<strong>「Download Recommended（推奨版）」</strong>のInstallerをクリックしてください。
              </p>
              <div className="w-full bg-[#3d424b] p-4 border-2 border-[#1e1e24] shadow-[inset_2px_2px_0px_0px_#6b7381,inset_-2px_-2px_0px_0px_#272a31]">
                <img src="./install-images/forge-install.png" alt="Forgeプレページ" className="block max-h-96 lg:max-h-[500px] w-auto mx-auto object-contain bg-transparent" />
              </div>
            </div>

            <div className="flex flex-col gap-4 bg-[#747474] p-4 border-2 border-[#555555]">
              <h4 className="font-bold text-xl text-mc-yellow">② Installerのダウンロード</h4>
              <p>
                「Download Recommended」の枠内にある<strong>「Installer」</strong>というボタンをクリックします。<br />
                <span className="text-[#FF5555]">※ 次の画面で広告ページが出ることがあります。その場合は何もクリックせず5秒待ち、右上に「SKIP」が出たらそこを押してダウンロードしてください！</span>
              </p>
              <div className="w-full bg-[#3d424b] p-4 border-2 border-[#1e1e24] shadow-[inset_2px_2px_0px_0px_#6b7381,inset_-2px_-2px_0px_0px_#272a31]">
                <img src="./install-images/forge-install-2.png" alt="Forgeダウンロードボタン" className="block max-h-96 lg:max-h-[500px] w-auto mx-auto object-contain bg-transparent" />
              </div>
            </div>

            <div className="flex flex-col gap-4 bg-[#747474] p-4 border-2 border-[#555555]">
              <h4 className="font-bold text-xl text-mc-yellow">③ Forgeインストーラーの起動</h4>
              <p>
                ダウンロードした <code>.jar</code> ファイル（アイコンにコーヒーカップのマークが付いていることが多いです）をダブルクリックで開きます。
              </p>
              <div className="w-full bg-[#3d424b] p-4 border-2 border-[#1e1e24] shadow-[inset_2px_2px_0px_0px_#6b7381,inset_-2px_-2px_0px_0px_#272a31]">
                <img src="./install-images/forge-installer.png" alt="Forgeインストーラー起動" className="block max-h-96 lg:max-h-[500px] w-auto mx-auto object-contain bg-transparent" />
              </div>
              <p className="mt-2 p-3 bg-[#4c1e1e] border-l-4 border-[#ff5555]">
                <span className="text-[#FF5555] font-bold">※もし.jarファイルが開けない場合は</span><br />
                <a href="https://www.youtube.com/watch?v=IYcVlQ3q1pc" target="_blank" rel="noreferrer" className="text-[#55FFFF] underline hover:text-white transition-colors" onClick={playClickSound}>
                  こちらの解説動画（YouTube）
                </a>
                を参考に、「jarfix」というツールを導入してから再度開いてみてください。
              </p>
            </div>

            <div className="flex flex-col gap-4 bg-[#747474] p-4 border-2 border-[#555555]">
              <h4 className="font-bold text-xl text-mc-yellow">④ インストール完了</h4>
              <p>
                メニューが表示されたら、<strong>「Install client」</strong>にチェックが入っていることを確認します。
                そのまま「OK」を押すとインストールが始まります。<br />しばらく待って「Successfully installed client profile Forge...」というような画面が出たら、無事Forgeの導入は完了です！
              </p>
              <div className="w-full bg-[#3d424b] p-4 border-2 border-[#1e1e24] shadow-[inset_2px_2px_0px_0px_#6b7381,inset_-2px_-2px_0px_0px_#272a31]">
                <img src="./install-images/forge-installer-2.png" alt="Forgeインストール完了" className="block max-h-96 lg:max-h-[500px] w-auto mx-auto object-contain bg-transparent" />
              </div>
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="flex flex-col bg-[#8b8b8b] p-4 border-2 border-black shadow-[inset_3px_3px_0px_0px_#c6c6c6,inset_-3px_-3px_0px_0px_#555555]">
          <div className="flex items-center gap-4 mb-4">
            <div className="mc-slot w-16 h-16 shrink-0 text-white mc-text-shadow text-3xl font-bold flex items-center justify-center">
              4
            </div>
            <h3 className="text-2xl font-bold text-white mc-text-shadow">ZIPファイルのインポートと起動</h3>
          </div>
          <div className="flex flex-col gap-6 text-white mc-text-shadow leading-relaxed">
            <p>
              いよいよ最後です！最初にダウンロードしておいた「サーバー専用Modパック (ZIPファイル)」を使って、一瞬でサーバー専用の環境を作りましょう！
            </p>

            <div className="flex flex-col gap-4 bg-[#747474] p-4 border-2 border-[#555555]">
              <h4 className="font-bold text-xl text-mc-yellow">① CurseForgeアプリの起動・インポート</h4>
              <p>
                Step1で入れたCurseForgeアプリを開き、上部の「Create Custom Profile」のすぐ隣にある<strong>「Import（インポート）」</strong>という小さなボタンをクリックします。
              </p>
              <div className="w-full bg-[#3d424b] p-4 border-2 border-[#1e1e24] shadow-[inset_2px_2px_0px_0px_#6b7381,inset_-2px_-2px_0px_0px_#272a31]">
                <img src="./install-images/curseforge-import.png" alt="インポートボタン" className="block max-h-96 lg:max-h-[500px] w-auto mx-auto object-contain bg-transparent" />
              </div>
            </div>

            <div className="flex flex-col gap-4 bg-[#747474] p-4 border-2 border-[#555555]">
              <h4 className="font-bold text-xl text-mc-yellow">② Modパックを選んで起動！</h4>
              <p>
                自分のPCのダウンロードフォルダなどから、このページの上で保存した<strong>「サーバー専用ModパックのZIPファイル」</strong>を選んで開きます。<br />
                自動でプロファイル（VRChatter鯖用環境）が作られるので、できあがったらオレンジ色の<strong>「Play」</strong>ボタンを押してマイクラを起動しましょう。マルチプレイからサーバーに追加して大冒険のはじまりです！
              </p>
              <div className="w-full bg-[#3d424b] p-4 border-2 border-[#1e1e24] shadow-[inset_2px_2px_0px_0px_#6b7381,inset_-2px_-2px_0px_0px_#272a31]">
                <img src="./install-images/curseforge-import-2.png" alt="起動ボタン" className="block max-h-96 lg:max-h-[500px] w-auto mx-auto object-contain bg-transparent" />
              </div>
            </div>
          </div>
        </div>

        {/* Step 5 */}
        <div className="flex flex-col bg-[#8b8b8b] p-4 border-2 border-black shadow-[inset_3px_3px_0px_0px_#c6c6c6,inset_-3px_-3px_0px_0px_#555555]">
          <div className="flex items-center gap-4 mb-4">
            <div className="mc-slot w-16 h-16 shrink-0 text-white mc-text-shadow text-3xl font-bold flex items-center justify-center">
              5
            </div>
            <h3 className="text-2xl font-bold text-white mc-text-shadow">VRChatterサーバーへの参加</h3>
          </div>
          <div className="flex flex-col gap-6 text-white mc-text-shadow leading-relaxed">
            <p>
              マイクラが無事に起動したら、いよいよVRChatterサーバーへ接続します！
            </p>

            <div className="flex flex-col gap-4 bg-[#747474] p-4 border-2 border-[#555555]">
              <h4 className="font-bold text-xl text-mc-yellow">① マルチプレイを選択</h4>
              <p>
                Minecraftのタイトル画面が開いたら、<strong>「マルチプレイ（Multiplayer）」</strong>をクリックします。<br />
                <span className="text-[#FF5555] text-sm">※ 初回起動時は「オンラインプレイの注意」が出る場合があります。「今後この画面を表示しない」にチェックを入れて進めてください。</span>
              </p>
              <div className="w-full bg-[#3d424b] p-4 border-2 border-[#1e1e24] shadow-[inset_2px_2px_0px_0px_#6b7381,inset_-2px_-2px_0px_0px_#272a31]">
                <img src="./install-images/server-join.png" alt="マルチプレイ選択" className="block max-h-96 lg:max-h-[500px] w-auto mx-auto object-contain bg-transparent" />
              </div>
            </div>

            <div className="flex flex-col gap-4 bg-[#747474] p-4 border-2 border-[#555555]">
              <h4 className="font-bold text-xl text-mc-yellow">② サーバーを追加</h4>
              <p>
                下にある<strong>「ダイレクト接続」または「サーバーを追加」</strong>ボタンを押してください。<br />
                <span className="text-[#55FFFF] text-sm"></span>
              </p>
              <div className="w-full bg-[#3d424b] p-4 border-2 border-[#1e1e24] shadow-[inset_2px_2px_0px_0px_#6b7381,inset_-2px_-2px_0px_0px_#272a31]">
                <img src="./install-images/server-join-2.png" alt="サーバーを追加" className="block max-h-96 lg:max-h-[500px] w-auto mx-auto object-contain bg-transparent" />
              </div>
            </div>

            <div className="flex flex-col gap-4 bg-[#747474] p-4 border-2 border-[#555555]">
              <h4 className="font-bold text-xl text-mc-yellow">③ サーバーに接続！</h4>
              <p>
                サーバーアドレスの欄に、<strong>220.158.22.4</strong>を入力して<strong>「サーバーに接続」</strong>を押せば、いよいよVRChatterサーバーの世界に入れます！お疲れ様でした！
              </p>
              <div className="w-full bg-[#3d424b] p-4 border-2 border-[#1e1e24] shadow-[inset_2px_2px_0px_0px_#6b7381,inset_-2px_-2px_0px_0px_#272a31]">
                <img src="./install-images/server-join-3.png" alt="サーバーに接続" className="block max-h-96 lg:max-h-[500px] w-auto mx-auto object-contain bg-transparent" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
});
