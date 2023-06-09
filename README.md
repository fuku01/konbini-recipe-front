# はじめに
リポジトリをご覧いただきありがとうございます。

こちらはフロントエンドのリポジトリです。
バックエンドは[こちら](https://github.com/fuku01/konbini-recipe-api)

[「ふく（fuku01）」](https://twitter.com/fuku_pg) と申します。
簡単にポートフォリオの紹介をさせていただきます。


## 1. ポートフォリオ紹介
### （１） 概要
[<img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3192049/83ed5024-d1e0-d952-10d9-5007ae26dd3a.png" width=200>](https://konbini-recipe.link/home)

**「コンビニレシピ」URL :(https://konbini-recipe.link/home)**
- 普段料理をせず<font color="DarkOrange">コンビニご飯が多い方</font>を対象とした、簡単なコンビニ食材のアレンジ方法を共有するサービスです。
- <font color="DarkOrange">バーコードスキャン機能</font>を使えば、商品のバーコードを読み取るだけで、関連レシピを手間なく簡単に探すことができます。
- 料理が苦手でも、手軽に入手できるコンビニ食材を工夫することで、日々の食事をより美味しく楽しくすることを目指します！

(※ より気軽にカメラを使ったバーコードスキャン機能を使用したいため、基本的には<ins>iPhoneなどのスマートフォンでの使用を想定</ins>しています。)
___
### （２） 使用イメージ
- **「バーコードスキャンによるレシピ検索」**
カメラでバーコードをスキャンすると、その商品を使ったレシピ(同じバーコードが登録されたレシピ)を簡単に探すことができます。

- **「レシピ詳細ページ」**
調理時間・金額・カロリーなどの必要な情報が見やすくシンプルなデザインを追求しました。
また、数値によって各項目の色が変わるようにしたことで、レシピの情報が直感的に判断できるようにしました。
　
 
<img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3192049/420b3692-ef59-76f8-262a-a89a6f67aa3c.gif" width=350>　<img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3192049/0e0c40d9-b495-dc6b-0753-695752404991.jpeg" width=350>
___
### （３） サービス開発の背景
- 私は日々の仕事帰りや夜遅くに帰ると、疲れた状態で料理をする気になれず、つい「コンビニ」で買い物をすることが多くなっていました。しかし、普通のレシピサイトを見ても、難しい料理ばかりで使いこなせなかったり、コンビニ食材の組み合わせには限りがあるためレシピを探すことも難しく、自分には敷居が高いと感じていました。
- そこで、コンビニ食材を使った簡単なアレンジ方法を手間なく共有するサービスがあれば、料理のハードルが下がり、普段料理をしない人たちでも手軽に食事を美味しく楽しむことができるのではないかと考えました。
- また、疲れた時や忙しい日常でも、手持ち商品のバーコードをスキャンするだけで、レシピを探すことができれば、手間が減り日常的に使用しやすいのではないかと考え、バーコードスキャン機能を導入したコンビニ食材に特化したレシピ共有サービス「コンビニレシピ」を開発することを思い立ちました。
___
### （４） 使用技術

1. **フロントエンド**
    - Node.js_[ver.18.15.0]
    - yarn_[ver.1.22.19]
    - Next.js_[ver.13.3.0]
    - React_[ver.18.2.0]
    - TypeScript_[ver.5.0.3]
    - TailwindCSS_[ver.3.3.1]
    - ESLint/Prettier（コード整形）
    - axios_[ver.1.3.5]
    　
     
2. **バックエンド**
    - Ruby_[ver.3.2.2]
    - Ruby on Rails_[ver.7.0.4.3]
    - Rubocop（コード整形）
    　
     
3. **コンテナ**
    - Docker
    - Docker Compose
    　
     
4. **インフラ**
    - AWS（Amplify、S3、ECR、ECS　Fargate、RDS(MySQL)、ALB、Route53）
    - Github Actions（CI/CD）   


5. **セキュリティ**
    - Firebase Authentication（ユーザー認証）

___
### (5) 主な実装機能

- **レシピ検索**
    - 複数キーワード検索
    - タグ検索
    - バーコードスキャンによる検索
    - 人気順・新着順の並べ替え
    　
     
- **レシピ投稿**
    - 画像登録
    - タグ登録
    - バーコードスキャンによるバーコードタグ登録
    　
     
- **レシピ情報**
    - 調理時間・金額・カロリーの数値によって色分け
    - タグクリックによるタグ検索
    - 作成者と作成（更新）時間の表示
    　
     
- **マイレシピ**　
    - 自分が作成したレシピを一覧表示。
    - 自分が作成したレシピは、内容の編集と削除が可能。
    　
     
- **お気に入り登録**
    - 1レシピに対し、1ユーザーは1つまで登録可能。
    - お気に入り総数をレシピに表示。 
    　
     
- **人気ランキング**
    - お気に入り総数の上位20件を表示し、順位をナンバリング。
    - 上位3件についてはメダルを表示。
    　
     
- 　**新着レシピ**
    - 作成日の新しい20件を表示。
    　
     
- 　**ユーザー認証（FireBase）**
    - メールアドレスとパスワードはデータベースではなくFireBase上に保存しセキュリティを強固にする。
    - メール認証（新規登録・ログイン）
    - ゲストログイン機能
___
### (6) 構成図など
#### 1. インフラ構成図
![konbini-recipe-AWS.jpg](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3192049/db1cdca4-1649-32c2-0c2e-8e0ac3f0ac36.jpeg)
#### 2. ER図
![konbini-recipe-ER.jpg](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3192049/23046f08-f0d5-9beb-1ad4-bae24355fbdb.jpeg)
#### 3.当初のデザイン案（figma）
![konbini-recipe-figma.jpg](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3192049/a988c2a2-bd2e-2f1b-1684-172f9106b839.jpeg)
___
### (7) 特にこだわった点
- 日常的にストレス無く使用できるように、可能な限りシンプルで必要な情報（調理時間・金額・カロリーなど）が分かりやすく直感的に触れるUI/UXを設計当初から追及した。
- レシピを探す手間をどのように減らせるかを考え、バーコードスキャン機能やレシピのタグをクリックして関連レシピを検索できる機能などを実装した。
___

## 2. 技術の選定
技術選定で意識したことと、主な技術の選定理由は以下の通りです。
### （１） 意識したこと

- **モダンな技術を採用する。**
    - web業界では常に新しい技術が登場し、その都度キャッチアップしていく必要がある。
    そのため、モダンな技術を学ぶことは最新の技術に追いつく能力を身に付けることに繋がると考えた。
    - モダンな技術は今後ますます実際の開発現場で採用される可能性が高まる。
    そのため、より実践に近い技術を学ぶことで、早期に現場の戦力として活躍するチャンスを得たいと考えた。
    　
     
- **情報が多く学びやすい技術を採用する。**
    - プログラミング未経験の初学者にとってエラーなどの問題に直面することは多い。
    そのため、インターネット等での情報が充実している技術を使うことで、自分自身で調べて解決策を見つけることが比較的容易となり、開発のハードルを下げて生産性を向上させることができると考えた。
    - また、多くの開発者が使用している技術であれば周辺のツール(ライブラリ)なども充実しており、開発効率の向上が期待できると考えた。
___
### （２） 主な技術の選定理由
1. **フロントエンド**


    - **React / Next.js**
        - 使用用途 ： フロントエンドのライブラリおよびフレームワークとして使用。SPAで運用
        - 比較対象 ： vue.js / Nuxt.js
        - 採用理由 ： 
            - Reactはコンポーネントベースの開発が可能で再利用性が高い。
            - また、コンポーネントの親子関係が明確で、vue.jsと比較しても大規模なアプリケーションでも管理がしやすい。実際の現場では大規模な開発が行われることを想定し、より実践に近い技術を使用したいと考えた。
            - Next.jsはファイルベースルーティングが可能で効率的に開発可能な他、SSRでの運用等も可能となる。
         （今回は大規模開発ではなく、ユーザーにストレスフリーでスムーズな操作性を目的としたため、差分レンダリングであるSPAで運用している。）
           
           
    - **Typescript**
        - 使用用途 ： フロントエンドの開発言語
        - 比較対象 ： JavaScript
        - 採用理由 ：
            - 既存のJavaScriptコードをそのまま利用することができる上で、静的型付けが可能。
            - 変数や関数の型を事前に指定することで、バグの早期発見やコードの可読性や安全性が向上する。
            　
             
    - 　**TailwindCSS**
        - 　使用用途 ： CSSフレームワークとして使用
        - 　比較対象 ： Bootstrap、Material-UI
        - 　採用理由 ： 
            - 　事前に定義された多くのクラスを使用することで、開発効率が向上する。
            - 　カスタマイズ性と柔軟性が高いため、あらゆるデザインに対応できる。
            　　
___               
2. **バックエンド**


    - **Ruby / Ruby on Rails**
    　
     　
        - 使用用途 ： バックエンドの開発言語とフレームワークとして使用。（APIモードで運用）
        - 比較対象 ： GO、Python/Django、PHP/Laravel、
        - 採用理由 ： 
            - MVCモデルに基づいており、データベースの操作も容易で、効率的に開発が可能。
            - インターネット教材が豊富なことから情報も習得しやすい。
            　
___              
3. **コンテナ**


    - **Docker / Docker Compose**
    　
     　
        - 使用用途 ： バックエンドの開発環境および本番環境の構築
        - 比較対象 ： VirtualBox
        - 採用理由 ： 
            - Dockerは他の端末でも同じ開発環境を容易に再現することが可能。
            - VirtualBoxと比較して、コンテナ化技術によりOS等の環境差異による問題や手間を減らすことが可能。また、より軽量で素早く起動することができる。
            （実際の現場では、開発チーム全員で同じ環境を構築することが必要であることを想定した。）
            - Docker ComposeはバックエンドのRailsと開発環境でのデータベース（MySQL）など、複数コンテナの一括管理が可能。
            　
___      
4. **インフラ**

※ 以下の理由から、主にAWS（Amazon Web Services）サービスを採用した。

・GCPと比較してインターネット上で実装に関する情報が豊富。

・RenderやHerokuでは読み込み速度が遅い。

・AWSは幅広いサービスを提供しており、他のサービスとの親和性が高く、一元的な管理が可能。

　
- **AWS Amplify**
    - 使用用途 ： フロントエンドのサーバーおよびCI/CDパイプライン
    - 比較対象 ： EC2、ECS Fargate
    - 採用理由 ： 
        - ECS Fargateと比較して、フロントエンドのプッシュからデプロイまでを自動化できる。
        - また、プレビュー機能を使うことで、GitHub上のプルリクエストでマージする前にプレビュー確認が可能。
        - EC2と比較して、サーバーに必要なリソース(処理能力やメモリなど)をAWSが自動的に調整してくれるため、手動でのサーバー管理の必要が無い。
        　
         
- **ECS Fargate**
    - 使用用途 ： バックエンドのサーバー（バックエンドのコンテナ(Docker)をデプロイ・管理）
    - 比較対象 ： EC2
    - 採用理由 ： 
        - ECR上に保持したコンテナ(Docker)をそのままデプロイ可能。
        - EC2と比較して、サーバーに必要なリソース(処理能力やメモリなど)をAWSが自動的に調整してくれるため、手動でのサーバー管理の必要が無い。
        　
         
- **Github Actions**
    - 使用用途 ： バックエンドのCI/CDパイプライン
    - 比較対象 ： CircleCI
    - 採用理由 ： 
        - バックエンドのプッシュからデプロイまでを自動化できる。
        - Github Actionsのみ制限無しで無料利用が可能。（パブリックレポジトリの場合）
        - また、GitHubリポジトリと直接統合されていて、管理しやすい。
        　





