# 概要

LibraPlusでウェブアクセシビリティ検査をする場合に、検査効率や操作性をより向上させるためのツールです。次のような機能があります。

## 【前頁】
前のPIDページへ戻ります。LibraPlusのUIにも同機能があります。画面下にスクロールしてしまっている状況の時に使用すると良いでしょう。

## 【次頁】
次のPIDページへ進みます。LibraPlusのUIにも同機能があります。画面下にスクロールしてしまっている状況の時に使用すると良いでしょう。

## 【単copy】
検査結果登録画面（ページV、ソースコードV、検査箇所一覧Vなどで検知アイコンや検査ボタンをクリックして出てくる画面）のカーソルのある検査項目の検査結果をコピーします。検査結果はひな形にエンコードされます。同じ判定を連続するページで入れていくとき使用するとよいでしょう。

## 【単paste】
検査結果登録画面（ページV、ソースコードV、検査箇所一覧Vなどで検知アイコンや検査ボタンをクリックして出てくる画面）のカーソルのある検査項目に、ひな形にエンコードされた検査結果を貼り付け（反映）します。同じ判定を連続するページで入れていくとき使用するとよいでしょう。

## 【複数copy】
検査結果登録画面（ページV、ソースコードV、検査箇所一覧Vなどで検知アイコンや検査ボタンをクリックして出てくる画面）の全ての検査項目の検査結果をコピーします。検査結果はひな形にエンコードされます。

## 【複数paste】
検査結果登録画面（ページV、ソースコードV、検査箇所一覧Vなどで検知アイコンや検査ボタンをクリックして出てくる画面）の全ての検査項目に、ひな形にエンコードされた検査結果を貼り付け（反映）します。

## 【w3c整形】
バリデート検証の判定をするときの補助機能です。Nu Html Checker、あるいはW3C HTML Markup Varidationの結果出力ページで使用します。Warningを無視し、Error行だけ抽出し、モーダル画面に表示してくれます。

## 【sv画面拡張】
検査結果登録画面（ページV、ソースコードV、検査箇所一覧Vなどで検知アイコンや検査ボタンをクリックして出てくる画面）に「表示(登録済検査結果)」ボタンを追加し、「コメント欄」「対象ソースコード欄」「修正ソースコード欄」に、以下の機能ボタンを追加します。（よく行われる修正については、今後もボタンを追加開発する予定です。）

### [共通]
* クリア・・・マウスのワンクリックで空欄化します。
* 改行・・・マウスのワンクリックで改行を入れます。
### [コメント欄で･･･]
* 再検OK・・・現在の日付と「修正を確認」のコメントを追記し、判定を「はい」にします。
* 差替適合・・・現在の日付と「適合に差替」のコメントを追記し、判定を「はい」にします。
* 差替注記・・・現在の日付と「適合(注記)に差替」のコメントを追記し、判定を「はい(注記)」にします。
### [修正ソースコード欄で･･･]
* 空alt化・・・修正ソースコード欄のコードのalt属性値を自動で「alt=""」にします。
* 非リンク化・・・修正ソースコード欄のコードのalt属性値を自動で「alt=""」にします。

## 【js実行】
現在表示しているページ上で自分で書いたJavascriptを実行する機能です。一時的なブックマークレットや自作ブックマークレットを実行するときに使用します。

## 【はいAT】
単独検査入力画面（ページV、ソースコードV、検査箇所一覧Vなどで検知アイコンや検査ボタンをクリックして出てくる画面）の全項目を「はい」に設定します。強制的に動作します。コメントと修正ソースコードは空欄化します。一部分だけでなく全項目対象になるので、気を付けて使ってください。

## 【なしAT】
単独検査入力画面（ページV、ソースコードV、検査箇所一覧Vなどで検知アイコンや検査ボタンをクリックして出てくる画面）の全項目を「なし」に設定します。強制的に動作します。一部分だけでなく全項目対象になるので、気を付けて使ってください。

## 【tab複製】
現在のタブページを複製する機能です。3ブラウザ自体にも同機能がありますが、こちらはタブなし表示のブラウザウィンドウのタブ複製もできます。

## 【頁参照】
現在のPIDページを新しいタブで開きます。LibraPlusの地球儀ボタンと同じ機能です。画面下にスクロールしてしまっている状況の時に使用すると良いでしょう。

## 【rep表示拡張】
LibraPlusの進捗管理ウィンドウで、PID行、カテゴリ列をクリックして色付けができます。また、進捗管理(詳細)画面を別ウィンドウで開くボタンを追加します。

## 【画面幅】
### [検査箇所一覧Vで･･･]
* クリックする度にページビューの幅を狭くし、SP画面が設定されたページのSP画面の状態にできます。
* 極限まで狭くすると元の幅に戻ります。
* SP画面にしか出てこない検査箇所をページビューでクリックしたい時に使うと良いでしょう。

### [進捗管理(詳細)画面で･･･]
* クリックする度にウィンドウ幅を広くします。極限まで広くすると、元のサイズに戻ります。

### [検査結果表示画面、進捗管理(詳細)画面で･･･]
* 判定コメント、対象ソースコード、修正ソースコードの列幅を見やすく広げます。
* うまく広がらないこともありますが、そこはご容赦ください。

## 【sv色付】
### [検査箇所一覧Vで･･･]
* 検査箇所一覧テーブルの「検査項目数」列、「適合数」列、「不適合数」列、「非適用数」列のセルを色分け表示（検査項目数＝橙色、適合数＝水色、不適合数＝ピンク色）します。
* 不適合数が1以上のセルは濃いピンク色で強調表示します。
* 検査結果の確認に使うと良いでしょう。

### [検査結果表示画面、進捗管理(詳細)画面で･･･]
* 検査結果テーブルの検査箇所行の判定セルを色分け表示（はい＝水色、いいえ＝ピンク色、はい(注記)＝緑色、なし＝灰色）します。
* 検査結果の確認や過去の判定を振り返り、メモを取ったりするときに使うと良いでしょう。
