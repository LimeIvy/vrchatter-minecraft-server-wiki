---
description: ニュース記事やTips記事を新規作成し、インデックスに登録する
---

ユーザーから新しい記事の作成依頼（`/create_article` や 「〇〇に関するTips記事を書いて」等）があった場合、このワークフローに従って処理を行ってください。

## 1. 記事情報の整理と確認

ユーザーの指示から以下の情報を抽出、または足りない場合は生成・質問して決定します。

- **Type**: `news` または `tips`
- **Date**: 今日の日付（`YYYY-MM-DD` 形式。例: `2026-03-05`）
- **FileName**: ファイル名に使うスラッグ（英数字ハイフンのみ。例: `how-to-start-industry`）
  -> 最終的なIDは `[Date（ハイフンなし）]-[FileName]` になります（例: `20260305-how-to-start-industry`）。
- **Title**: 記事の日本語タイトル
- **Description**: 記事の短い説明（一覧に表示されます）
- **Category** (Tipsのみ): `industry`, `combat`, `explore`, `other` のいずれか。

## 2. インデックス JSON の更新

対象のディレクトリ（`public/news` または `public/tips`）にある `index.json` を読み込みます。
JSONの配列の**先頭**に新しい記事のメタデータを追加して保存します。

**news の場合の書き込み例:**

```json
{
  "id": "20260305-event-info",
  "title": "週末イベントのお知らせ",
  "date": "2026-03-05",
  "description": "新しいイベントについてのお知らせです。"
}
```

**tips の場合の書き込み例:**

```json
{
  "id": "20260305-how-to-start-industry",
  "title": "工業(Create)の進め方",
  "date": "2026-03-05",
  "category": "industry",
  "description": "Create Modを使った自動化の始め方について解説します。"
}
```

## 3. Markdown ファイルの作成

対象のディレクトリ（`public/news` または `public/tips`）に、`[Date（ハイフンなし）]-[FileName].md` を作成します。

記事の内容はユーザーの要望に合わせて記述しますが、基本構造は既存の記事（例: `c:\Minecraft\vrchatter-server-wiki\public\news\20260228-server-open.md`）のフォーマットを踏襲してください。

**Markdown構成のルール:**

- 一番上の行は必ず `# [タイトル]`（例: `# 工業(Create)の進め方`）から始める
- 見出し2（`##`）で各セクションを分ける
- 内容に応じて、箇条書き、太字、コードブロックなどを適宜使う

## 4. 完了報告

作業完了後、作成したファイル名や更新したインデックスの情報をユーザーに報告してください。ローカル環境が起動していれば、画面の更新を促してください。
