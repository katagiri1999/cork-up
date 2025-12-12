# Cork-Up

## CICD Status
[![Chalice CICD](https://github.com/katagiri1999/cork-up/actions/workflows/cicd_chalice.yaml/badge.svg)](https://github.com/katagiri1999/cork-up/actions/workflows/cicd_chalice.yaml)  
[![React CICD](https://github.com/katagiri1999/cork-up/actions/workflows/cicd_react.yaml/badge.svg)](https://github.com/katagiri1999/cork-up/actions/workflows/cicd_react.yaml)

## Sample Application URL
https://www.cork-up.net

## 概要
Cork-Up用のPublicリポジトリです。ドキュメント管理ツールを開発しています。  
Serverless Architectureを使用した、シンプルなフロントエンド/バックエンド構成となります。
Serverlessを採用することで、非常に安価に構築/運用しています。  
OSSアプリケーションとして公開しておりますので、気軽にご利用ください。

## 技術要素
本アプリケーションでは以下のフレームワーク/技術要素を使用しています。

| 技術要素/Framework | 言語    | 用途     |
| -                  | -       | -        |
| Chalice            | Python  | Backend  |
| React              | Node.js | Frontend |
| GithubActions      | shell   | CICD     |

<br>

本アプリケーションでは以下のサービスを使用しています。以下サービスを用意し、任意の環境にデプロイされることを想定しています。  

| サービス          | 用途                       |
| -                | -                          | 
| AWS S3           | Frontend Resource 格納/配信 |
| AWS CloudFront   | Frontend Resource 配信      |
| AWS Lambda       | Backend API 実行環境         |
| AWS ApiGateway   | Backend API 配信             |
| AWS DynamoDB     | DB                         |
| お名前.com        | DNS                        |

<br>

構成図
![drowio](cork-up.drawio.svg)

## テーブル設計

### users table
| key              | type  | desctiption                 | option |
| -                | -     | -                           | -      |
| email            | str   | email                       | Partition Key |
| options          | object | options                    |        |

### trees table
| key              | type   | desctiption                 | option |
| -                | -      | -                           | -      |
| email            | str    | email                       | Partition Key |
| tree             | object | tree content                |        |

### nodes table
| key              | type   | desctiption                 | option |
| -                | -      | -                           | -      |
| email            | str    | email                       | Partition Key |
| id               | str    | node is                     | Sort Key      |
| text             | str    | text                        |        |
