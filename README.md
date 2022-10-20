# DIY Platform Part 1
## Learning Competencies

- Mampu memodelkan requirement ke dalam bentuk ERD
- Mampu menggunakan database Postgresql untuk pembuatan aplikasi
- Mampu membuat aplikasi website sederhana dengan express, ejs dan node-postgres
- Mampu membuat mini ORM untuk fitur CRUD

## Competencies and Tools :
- OOP
- MVC Callback
- Schema
- SQL
- Node Postgres
- Express
- EJS

## Summary

DIY Platform merupakan aplikasi untuk buat kreasi tangan dari 5 author. Buatlah aplikasi DIY Platform, aplikasi ini dapat melakukan proses CRUD terhadap postingan yang mereka buat, namun sebelum memulai ngoding kamu harus memahami soal challenge terlebih dahulu dan membuat schema database atau ERD. Kerjakan dengan nama database “DIYPlatform”

## Release 0 : Setup Database & Table

Terdapat data untuk author dan post pada aplikasi, diketahui bahwa setiap author dapat membuat lebih dari satu post sementara satu post hanya dibuat oleh satu author. Buatlah tabel menggunakan pool.query versi callback pada file setup.js untuk kedua tabel berikut:

Table Authors
<br>
<img width="371" alt="authors" src="https://user-images.githubusercontent.com/22075597/183536220-c1f12a74-f44d-4ba2-be98-ef32e423ffc3.png">

Table Posts
<br>
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
  - GET /posts/add untuk button Add Post
  - GET /posts/:id untuk button Read More
  - GET /posts/:id/edit untuk button Edit
  - GET /posts/:id/delete untuk button Delete

- GET /posts/:id
Menampilkan satu post secara detail berdasarkan id yang di dapat dari req.params, data yang ditampilkan telah di instantiate menggunakan class PostDetail 
<img width="477" alt="Screen Shot 2022-08-09 at 07 27 50" src="https://user-images.githubusercontent.com/22075597/183537036-b7e8f99f-3ef3-4684-865e-9eec908bbe5a.png">

Untuk menampilkan notes agar ‘\n\r’ menjadi line baru gunakan style (css) dengan pre-line (Hint)

## Release 3 : Create Update Delete
- Create Post
Pada route GET /posts/add akan menampilkan form seperti berikut :
<img width="458" alt="Screen Shot 2022-08-09 at 07 28 57" src="https://user-images.githubusercontent.com/22075597/183537139-10690bb4-95cd-4259-aecf-ef2277707abd.png">

Requirement untuk from :
- type input title: text
- type input Author/ AuthorId : select option 
option Author dinamis didapat dari tabel Authors pada browser menampilan fullName namun value yang disimpan adalah id.
- type input difficulty : select option
option category hardcode yaitu Easy, Medium, Hard.
- type input estimatedTime: number
- type input imageUrl : text 
- type input createdDate : date
- input description  di handle dengan tag textarea

Jika data sudah di input dan sudah di click submit maka data pada table Posts bertambah (POST), jika berhasil maka akan kembali ke route GET /posts

- Update / Edit Recipe
Pada route GET /posts/:id/edit akan menampilkan form edit dengan form sudah terpopulate oleh data post dengan id yang di tuju, perhatikan gambar berikut terhadap id ke 1 :
<img width="444" alt="Screen Shot 2022-08-09 at 07 30 05" src="https://user-images.githubusercontent.com/22075597/183537245-879beae5-3ab4-43f6-90f1-b3b91c1afe06.png">

Setelah data sudah di edit pada form dan di click submit maka data update di database (POST), jika berhasil maka akan kembali ke route GET /posts. 

  Hint 
  - select option untuk menanda data yang di pilih menggunakan syntax selected 
  - Input date menerima format date ‘YYYY-MM-DD’ buatlah getter formatCreatedDate untuk mendapatkan format date untuk input date.

- Delete Recipe
Buatlah sebuah action untuk melakukan handling ketika tombol “Delete” pada list post page di klik. Hapuslah data yang dimaksud pada database. Ketika berhasil, arahkan user kembali ke halaman list post page.

# DIY Platform Part 2
## Learning Competencies

- Mampu melakukan validasi input pada server
- Mampu melakukan search data
- Mampu melakukan update increment 

#Summary

Challenge DIY Platform 2 adalah kelanjutan dari Part 1 yang masih fitur CRUD, untuk memulai part 2 ini pastikan kembali kode part 1 kamu sudah benar dan jalan seperti semestinya karena pada part 2 akan ditambahkan fitur-fitur tambahan dan validasi saat menambahkan data dan mengubah data.

## Release 0 : Increment Total Vote

Buatlah button Vote yang mengarah ke GET /post/:id/vote pada halaman detail page atau route GET /post/:id. Apabila button vote di klik maka akan menambah 1 vote pada post tersebut

<img width="552" alt="Screen Shot 2022-08-09 at 07 37 12" src="https://user-images.githubusercontent.com/22075597/183537914-5d99b9ae-b23e-434d-9d4d-325646060b3b.png">

## Release 1 : Search Post

Buatlah fitur search terhadap title post, Tambahkan form untuk search dengan method GET pada halaman list post atau route GET /posts.

<img width="607" alt="Screen Shot 2022-08-09 at 07 38 14" src="https://user-images.githubusercontent.com/22075597/183537980-2f323f2f-b272-4807-9ea0-d9dc310a2c47.png">

Contoh kita menginput “HIAS” maka route yang kita dapat setelah di submit button search adalah /posts?search=HIAS. 
Sekarang kamu harus mengupdate code kamu agar dapat menggunakan req.query pada route GET /posts dan menghasilkan data sesuai yang diminta, jadi terdapat ada 2 hal yang di handle :
- GET /posts  tanpa query
- GET /posts dengan query yang menjadi `/posts?search=`
Perhatikan cara query case sensitive

Case 1 search “HIAS” (huruf besar)
<img width="813" alt="Screen Shot 2022-08-09 at 07 39 23" src="https://user-images.githubusercontent.com/22075597/183538125-b101e79a-f7bd-4fe5-8811-b1cfd9895a70.png">

Case 2 Search “bekas” (huruf kecil)
<img width="828" alt="Screen Shot 2022-08-09 at 07 39 32" src="https://user-images.githubusercontent.com/22075597/183538149-cbdac993-5965-4e6f-9459-0adbdef01293.png">

Case 3 Search “dARi”
<img width="802" alt="Screen Shot 2022-08-09 at 07 39 40" src="https://user-images.githubusercontent.com/22075597/183538193-b0f75a9e-01dc-4821-a0f6-ec3818db749a.png">

## Release 2 : Validate it! 

Buatlah validasi-validasi yang menangkap pesan error saat user tidak memasukkan input yang sesuai dengan kebutuhan pada tabel database kamu pada fitur Create Post dan Edit Post. 
- Validasi semua input tidak boleh diisi kosong. Output : “Name is required.” contoh untuk name
- Validasi estimatedTime minimal 5 menit. Output : “Minimum estimated time is 5 minute.”
- Validasi title post maksimal 100 character. Output : “Post title maximum character is 100.”
- Validasi imageUrl maksimal 100 character. Output : “Image Url name maximum character is 100.”
- Validasi createdDate maksimal tanggal hari ini. Output : “Maximum created date is today.”
- Validasi description minimal 10 kata. Output : “Minimum word in description is 10.”

## Release 3 : Refactor Navbar (Optional)

Semua fitur sudah berjalan namun ada bagian dari tampilan kita yang redundant yaitu navbar, buatlah navbar menjadi refactor dengan menggunakan EJS Partial (include).

