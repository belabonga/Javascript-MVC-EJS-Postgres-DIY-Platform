# DIY Platform Part 1
## Learning Competencies

- Mampu memodelkan requirement ke dalam bentuk ERD
- Mampu menggunakan database Postgresql untuk pembuatan aplikasi
- Mampu membuat aplikasi website sederhana dengan express, ejs dan node-postgres
- Mampu membuat mini ORM untuk fitur CRUD

## Summary

DIY Platform merupakan aplikasi untuk buat kreasi tangan dari 5 author. Buatlah aplikasi DIY Platform, aplikasi ini dapat melakukan proses CRUD terhadap postingan yang mereka buat, namun sebelum memulai ngoding kamu harus memahami soal challenge terlebih dahulu dan membuat schema database atau ERD. Kerjakan dengan nama database “DIYPlatform”

## Release 0 : Setup Database & Table

Terdapat data untuk author dan post pada aplikasi, diketahui bahwa setiap author dapat membuat lebih dari satu post sementara satu post hanya dibuat oleh satu author. Buatlah tabel menggunakan pool.query versi callback pada file setup.js untuk kedua tabel berikut:

Table Authors
<img width="371" alt="authors" src="https://user-images.githubusercontent.com/22075597/183536220-c1f12a74-f44d-4ba2-be98-ef32e423ffc3.png">

Table Posts
<img width="373" alt="posts" src="https://user-images.githubusercontent.com/22075597/183536228-d5932073-32bf-4c86-bd4d-52d6973fa99f.png">

Untuk mempermudah mendevelop sebuah aplikasi yang memiliki database kita akan memanfaatkan dummy data ke database, untuk dummy datanya pada repo folder data
authors.json dan posts.json. Proses insert data ini disebut dengan seeder namun datanya dapat berupa json, csv, excel atau lainnya. Gunakan nested callback pool.query untuk create table dan insert data (seeder).

## Release 1 : MVC, OOP & Express Callback

Kamu akan mengerjakan challenge dengan Express, MVC dan OOP.
- Class
  - Buatlah class Author dengan properti :
    - id
    - fullName
    - gender
  - Buatlah class AuthorDetail. Memiliki properti yang sama dengan class Author, ditambah dengan properti :
    - totalPost
    - totalVote
    - averageTime
  - Buatlah class Post dengan properti :
    - id
    - title
    - difficulty
    - totalVote
  - Buatlah class PostDetail. Memiliki properti yang sama dengan class Post, ditambah dengan properti :
    - estimatedDate
    - description
    - imageUrl
    - createdDate
    - AuthorId
    - authorName
- Routes
Buatlah router seperti berikut dengan menerapkan express.Router()
<img width="524" alt="Screen Shot 2022-08-09 at 07 22 29" src="https://user-images.githubusercontent.com/22075597/183536570-961503f0-f7a7-4f3b-bdeb-c380353633ef.png">

## Release 2 : Show Me The Data

Kita menggunakan OOP dan MVC jadi data yang dihasilkan sudah berupa instance. Tampilkanlah data menggunakan res.render dengan format seperti berikut:

- GET  /authors
<img width="222" alt="Screen Shot 2022-08-09 at 07 24 01" src="https://user-images.githubusercontent.com/22075597/183536706-644a955f-e5bc-4515-b6f4-241777310e81.png">

Data diurutkan berdasarkan id dari Author. Untuk kolom Author pada tampilan di handle menggunakan getter `formatName` yang memberikan output berupa Mr. / Mrs berdasarkan gender Author dan ditambahkan dengan fullName Author.

- GET  /authors/detail
Pada pembuatan query gunakan aggregate function dan join untuk mendapatkan detail dari totalPost, totalVote (merupakan total vote dari semua post yang dia buat) dan averageTime (merupakan average estimated time) gunakan class AuthorDetail untuk instantiate. 
- Cari tahu tentang Cast to Float agar average yang dihasilkan tidak string melainkan angka yang decimal.
- Handle pada EJS pada bila input yang di dapat 0 atau null maka tampilkan angka 0 berwarna merah.
<img width="610" alt="Screen Shot 2022-08-09 at 07 25 13" src="https://user-images.githubusercontent.com/22075597/183536806-7a7aa712-77e9-41d6-b182-aaa8325d79a7.png">

- GET /posts
Data diurutkan berdasarkan totalVote dari besar ke kecil
<img width="370" alt="Screen Shot 2022-08-09 at 07 25 38" src="https://user-images.githubusercontent.com/22075597/183536840-1a39feae-98ac-4121-aa8d-1b9189e73901.png">

Pada halaman ini terdapat button menuju route berikut : 
-- GET /posts/add untuk button Add Post
-- GET /posts/:id untuk button Read More
-- GET /posts/:id/edit untuk button Edit
-- GET /posts/:id/delete untuk button Delete

- GET /posts/:id
Menampilkan satu post secara detail berdasarkan id yang di dapat dari req.params, data yang ditampilkan telah di instantiate menggunakan class PostDetail 
