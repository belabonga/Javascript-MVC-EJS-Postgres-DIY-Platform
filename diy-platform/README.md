# DIY Platform

Merupakan challnege yang dinilai 💯
```txt
Terbagi 2 Deadline :
- Part 1 W2D6 18.00 WIB
- Part 2 W3D2 09.00 WIB
- Final Deadline W3D2 13.00 WIB
```

Competencies and Tools :
- OOP
- MVC Callback
- Schema
- SQL
- Node Postgres
- Express
- EJS

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
// INSERT TABLE AUTHOR HERE

Table Posts
// INSERT TABLE POSTS HERE

Untuk mempermudah mendevelop sebuah aplikasi yang memiliki database kita akan memanfaatkan dummy data ke database, untuk dummy datanya pada repo folder data
authors.json dan posts.json. Proses insert data ini disebut dengan seeder namun datanya dapat berupa json, csv, excel atau lainnya.
*Gunakan nested callback pool.query untuk create table dan insert data (seeder)
