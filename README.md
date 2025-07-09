# Liquid Glass UI

**Liquid Glass UI** は、Apple Vision ProやiOSのUIにインスパイアされた、美しいグラスモーフィズム（すりガラス効果）やモダンなエフェクトを簡単に実装するための、自己完結型フロントエンドUIライブラリです。

## ✨ 特徴

- **導入が究極に簡単**: JavaScriptファイル1つを読み込むだけで、CSSもスタイルもすべて機能します。
- **グラスモーフィズム**: リアルタイムの背景ブラーと半透明効果を持つ `.lg-glass` コンポーネント。
- **動的エフェクト**: マウスに追従するパララックス効果や動的ライト。
- **豊富なアニメーション**: 浮遊感、テキストアニメーション、ボーダーアニメーションなど。
- **高機能コンポーネント**: 設定不要で使えるモーダルダイアログと3Dカルーセルを内蔵。
- **アダプティブデザイン**: OSのダークモードに自動追従。背景の明暗を検知して文字色を自動調整。
- **依存関係なし**: 外部ライブラリは一切不要です。

---

## 🚀 導入方法

### CDNを利用する (推奨)

最も簡単な方法は、CDNを利用することです。以下の **scriptタグ一行** をあなたのHTMLファイルの `</body>` タグの直前に追加してください。

```html
<script src="https://cdn.jsdelivr.net/gh/windowtranslator/liquid-glass@v2.0.0/liquid-glass.js"></script>
```

### ファイルをダウンロードする

または、このリポジトリから `liquid-glass.js` ファイルをダウンロードし、あなたのプロジェクトに配置してHTMLから読み込みます。

```html
<script src="path/to/liquid-glass.js"></script>
```

---

## 🎨 機能と使い方 (クラスリファレンス)

### 基本的な使い方

ガラス効果を適用したい要素に `.lg-glass` クラスを追加するだけです。

```html
<div class="lg-glass">
  <h2>Hello, Liquid Glass!</h2>
  <p>This is a basic glass panel.</p>
</div>
```

### エフェクト修飾子

要素に以下のクラスを追加することで、様々なエフェクトを適用できます。

| クラス名 | 効果 |
| :--- | :--- |
| `.lg-glow` | マウスホバー時に要素が発光します。 |
| `.lg-float` | 要素がゆっくりと上下に浮遊します。 |
| `.lg-parallax` | マウスの動きに合わせて要素が3Dに傾きます。 |
| `.lg-animated-border` | ボーダーが虹色にアニメーションします。 |
| `.lg-dynamic-light` | マウスカーソルの位置に光源があるように見せます。 |
| `.lg-depth-1` `2` `3` | 3段階のドロップシャドウで深度を表現します。 |

**使用例:**
```html
<div class="lg-glass lg-glow lg-float lg-parallax">
  <!-- Content -->
</div>
```

### テキストアニメーション

| クラス名 | 効果 |
| :--- | :--- |
| `.lg-text-animate-fadein` | テキストがフェードインします。 |
| `.lg-text-animate-slidein-up` | テキストが下からスライドインします。 |
| `.lg-char-animate` | テキストを一文字ずつアニメーションさせます。 |

---

## 🧩 内蔵コンポーネント

### モーダルダイアログ

以下のHTML構造をコピーし、トリガーとなるボタンに `id="open-modal-btn"` を設定します。

**トリガーボタン:**
```html
<button class="lg-button" id="open-modal-btn">Open Modal</button>
```

**モーダルのHTML (bodyの末尾などに配置):**
```html
<div class="lg-modal-overlay" id="my-modal">
  <div class="lg-glass lg-modal-content">
    <button class="lg-modal-close-btn" aria-label="Close modal">&times;</button>
    <h3>Modal Title</h3>
    <p>Modal content goes here.</p>
  </div>
</div>
```

### 3Dカルーセル

以下のHTML構造をコピーします。JavaScriptが自動的に `id="glass-carousel"` を見つけて初期化します。

```html
<div id="glass-carousel" class="wrapper">
  <div class="carousel">
    <div class="cell lg-glass"><h3>Card 1</h3></div>
    <div class="cell lg-glass"><h3>Card 2</h3></div>
    <!-- ... more cells ... -->
  </div>
</div>
<div class="button-group">
  <button class="lg-button" data-carousel-prev>Previous</button>
  <button class="lg-button" data-carousel-next>Next</button>
</div>
```

### アダプティブ背景

明るい背景を持つセクションに `.lg-light-section` クラスを付与すると、その上にある `.lg-glass` パネルの文字色などが自動的に暗くなります。このクラス自体にスタイルは付与されません（マーカーとして機能します）。

```html
<!-- 暗い背景のエリア -->
<div class="lg-glass">
  <p>白い文字</p>
</div>

<!-- 明るい背景のエリア -->
<div class="lg-light-section" style="background-color: #fff;">
  <div class="lg-glass">
    <p>暗い文字に自動で切り替わります</p>
  </div>
</div>
```

---

## 📄 ライセンス

このプロジェクトは [MITライセンス](LICENSE) の下で公開されています。

## ✍️ 作者

- **(Your Name)**
- GitHub: [@windowtranslator](https://github.com/windowtranslator)